import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE;

if (!SUPABASE_URL || !SERVICE_KEY) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const CSV_PATH = path.resolve(
  process.cwd(),
  "data",
  "directory",
  "nhp-hospitals.csv"
);

const SOURCE_NAME = "NHP-HOSPITAL-DIRECTORY";
const SOURCE_URL =
  "https://www.data.gov.in/resource/national-hospital-directory-geo-code-and-additional-parameters-updated-till-last-month";

const BATCH_SIZE = 500;

const aliases = {
  name: ["Hospital_Name", "Hospital Name", "hospital_name", "HospitalName", "Name"],
  category: ["Hospital_Category", "Hospital Category", "hospital_category", "Category"],
  location: ["Location", "Address", "Hospital_Address", "Hospital Address"],
  coordinates: [
    "Location_Coordinates",
    "Location Coordinates",
    "Coordinates",
    "Latitude Longitude",
    "Lat Long",
  ],
  state: ["State", "State_Name", "State Name"],
  district: ["District", "District_Name", "District Name"],
  city: ["City", "City_Name", "City Name", "Town", "Subtown", "Village"],
  pincode: ["Pincode", "PIN", "PIN Code", "Pin Code", "Postal Code"],
  phone: ["Phone", "Phone_No", "Phone No", "Contact", "Contact Number"],
  website: ["Website", "Hospital_Website", "Hospital Website", "URL"],
  latitude: ["Latitude", "Lat"],
  longitude: ["Longitude", "Long", "Lng"],
};

function clean(value) {
  if (value === undefined || value === null) return null;
  const s = String(value).trim();
  if (!s || /^na$/i.test(s) || /^n\/a$/i.test(s) || s === "-" || s === "0") {
    return null;
  }
  return s;
}

function key(value) {
  return clean(value)?.toLowerCase().replace(/\s+/g, " ").trim() ?? "";
}

function slugify(value) {
  return (
    key(value)
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "hospital"
  );
}

function pick(row, list) {
  for (const alias of list) {
    if (Object.prototype.hasOwnProperty.call(row, alias)) {
      const value = clean(row[alias]);
      if (value) return value;
    }
  }

  const normalized = Object.keys(row).map((k) => ({
    key: k.toLowerCase().replace(/[^a-z0-9]/g, ""),
    original: k,
  }));

  for (const alias of list) {
    const target = alias.toLowerCase().replace(/[^a-z0-9]/g, "");
    const found = normalized.find((x) => x.key === target);
    if (found) {
      const value = clean(row[found.original]);
      if (value) return value;
    }
  }

  return null;
}

