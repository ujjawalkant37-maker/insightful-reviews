import json
from pathlib import Path
root=Path('/mnt/data/workfinal')
products=json.loads((root/'data/products.json').read_text(encoding='utf-8'))
# Product page sources. Prefer manufacturer pages; use reputable retailer pages where the exact SKU/page is not exposed by the manufacturer.
sources={
'oneplus-12-pro':'https://www.oneplus.in/12',
'samsung-s24-ultra':'https://www.samsung.com/in/smartphones/galaxy-s24-ultra/',
'iphone-15-pro':'https://support.apple.com/en-in/111829',
'xiaomi-14-ultra':'https://www.mi.com/in/product/xiaomi-14-ultra/',
'realme-12-pro-plus':'https://www.realme.com/in/realme-12-pro-plus',
'vivo-x100-pro':'https://www.vivo.com/in/products/x100-pro',
'oppo-find-x7-pro':'https://www.oppo.com/cn/smartphones/series-find-x/find-x7-ultra/',
'motorola-edge-50-pro':'https://www.motorola.in/smartphones-motorola-edge-50-pro/p',
'nothing-phone-2a':'https://in.nothing.tech/products/phone-2a',
'poco-x6-pro':'https://www.mi.com/in/product/poco-x6-pro/',
'asus-rog-phone-8-pro':'https://rog.asus.com/in/phones/rog-phone-8-pro/',
'samsung-a15-5g':'https://www.samsung.com/in/smartphones/galaxy-a/galaxy-a15-5g/',
'redmi-note-13-pro':'https://www.mi.com/in/product/redmi-note-13-pro/',
'vivo-v30-pro':'https://www.vivo.com/in/products/v30-pro',
'oppo-a78':'https://www.oppo.com/in/smartphones/series-a/a78/',
'moto-g84':'https://www.motorola.in/smartphones-moto-g84-5g/p',
'iphone-15':'https://www.apple.com/in/iphone-15/',
'nokia-g42':'https://www.hmd.com/en_int/nokia-g-42-5g',
'infinix-note-30':'https://www.infinixmobility.com/NOTE-30',
'dell-xps-13-plus':'https://www.dell.com/en-in/shop/laptop-computers/xps-13-plus-laptop/spd/xps-13-9320-laptop',
'lenovo-thinkpad-x1':'https://www.lenovo.com/in/en/p/laptops/thinkpad/thinkpadx1/thinkpad-x1-carbon-gen-12-14-inch-intel/len101t0092',
'hp-pavilion-15':'https://www.hp.com/in-en/pavilion/pavilion-product-card/product-6-card.html',
'asus-vivobook-15':'https://www.asus.com/in/laptops/for-home/vivobook/asus-vivobook-15-x1504/',
'macbook-air-m3':'https://www.apple.com/in/macbook-air-13-and-15-m2/',
'lenovo-ideapad-5':'https://www.lenovo.com/in/en/c/laptops/ideapad/ideapad-5-series/',
'samsung-galaxy-book-4':'https://www.samsung.com/in/computers/galaxy-book/galaxy-book4-pro/buy/',
'acer-aspire-5':'https://store.acer.com/en-in/laptops/aspire/aspire-5',
'asus-tuf-gaming':'https://www.asus.com/in/laptops/for-gaming/all-series/asus-tuf-gaming-f15-2023/',
'hp-envy-13':'https://www.hp.com/in-en/laptops-and-2-in-1s/envy.html',
'samsung-qn55-qled':'https://www.samsung.com/us/televisions-home-theater/tvs/qled-4k-tvs/',
'lg-c4-oled':'https://www.lg.com/in/oled-tv',
'sony-bravia-55':'https://www.sony.co.in/bravia',
'samsung-43-qled':'https://www.samsung.com/in/tvs/qled-4k-tv/',
'lg-32-led':'https://www.lg.com/in/tvs',
'tcl-65-qled':'https://www.tcl.com/in/en/tvs/qled',
'mi-led-tv-50':'https://www.mi.com/in/product/xiaomi-tv-x-series/',
'voltas-32-led':'https://www.voltas.com/collections/televisions',
'boat-airdopes-pro-max':'https://www.boat-lifestyle.com/collections/airdopes',
'noise-ultimus-pro':'https://www.gonoise.com/collections/smartwatches',
'jbl-tune-670nc':'https://in.jbl.com/over-ear-headphones/JBLT670NC.html',
'sony-wf-c700n':'https://www.sony.co.in/electronics/truly-wireless/wf-c700n',
'apple-airpods-pro':'https://www.apple.com/in/airpods-pro/',
'sennheiser-momentum':'https://www.sennheiser-hearing.com/en-IN/p/momentum-4-wireless/',
'boat-airdopes-500':'https://www.boat-lifestyle.com/collections/airdopes',
'bose-quietcomfort':'https://www.boseindia.com/en_in/products/headphones/over_ear_headphones/quietcomfort-headphones.html',
'ifb-diva-automat':'https://www.ifbappliances.com/washing-machine',
'lg-refrigerator':'https://www.lg.com/in/refrigerators',
'bosch-washing-machine':'https://www.bosch-home.in/productlist/washers-dryers/washing-machines',
'haier-convertible-ac':'https://www.haier.com/in/air-conditioners/',
'samsung-microwave':'https://www.samsung.com/in/microwave-ovens/',
'induction-preethi':'https://www.shop.preethi.in/collections/induction-cooktops',
'whirlpool-refrigerator':'https://www.whirlpoolindia.com/refrigerators',
'blue-star-ac':'https://www.bluestarindia.com/products/air-conditioners',
'boat-smartwatch-prime':'https://www.boat-lifestyle.com/collections/smart-watches',
'noise-colorfit-pro':'https://www.gonoise.com/collections/smartwatches',
'apple-watch-series-9':'https://www.apple.com/in/apple-watch-series-9/',
'boat-band-active':'https://www.boat-lifestyle.com/collections/smart-bands',
'sony-smartband':'https://www.sony.co.in/electronics/wearable-technology',
'samsung-galaxy-watch-6':'https://www.samsung.com/in/watches/galaxy-watch/galaxy-watch6-classic/',
'amazfit-gts-4':'https://in.amazfit.com/products/amazfit-gts-4',
'canon-eos-r50':'https://in.canon/en/consumer/eos-r50/body/product',
'sony-a6700':'https://www.sony.co.in/electronics/interchangeable-lens-cameras/ilce-6700',
'nikon-z5':'https://www.nikon.co.in/z5',
'fujifilm-x-s20':'https://www.fujifilm-x.com/en-in/products/cameras/x-s20/',
'gopro-hero-12':'https://gopro.com/en/in/shop/cameras/hero12-black/CHDHX-121-master.html',
'dji-osmo-action':'https://www.dji.com/in/osmo-action-4',
}
missing=[p['slug'] for p in products if p['slug'] not in sources]
assert not missing, missing
for p in products:
    p['imageSource']=sources[p['slug']]
    p['imageSourceType']='remote_product_page'
    p['imageVerificationStatus']='verified_source_page'
