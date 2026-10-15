"""Extract flat-fill colour palettes from App Store screenshots.

Usage: python -I palette.py <app-store-dir> <out-json> <out-png>
Only pixels in flat regions (low local gradient) are counted, so photos and
texture mostly drop out and UI/brand fills remain.
"""
import sys, json, colorsys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont

src, out_json, out_png = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
K = 8

def flat_pixels(path):
    im = Image.open(path).convert("RGB")
    im.thumbnail((300, 650))
    a = np.asarray(im).astype(np.int16)
    g = np.abs(np.diff(a, axis=0))[:, :-1].sum(2) + np.abs(np.diff(a, axis=1))[:-1].sum(2)
    flat = g < 12
    return a[:-1, :-1][flat]

def kmeans(x, k, iters=25, seed=0):
    rng = np.random.default_rng(seed)
    x = x.astype(np.float32)
    c = x[rng.choice(len(x), k, replace=False)]
    for _ in range(iters):
        d = ((x[:, None, :] - c[None]) ** 2).sum(2)
        lab = d.argmin(1)
        for j in range(k):
            m = x[lab == j]
            if len(m):
                c[j] = m.mean(0)
    return c, np.bincount(lab, minlength=k) / len(x)

def hexc(c):
    return "#%02X%02X%02X" % tuple(int(round(v)) for v in c)

def lum(c):
    def ch(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(float(v)) for v in c)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

result = {}
for app in sorted(p for p in src.iterdir() if p.is_dir()):
    px = [flat_pixels(f) for f in sorted(app.glob("*.jpg")) + sorted(app.glob("*.png"))]
    if not px:
        continue
    x = np.concatenate(px)
    x = x[np.random.default_rng(1).choice(len(x), min(len(x), 60000), replace=False)]
    c, share = kmeans(x, K)
    # merge near-duplicates
    order = np.argsort(-share)
    sw = []
    for i in order:
        if share[i] < 0.01:
            continue
        for s in sw:
            if np.abs(np.array(s["rgb"]) - c[i]).sum() < 30:
                s["share"] += float(share[i]); break
        else:
            h, l, s_ = colorsys.rgb_to_hls(*(c[i] / 255))
            sw.append({"hex": hexc(c[i]), "rgb": c[i].tolist(), "share": float(share[i]),
                       "chroma": round(float(s_ * (1 - abs(2 * l - 1))), 3), "hue": round(h * 360),
                       "lum": round(lum(c[i]), 4)})
    sw.sort(key=lambda s: -s["share"])
    result[app.name] = sw

for v in result.values():
    for s in v:
        s.pop("rgb")
        s["share"] = round(s["share"], 3)
json.dump(result, open(out_json, "w"), indent=1)

# swatch sheet
row, lw, W = 46, 130, 1000
img = Image.new("RGB", (W, row * len(result) + 10), "white")
d = ImageDraw.Draw(img)
try:
    f = ImageFont.truetype("arial.ttf", 13); fs = ImageFont.truetype("arial.ttf", 10)
except OSError:
    f = fs = ImageFont.load_default()
for r, (app, sw) in enumerate(result.items()):
    y = 5 + r * row
    d.text((8, y + 14), app, fill="black", font=f)
    x0, tot = lw, sum(s["share"] for s in sw)
    for s in sw:
        w = int((W - lw - 10) * s["share"] / tot)
        d.rectangle([x0, y, x0 + w, y + row - 8], fill=s["hex"])
        if w > 48:
            d.text((x0 + 4, y + 2), s["hex"], fill="white" if s["lum"] < 0.35 else "black", font=fs)
        x0 += w
img.save(out_png)
print(json.dumps(result, indent=None)[:20000])