function parseNumber(value) {
  const s = clean(value);
  if (!s) return null;
  const n = Number(s.replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

function parseCoordinates(row) {
  const lat = parseNumber(pick(row, aliases.latitude));
  const lon = parseNumber(pick(row, aliases.longitude));

  if (lat !== null && lon !== null) return { latitude: lat, longitude: lon };

  const raw = pick(row, aliases.coordinates);
  if (!raw) return { latitude: null, longitude: null };

  const matches = raw.match(/-?\d+(?:\.\d+)?/g) ?? [];
  if (matches.length >= 2) {
    const a = Number(matches[0]);
    const b = Number(matches[1]);

    if (
      Number.isFinite(a) &&
      Number.isFinite(b) &&
      Math.abs(a) <= 90 &&
      Math.abs(b) <= 180
    ) {
      return { latitude: a, longitude: b };
    }
  }

  return { latitude: null, longitude: null };
}

function buildSlug(name, city, state, sourceId) {
  return `${slugify([name, city, state].filter(Boolean).join(" "))}-${slugify(
    sourceId || "record"
  )}`;
}

function mapRow(row, index) {
  const name = pick(row, aliases.name);
  if (!name) return null;

  const town = pick(row, ["Town"]);
  const subtown = pick(row, ["Subtown"]);
  const village = pick(row, ["Village"]);

  const explicitCity =
    pick(row, ["City", "City_Name", "City Name"]) ||
    town ||
    subtown ||
    village;

  const coordinates = parseCoordinates(row);

  const sourceRecordId =
    clean(row.Sr_No) ||
    clean(row.SrNo) ||
    clean(row["Sr No"]) ||
    String(index + 1);

  return {
    sourceRecordId,
    name,
    category: pick(row, aliases.category),
    city: explicitCity,
    town,
    subtown,
    village,
    location: pick(row, ["Location"]),
    district: pick(row, aliases.district),
    state: pick(row, aliases.state),
    pincode: pick(row, aliases.pincode),
    address: pick(row, aliases.location),
    phone: pick(row, aliases.phone),
    website: pick(row, aliases.website),
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    careType: pick(row, ["Hospital_Care_Type", "Hospital Care Type"]),
    medicineSystem: pick(row, [
      "Discipline_Systems_of_Medicine",
      "Discipline Systems of Medicine",
    ]),
    specialties: pick(row, ["Specialties"]),
    facilities: pick(row, ["Facilities"]),
    accreditation: pick(row, ["Accreditation"]),
    totalBeds: parseNumber(
      pick(row, ["Total_Num_Beds", "Total Num Beds"])
    ),
    raw: row,
  };
}

async function getHospitalCategoryId() {
  const { data, error } = await supabase
    .from("directory_categories")
    .select("id,name,slug")
    .eq("slug", "hospitals")
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Category 'hospitals' was not found.");
  return data.id;
}

async function getSourceId() {
  const { data, error } = await supabase
    .from("directory_data_sources")
    .select("id")
    .eq("name", SOURCE_NAME)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error(`Source '${SOURCE_NAME}' was not found.`);
  return data.id;
}

/*
 * Use the LGD location-import table as a secondary city resolver.
 * NHP often has no usable City/Town/Subtown/Village value, while the
 * pincode can be matched to LGD's city_name.
 */
async function buildPincodeCityMap(rows) {
  const pincodes = [
    ...new Set(rows.map((r) => clean(r.pincode)).filter(Boolean)),
  ];

  const map = new Map();

  for (let i = 0; i < pincodes.length; i += 500) {
    const batch = pincodes.slice(i, i + 500);

    const { data, error } = await supabase
      .from("directory_location_import")
      .select("pincode,city_name,district_name,state_name")
      .in("pincode", batch);

    if (error) {
      console.warn(
        `LGD pincode lookup unavailable: ${error.message}`
      );
      return map;
    }

    for (const row of data ?? []) {
      const pincode = clean(row.pincode);
      const city = clean(row.city_name);
      if (pincode && city && !map.has(pincode)) {
        map.set(pincode, city);
      }
    }
  }

  return map;
}

function applyCityFallback(rows, pincodeCityMap) {
  let resolved = 0;

  for (const r of rows) {
    if (!r.city && r.pincode) {
      const city = pincodeCityMap.get(r.pincode);
      if (city) {
        r.city = city;
        resolved++;
      }
    }
  }

  return resolved;
}

async function insertSourceRecords(rows, categoryId) {
  let processed = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE).map((r) => ({
      source_name: SOURCE_NAME,
      source_type: "official",
      source_record_id: r.sourceRecordId,
      category_id: categoryId,
      entity_name: r.name,
      organization_name: r.name,
      address: r.address,
      city: r.city,
      district: r.district,
      state: r.state,
      pincode: r.pincode,
      country: "India",
      phone: r.phone,
      website: r.website,
      latitude: r.latitude,
      longitude: r.longitude,
      raw_data: r.raw,
      source_url: SOURCE_URL,
      source_reference: r.sourceRecordId,
      last_verified_at: new Date().toISOString(),
      processing_status: "pending",
    }));

    const { error } = await supabase
      .from("directory_source_records")
      .upsert(batch, {
        onConflict: "source_name,source_record_id",
        ignoreDuplicates: false,
      });

    if (error) throw error;

    processed += batch.length;
    console.log(`Source records: ${processed}/${rows.length}`);
  }
}