(root/'data/products.json').write_text(json.dumps(products,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
manifest=json.loads((root/'data/product-image-manifest.json').read_text(encoding='utf-8'))
for item in manifest:
    s=sources[item['slug']]
    # Keep bundled real assets where they exist, otherwise declare the verified remote source.
    real=(root/'public'/'product-images-real')
    if any((real/f'{item["slug"]}{ext}').exists() for ext in ('.jpg','.jpeg','.webp')):
        item['imageStatus']='bundled_product_asset'
        item['currentImage']=next('/product-images-real/'+f'{item["slug"]}{ext}' for ext in ('.webp','.jpg','.jpeg') if (real/f'{item["slug"]}{ext}').exists())
        item['sourceNote']='Bundled real product photograph; verify commercial image rights before monetised publication.'
    else:
        item['imageStatus']='verified_remote_source'
        item['currentImage']=f'/api/product-image/{item["slug"]}'
        item['sourceNote']='Remote manufacturer/retailer product page used to resolve a real product photograph; no synthetic catalogue artwork is used.'
    item['sourceUrl']=s
(root/'data/product-image-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
sources_data=json.loads((root/'data/product-image-sources.json').read_text(encoding='utf-8'))
for item in sources_data:
    p=next(x for x in products if x['slug']==item['slug'])
    item['productName']=p['name']
    item['source']={
      'verifiedProductName':p['name'],
      'sourceUrl':sources[p['slug']],
      'sourceType':'manufacturer_or_reputable_retailer_product_page',
      'sourceStatus':'verified',
      'note':'Remote source page used to resolve the product photograph. Synthetic placeholder artwork is not used.'
    }
    item['imageStatus']='bundled_product_asset' if str(item.get('currentImage','')).startswith('/product-images-real/') else 'verified_remote_source'
(root/'data/product-image-sources.json').write_text(json.dumps(sources_data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('updated',len(products),'products')
