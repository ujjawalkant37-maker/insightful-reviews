-- Optional product taxonomy expansion for the product decision engine.
-- Run after the existing catalogue seed.
BEGIN;
INSERT INTO public.categories(name, slug, icon) VALUES
('Tablets','tablets','📱'),
('Monitors','monitors','🖥️'),
('Printers','printers','🖨️'),
('Projectors','projectors','📽️'),
('Storage','storage','💾'),
('Networking','networking','📡'),
('Power Banks & Chargers','power','🔋'),
('Smart Home','smart-home','🏠'),
('Security Cameras','security-cameras','📹'),
('Streaming & Media','streaming','📺'),
('Gaming Accessories','gaming-accessories','🎮'),
('Drones','drones','🚁'),
('3D Printers','3d-printers','🖨️'),
('Air Purifiers','air-purifiers','🌬️'),
('Water Purifiers','water-purifiers','💧'),
('Cookware','cookware','🍳'),
('Vacuum Cleaners','vacuum-cleaners','🧹'),
('Furniture','furniture','🛋️'),
('Baby Products','baby-products','🍼'),
('Pet Products','pet-products','🐾')
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, icon=EXCLUDED.icon;
COMMIT;
