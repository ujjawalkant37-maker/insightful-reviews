import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "@supabase/supabase-js";
import { parse } from "csv-parse/sync";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;

const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    "Missing Supabase credentials. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local."
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const DATA_DIR = path.resolve(process.argv[2] || "data/lgd");

const DISTRICTS = path.join(DATA_DIR, "districts.csv");
const SUBDISTRICTS = path.join(DATA_DIR, "subdistricts.csv");
const LOCAL_BODIES = path.join(DATA_DIR, "local-bodies-with-pincode.csv");

const BATCH_SIZE = 500;
const SOURCE_NAME = "LGD";
const SOURCE_VERSION = new Date().toISOString().slice(0, 10);

function requireFile(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`CSV not found: ${file}`);
  }
}

function readCsv(file) {
  requireFile(file);

  return parse(fs.readFileSync(file, "utf8"), {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    relax_column_count: true,
    trim: true,
  });
}

function clean(value) {
  if (value === undefined || value === null) return null;

  const v = String(value).trim();

  return v === "" ? null : v;
}

function key(row) {
  return [
    clean(row.state_code),
    clean(row.district_code),
    clean(row.subdistrict_code),
    clean(row.city_code),
    clean(row.urban_local_body_code),
    clean(row.pincode),
  ].join("|");
}

async function fetchExistingKeys() {
  const keys = new Set();

  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("directory_location_import")
      .select(
        "state_code,district_code,subdistrict_code,city_code,pincode,urban_local_body_code"
      )
      .eq("source_name", SOURCE_NAME)
      .range(from, from + 999);

    if (error) throw error;

    if (!data || data.length === 0) break;

    for (const row of data) {
      keys.add(key(row));
    }

    if (data.length < 1000) break;

    from += 1000;
  }

  return keys;
}

async function insertRows(rows, existingKeys) {
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE).filter((row) => {
      const k = key(row);

      if (existingKeys.has(k)) {
        skipped++;
        return false;
      }

      existingKeys.add(k);

      return true;
    });

    if (!batch.length) continue;

    const { error } = await supabase
      .from("directory_location_import")
      .insert(batch);

    if (error) {
      console.error(`Insert failed near row ${i + 1}`);
      throw error;
    }

    inserted += batch.length;

    console.log(`Inserted ${inserted}/${rows.length}`);
  }

  return {
    inserted,
    skipped,
  };
}

function districtRows(records) {
  return records.map((r) => ({
    source_name: SOURCE_NAME,
    source_version: SOURCE_VERSION,

    state_code: clean(r.state_code),
    state_name: clean(r.state_name_english),

    district_code: clean(r.district_code),
    district_name: clean(r.district_name_english),

    raw_data: r,
  }));
}

function subdistrictRows(records) {
  return records.map((r) => ({
    source_name: SOURCE_NAME,
    source_version: SOURCE_VERSION,

    state_code: clean(r.state_code),
    state_name: clean(r.state_name_english),

    district_code: clean(r.district_code),
    district_name: clean(r.district_name_english),

    subdistrict_code: clean(r.subdistrict_code),
    subdistrict_name: clean(r.subdistrict_name_english),

    raw_data: r,
  }));
}

function localBodyRows(records) {
  return records.map((r) => ({
    source_name: SOURCE_NAME,
    source_version: SOURCE_VERSION,

    state_code: clean(r.stateCode),
    state_name: clean(r.stateNameEnglish),

    city_code: clean(r.localBodyCode),
    city_name: clean(r.localBodyNameEnglish),

    urban_local_body_code: clean(r.localBodyCode),
    urban_local_body_name: clean(r.localBodyNameEnglish),

    pincode: clean(r.pincode),

    raw_data: r,
  }));
}

async function main() {
  console.log("======================================");
  console.log("LGD LOCATION IMPORT");
  console.log("======================================");

  console.log("Data directory:", DATA_DIR);

  const districts = readCsv(DISTRICTS);
  const subdistricts = readCsv(SUBDISTRICTS);
  const localBodies = readCsv(LOCAL_BODIES);

  console.log(`Districts: ${districts.length}`);
  console.log(`Sub-districts: ${subdistricts.length}`);
  console.log(`Local bodies with PIN: ${localBodies.length}`);

  const existingKeys = await fetchExistingKeys();

  console.log(`Existing LGD rows: ${existingKeys.size}`);

  const districtData = districtRows(districts);
  const subdistrictData = subdistrictRows(subdistricts);
  const localBodyData = localBodyRows(localBodies);

  console.log("\nImporting districts...");
  const districtsResult = await insertRows(
    districtData,
    existingKeys
  );

  console.log("\nImporting sub-districts...");
  const subdistrictResult = await insertRows(
    subdistrictData,
    existingKeys
  );

  console.log("\nImporting local bodies...");
  const localBodyResult = await insertRows(
    localBodyData,
    existingKeys
  );

  console.log("\n======================================");
  console.log("IMPORT COMPLETE");
  console.log("======================================");

  console.log({
    districts: districtsResult,
    subdistricts: subdistrictResult,
    localBodies: localBodyResult,
    totalInserted:
      districtsResult.inserted +
      subdistrictResult.inserted +
      localBodyResult.inserted,
    totalSkipped:
      districtsResult.skipped +
      subdistrictResult.skipped +
      localBodyResult.skipped,
  });
}

main().catch((error) => {
  console.error("\n======================================");
  console.error("LGD IMPORT FAILED");
  console.error("======================================");

  console.error(error);

  process.exit(1);
});