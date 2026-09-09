"""Run: python3 verify.py (requires Pillow and NumPy)."""
from pathlib import Path
import json
import xml.etree.ElementTree as ET
import numpy as np
from PIL import Image

root=Path(__file__).resolve().parent
manifest=json.loads((root/'manifest.json').read_text())
for item in manifest['svg_files']:
    tree=ET.parse(root/item['file']); svg=tree.getroot()
    assert svg.attrib['viewBox'] and svg.attrib['width']==str(item['width'])
    assert int(svg.attrib['height'])==item['height']
    tags={e.tag.rsplit('}',1)[-1] for e in svg.iter()}
    assert tags <= {'svg','title','style','g','path'}, (item['file'],tags)
    assert 'path' in tags and all('href' not in k for e in svg.iter() for k in e.attrib)
for item in manifest['png_files']:
    image=Image.open(root/item['file'])
    assert image.mode=='RGBA' and image.size==(item['width'],item['height'])
    a=np.asarray(image); alpha=a[:,:,3]
    assert alpha.min()==0 and alpha.max()>0
    assert all(alpha[y,x]==0 for y,x in [(0,0),(0,-1),(-1,0),(-1,-1)])
    color=255 if 'white' in item['file'] else 0
    assert np.all(a[:,:,:3][alpha>0]==color), item['file']
    if 'black' in item['file']:
        white=Image.open(root/item['file'].replace('black','white'))
        assert np.array_equal(alpha,np.asarray(white.getchannel('A')))
    if item['file'].startswith('profile/'):
        y,x=np.nonzero(alpha); n=image.width
        assert np.all((x-n/2)**2+(y-n/2)**2<(n/2)**2), 'Circular crop clips artwork'
        assert (root/item['file']).stat().st_size<1_000_000
for color in ['black','white']:
    ico=Image.open(root/f'favicon/psg-{color}.ico')
    assert ico.ico.sizes()=={(16,16),(32,32),(48,48)}
for size in [180,192,512]:
    p=root/'favicon'/('apple-touch-icon.png' if size==180 else f'maskable-{size}.png')
    image=Image.open(p).convert('RGBA'); assert image.size==(size,size)
    assert image.getchannel('A').getextrema()==(255,255)
    if size!=180:
        a=np.asarray(image); y,x=np.nonzero(a[:,:,:3].min(axis=2)<245)
        assert np.all((x-size/2)**2+(y-size/2)**2<(.4*size)**2), 'Maskable safe zone exceeded'
print(f"PASS: {len(manifest['svg_files'])} real vector SVGs; {len(manifest['png_files'])} transparent PNGs; matching colors/masks; profile crop; ICO frames; device safe zones.")
