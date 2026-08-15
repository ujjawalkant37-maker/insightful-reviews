-- Insightful Reviews — Launch v3: source-aware review intelligence + expanded directory taxonomy
-- Additive migration. Run after launch_migration.sql.

BEGIN;

CREATE TABLE IF NOT EXISTS public.external_reviews (
  id BIGSERIAL PRIMARY KEY,
  target_type TEXT NOT NULL CHECK (target_type IN ('product','directory')),
  target_id TEXT NOT NULL,
  source TEXT NOT NULL,
  source_label TEXT NOT NULL,
  external_id TEXT,
  author_name TEXT,
  rating NUMERIC(3,2) CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
  title TEXT,
  review_text TEXT NOT NULL,
  review_url TEXT,
  published_at TIMESTAMPTZ,
  language TEXT,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('pending','published','hidden','removed')),
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(source, external_id)
);

CREATE INDEX IF NOT EXISTS idx_external_reviews_target ON public.external_reviews(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_external_reviews_source ON public.external_reviews(source);
CREATE INDEX IF NOT EXISTS idx_external_reviews_published ON public.external_reviews(published_at DESC);

CREATE TABLE IF NOT EXISTS public.review_source_connections (
  id BIGSERIAL PRIMARY KEY,
  source TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned','connected','paused','restricted')),
  notes TEXT,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.review_source_connections(source, display_name, status, notes) VALUES
('google','Google Places','planned','Requires Google Places API credentials and compliance with Google Maps Platform terms.'),
('youtube','YouTube comments','planned','Use YouTube Data API for eligible videos/channels.'),
('trustpilot','Trustpilot','planned','Requires eligible API access/partnership.'),
('reddit','Reddit','restricted','Commercial use requires the applicable Reddit agreement/permission; do not scrape Reddit pages.'),
('flipkart','Flipkart','planned','Use only an authorised feed/API/partnership if available.'),
('amazon','Amazon','planned','Use authorised affiliate/partner data; do not scrape customer reviews.'),
('partner','Licensed partner feed','planned','Generic ingestion path for licensed datasets.'),
('manual','Verified manual import','connected','Admin import for rights-cleared review datasets.')
ON CONFLICT (source) DO UPDATE SET display_name = EXCLUDED.display_name, notes = EXCLUDED.notes;

-- Expanded category taxonomy. Existing categories are updated; new categories are inserted.
INSERT INTO public.directory_categories(name, slug, description, icon, entity_type, sort_order) VALUES
('Hospitals','hospitals','Hospitals, health systems and specialist institutions','🏥','healthcare',1),
('Clinics','clinics','Clinics, doctors and outpatient providers','🩺','healthcare',2),
('Diagnostic Centres','diagnostic-centres','Pathology, imaging and diagnostic laboratories','🔬','healthcare',3),
('Pharmacies','pharmacies','Pharmacies and medicine services','💊','healthcare',4),
('Dental Clinics','dental-clinics','Dental hospitals, clinics and oral-care providers','🦷','healthcare',5),
('Eye Care','eye-care','Ophthalmology hospitals, clinics and optical services','👁️','healthcare',6),
('Physiotherapy','physiotherapy','Physiotherapy and rehabilitation centres','🧑‍🦽','healthcare',7),
('Mental Wellness','mental-wellness','Counselling and mental-wellness providers','🧠','healthcare',8),
('Home Healthcare','home-healthcare','Home nursing, elder care and home health services','🏠','healthcare',9),
('Veterinary','veterinary','Veterinary hospitals, clinics and pet-care providers','🐾','healthcare',10),
('Schools','schools','Schools and K-12 educational institutions','🏫','education',20),
('Colleges','colleges','Colleges and higher-education institutions','🎓','education',21),
('Universities','universities','Universities and degree-granting institutions','🏛️','education',22),
('Coaching Institutes','coaching-institutes','Academic and competitive-exam coaching','📚','education',23),
('Preschools & Daycare','preschools-daycare','Preschools, playschools and daycare','🧸','education',24),
('Skill & Vocational Training','skill-training','Vocational, skill and professional training institutes','🛠️','education',25),
('Study Abroad','study-abroad','Study-abroad counsellors and education services','🌍','education',26),
('Hostels & PG','hostels-pg','Student hostels, PGs and accommodation','🛏️','education',27),
('Hotels','hotels','Hotels, resorts and stays','🏨','hospitality',40),
('Resorts','resorts','Resorts and destination stays','🌴','hospitality',41),
('Restaurants','restaurants','Restaurants and dining venues','🍽️','food',50),
('Cafes','cafes','Cafes, coffee shops and casual dining','☕','food',51),
('Cloud Kitchens','cloud-kitchens','Delivery kitchens and food-only brands','🥡','food',52),
('Travel Services','travel-services','Travel agencies, tour operators and services','✈️','travel',60),
('Tourist Attractions','tourist-attractions','Tourist places and attractions','🗺️','travel',61),
('Travel Destinations','travel-destinations','Destination guides and travel experiences','🌍','travel',62),
('Gyms & Fitness','gyms-fitness','Gyms, fitness centres and trainers','🏋️','fitness',70),
('Yoga & Wellness','yoga-wellness','Yoga, wellness and holistic centres','🧘','wellness',71),
('Salons','salons','Hair salons and grooming services','💇','beauty',80),
('Spas','spas','Spas and wellness centres','🧖','wellness',81),
('Banks','banks','Banks and banking branches','🏦','finance',90),
('ATMs','atms','ATM and cash-access locations','💳','finance',91),
('Insurance','insurance','Insurance providers, offices and advisors','🛡️','finance',92),
('Loan & Finance Services','loan-finance','Loans, NBFCs and financial services','💰','finance',93),
('Automobile Dealers','automobile-dealers','Car and automobile dealerships','🚗','automotive',100),
('Automobile Services','automobile-services','Service centres and workshops','🔧','automotive',101),
('Petrol Pumps','petrol-pumps','Fuel stations','⛽','automotive',102),
('EV Charging','ev-charging','Electric vehicle charging locations','⚡','automotive',103),
('Tyre & Battery','tyre-battery','Tyre, battery and vehicle consumables services','🛞','automotive',104),
('Real Estate','real-estate','Real estate agencies and property services','🏠','property',110),
('Builders & Developers','builders-developers','Builders, developers and housing projects','🏗️','property',111),
('Coworking Spaces','coworking-spaces','Coworking and flexible office spaces','💼','business',120),
('Business Centres','business-centres','Business centres and serviced offices','🏢','business',121),
('Cinemas','cinemas','Movie theatres and cinema chains','🎬','entertainment',130),
('Event Venues','event-venues','Event halls, banquet halls and venues','🎉','events',140),
('Shopping Malls','shopping-malls','Shopping centres and malls','🛍️','shopping',150),
('Supermarkets','supermarkets','Supermarkets and grocery stores','🛒','shopping',151),
('Electronics Stores','electronics-stores','Electronics and appliance stores','📦','shopping',152),
('Home Services','home-services','Plumbing, electrical, cleaning and repair services','🔨','home-services',160),
('Packers & Movers','packers-movers','Moving, relocation and logistics services','🚚','logistics',161),
('Courier & Logistics','courier-logistics','Courier, delivery and logistics providers','📦','logistics',162),
('Legal Services','legal-services','Law firms, advocates and legal services','⚖️','professional',170),
('Professional Services','professional-services','Accountants, consultants and professional providers','🏢','professional',171),
('CA & Tax Services','ca-tax-services','Chartered accountants and tax professionals','🧾','professional',172),
('Local Amenities','local-amenities','Everyday local services and amenities','📍','local',180),
('Government & Civic Services','government-services','Public offices and citizen services','🏛️','government',181),
('Places of Worship','places-of-worship','Temples, mosques, churches, gurudwaras and other worship places','🛕','community',190),
('Pet Care','pet-care','Pet boarding, grooming and services','🐶','pets',200),
('Photography','photography','Photographers and studios','📸','creative',210),
('Wedding Services','wedding-services','Wedding planners, decorators and vendors','💍','events',211)
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, description=EXCLUDED.description, icon=EXCLUDED.icon, entity_type=EXCLUDED.entity_type, sort_order=EXCLUDED.sort_order, is_active=TRUE;

ALTER TABLE public.external_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_source_connections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published external reviews" ON public.external_reviews;
CREATE POLICY "Public can view published external reviews" ON public.external_reviews FOR SELECT USING (status = 'published');
DROP POLICY IF EXISTS "Public can view review source connections" ON public.review_source_connections;
CREATE POLICY "Public can view review source connections" ON public.review_source_connections FOR SELECT USING (TRUE);

COMMIT;