async function getExistingEntities(rows, categoryId) {
  const sourceIds = [
    ...new Set(rows.map((r) => r.sourceRecordId).filter(Boolean)),
  ];

  const map = new Map();

  for (let i = 0; i < sourceIds.length; i += 500) {
    const batch = sourceIds.slice(i, i + 500);

    const { data, error } = await supabase
      .from("directory_entities")
      .select("id,name,city,state,category_id,source_name,source_reference")
      .eq("category_id", categoryId)
      .eq("source_name", SOURCE_NAME)
      .in("source_reference", batch);

    if (error) throw error;

    for (const row of data ?? []) {
      map.set(String(row.source_reference), row.id);
    }
  }

  return map;
}

async function createEntitiesAndLocations(rows, categoryId) {
  const existing = await getExistingEntities(rows, categoryId);
  const missing = rows.filter((r) => !existing.has(String(r.sourceRecordId)));

  let entitiesCreated = 0;
  let locationsCreated = 0;

  /*
   * Insert entities in batches. The slug includes the NHP source record id,
   * so records remain deterministic and unique across the NHP dataset.
   */
  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    const batchRows = missing.slice(i, i + BATCH_SIZE);
    const now = new Date().toISOString();

    const entities = batchRows.map((r) => ({
      category_id: categoryId,
      parent_entity_id: null,
      name: r.name,
      slug: buildSlug(r.name, r.city, r.state, r.sourceRecordId),
      organization_name: r.name,
      short_description:
        "Hospital listed in the Government of India's National Hospital Directory.",
      description:
        "Directory information sourced from the National Hospital Directory published through the Open Government Data Platform India.",
      website: r.website,
      phone: r.phone,
      email: null,
      image_url: null,
      images: [],
      address: r.address,
      locality: r.location,
      city: r.city,
      district: r.district,
      state: r.state,
      pincode: r.pincode,
      country: "India",
      latitude: r.latitude,
      longitude: r.longitude,
      rating: null,
      review_count: 0,
      trust_score: null,
      attributes: {
        source: SOURCE_NAME,
        source_reference: r.sourceRecordId,
        hospital_category: r.category,
        town: r.town,
        subtown: r.subtown,
        village: r.village,
        location: r.location,
        care_type: r.careType,
        medicine_system: r.medicineSystem,
        specialties: r.specialties,
        facilities: r.facilities,
        accreditation: r.accreditation,
        total_beds: r.totalBeds,
      },
      status: "published",
      is_verified: false,
      entity_kind: "location",
      source_type: "official",
      source_url: SOURCE_URL,
      source_name: SOURCE_NAME,
      source_reference: r.sourceRecordId,
      last_verified_at: now,
      verification_note:
        "Imported from the official National Hospital Directory. This does not constitute independent verification by Insightful Reviews.",
      alternate_names: [],
      search_keywords: [
        r.name,
        r.city,
        r.town,
        r.subtown,
        r.village,
        r.district,
        r.state,
        r.pincode,
      ].filter(Boolean),
      amenities: {},
      opening_hours: {},
      price_range: null,
      ownership_type: null,
      accreditation: {},
      service_details: {},
      social_links: {},
    }));

    const { data, error } = await supabase
      .from("directory_entities")
      .insert(entities)
      .select("id,source_reference");

    if (error) throw error;

    for (const row of data ?? []) {
      existing.set(String(row.source_reference), row.id);
    }

    entitiesCreated += data?.length ?? 0;
    console.log(
      `Entities: ${Math.min(i + BATCH_SIZE, missing.length)}/${missing.length}`
    );
  }

  /*
   * Locations are also inserted in batches instead of one HTTP request per
   * hospital. This is the main performance fix.
   */
  const locationRows = rows
    .map((r) => ({
      r,
      entityId: existing.get(String(r.sourceRecordId)),
    }))
    .filter((x) => x.entityId);

  for (let i = 0; i < locationRows.length; i += BATCH_SIZE) {
    const batch = locationRows.slice(i, i + BATCH_SIZE);
    const now = new Date().toISOString();

    const locations = batch.map(({ r, entityId }) => ({
      entity_id: entityId,
      location_name: r.city ? `${r.name} - ${r.city}` : r.name,
      address: r.address,
      locality: r.location,
      city: r.city,
      district: r.district,
      state: r.state,
      pincode: r.pincode,
      country: "India",
      latitude: r.latitude,
      longitude: r.longitude,
      phone: r.phone,
      email: null,
      website: r.website,
      facilities: {
        source_hospital_category: r.category,
        town: r.town,
        subtown: r.subtown,
        village: r.village,
        care_type: r.careType,
        medicine_system: r.medicineSystem,
        specialties: r.specialties,
        facilities: r.facilities,
        accreditation: r.accreditation,
        total_beds: r.totalBeds,
      },
      is_primary: true,
      is_active: true,
      source_type: "official",
      source_url: SOURCE_URL,
      source_name: SOURCE_NAME,
      source_reference: r.sourceRecordId,
      last_verified_at: now,
      verification_note:
        "Location imported from the official National Hospital Directory.",
      opening_hours: {},
      transport_info: {},
      accessibility: {},
      photos: [],
    }));

    const { error } = await supabase
      .from("directory_locations")
      .insert(locations);

    if (error) throw error;

    locationsCreated += locations.length;
    console.log(
      `Locations: ${Math.min(i + BATCH_SIZE, locationRows.length)}/${locationRows.length}`
    );
  }

  return { entitiesCreated, locationsCreated };
}

async function markProcessed(rows) {
  let processed = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const ids = batch.map((r) => r.sourceRecordId);

    const { error } = await supabase
      .from("directory_source_records")
      .update({
        processing_status: "processed",
        processed_entity_id: null,
      })
      .eq("source_name", SOURCE_NAME)
      .in("source_record_id", ids);

    if (error) throw error;

    processed += batch.length;
    console.log(`Processed: ${processed}/${rows.length}`);
  }
}

async function main() {
  if (!fs.existsSync(CSV_PATH)) {
    throw new Error(`CSV not found: ${CSV_PATH}`);
  }

  console.log("==============================================");
  console.log("NHP HOSPITAL DIRECTORY IMPORT");
  console.log("==============================================");
  console.log(`CSV: ${CSV_PATH}`);
  console.log(`Source: ${SOURCE_URL}`);

  const csv = fs.readFileSync(CSV_PATH, "utf8");

  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    relax_column_count: true,
    trim: true,
  });

  console.log(`CSV rows: ${records.length}`);

  if (!records.length) throw new Error("CSV contains no data rows.");

  console.log("Detected columns:");
  console.log(Object.keys(records[0]).join(" | "));

  const mapped = records.map(mapRow).filter(Boolean);

  console.log(`Usable hospital rows: ${mapped.length}`);

  if (!mapped.length) {
    throw new Error("No hospital names could be detected.");
  }

  const categoryId = await getHospitalCategoryId();
  await getSourceId();

  console.log(`Hospital category id: ${categoryId}`);

  const pincodeCityMap = await buildPincodeCityMap(mapped);
  const resolvedByLGD = applyCityFallback(mapped, pincodeCityMap);

  console.log(`LGD pincode city mappings: ${pincodeCityMap.size}`);
  console.log(`Cities resolved from LGD: ${resolvedByLGD}`);

  const cityStats = {
    city: mapped.filter((r) => !!r.city).length,
    missing: mapped.filter((r) => !r.city).length,
  };

  console.log(
    `City mapping: ${cityStats.city}/${mapped.length} resolved; ${cityStats.missing} remain unavailable in source/LGD.`
  );

  await insertSourceRecords(mapped, categoryId);

  const result = await createEntitiesAndLocations(mapped, categoryId);

  await markProcessed(mapped);

  console.log("");
  console.log("==============================================");
  console.log("IMPORT COMPLETE");
  console.log("==============================================");
  console.log(`CSV rows:              ${records.length}`);
  console.log(`Usable hospital rows:  ${mapped.length}`);
  console.log(`Entities created:      ${result.entitiesCreated}`);
  console.log(`Locations created:     ${result.locationsCreated}`);
}

main().catch((error) => {
  console.error("");
  console.error("IMPORT FAILED");
  console.error(error);
  process.exit(1);
});
