#!/usr/bin/env python3
"""Crop clean square advisor portraits from Adobe PDF page renders.

Photos on the source pages are small portrait rectangles followed by a purple
caption. We auto-detect each photo's exact rectangle (so captions are never
baked in), then crop a face-framed square biased toward the top of the frame.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / ".extract" / "adobe-advisory"
OUT = ROOT / "viewer" / "assets" / "advisors"

# 200 DPI renders are 1655 x 2340.
PAGE_W, PAGE_H = 1655, 2340

# Approximate top-left of each photo per grid cell (col, row), calibrated to the
# 200 DPI render. Detection refines the exact rectangle from these seeds.
COL_X = [129, 642, 1153]
ROW_Y = [720, 1270, 1815]

# Search window around each seed.
WIN_W = 320
WIN_H = 360

# Extra headroom (px) kept above the detected top so no crown is clipped.
# Keep tiny: the source photos are tightly framed, so anything larger pulls in
# the cream page background above the photo and bakes a light band into the crop.
TOP_PAD = 1

PAGE_7 = [
    ("anupama-chopra", 0, 0),
    ("aparna-purohit", 1, 0),
    ("ekta-kapoor", 2, 0),
    ("faye-dsouza", 0, 1),
    ("gayatri-yadav", 1, 1),
    ("gauri-shinde", 2, 1),
    ("guneet-monga-kapoor", 0, 2),
    ("jyoti-deshpande", 1, 2),
    ("kanika-dhillon", 2, 2),
]

# A couple of advisors read better from the standalone square renders that were
# pulled straight out of the PDF, so use those files directly instead of
# re-detecting them from the grid page.
RAW_OVERRIDE = {
    "varun-grover": "p7-8/advisor-015.jpg",
    "vani-tripathi": "p7-8/advisor-016.jpg",
}
RAW_SIZE = 320
RAW_ZOOM = 1.35  # zoom into the override photos, focal point top-center

PAGE_8 = [
    ("karan-johar", 0, 0),
    ("miriam-joseph", 1, 0),
    ("nikhil-advani", 2, 0),
    ("siddharth-roy-kapur", 0, 1),
    ("tahira-kashyap", 1, 1),
    ("twinkle-khanna", 2, 1),
    ("varun-grover", 0, 2),
    ("vani-tripathi", 1, 2),
]


def is_background(px) -> bool:
    r, g, b = px[0], px[1], px[2]
    return r > 232 and g > 227 and b > 212


def detect_photo_box(page, seed_x, seed_y):
    """Find the solid photo rectangle within a search window around the seed."""
    x0 = max(0, seed_x - 30)
    y0 = max(0, seed_y - 40)
    x1 = min(PAGE_W, seed_x + WIN_W)
    y1 = min(PAGE_H, seed_y + WIN_H)
    win = page.crop((x0, y0, x1, y1))
    w, h = win.size
    px = win.load()

    mask = [[0] * w for _ in range(h)]
    for yy in range(h):
        row = mask[yy]
        for xx in range(w):
            if not is_background(px[xx, yy]):
                row[xx] = 1

    # Row projection -> find the tall solid block (photo), stop before caption.
    row_sums = [sum(mask[yy]) for yy in range(h)]
    col_sums = [sum(mask[yy][xx] for yy in range(h)) for xx in range(w)]

    # Photo columns: those with many non-bg pixels.
    col_thr = 0.45 * max(col_sums) if col_sums else 0
    cols = [xx for xx, c in enumerate(col_sums) if c >= col_thr]
    if not cols:
        return None
    left, right = min(cols), max(cols)
    photo_w = right - left

    # Photo top: first row with even a little content (catches thin hair/crown).
    hair_thr = 0.18 * photo_w
    top = None
    for yy in range(h):
        if row_sums[yy] >= hair_thr:
            top = yy
            break
    if top is None:
        return None

    # Photo bottom: run while rows stay reasonably filled, break on caption gap.
    body_thr = 0.5 * photo_w
    bottom = top
    for yy in range(top, h):
        if row_sums[yy] >= body_thr:
            bottom = yy
        else:
            gap = all(row_sums[k] < body_thr for k in range(yy, min(yy + 12, h)))
            if gap:
                break

    top = max(0, top - 0)  # detection already at crown; padding added later
    return (x0 + left, y0 + top, x0 + right, y0 + bottom)


def native_portrait(page, box):
    """Crop the full photo rectangle plus a little headroom.

    We keep the native portrait shape and let the square CSS container crop the
    bottom (torso), anchored to the top, so heads are never clipped.
    """
    left, top, right, bottom = box
    top = max(0, top - TOP_PAD)
    return page.crop((left, top, right, bottom))


def extract_overrides():
    for slug, rel in RAW_OVERRIDE.items():
        src = SRC / rel
        if not src.exists():
            print(f"  !! {slug}: raw override missing ({rel})")
            continue
        img = Image.open(src).convert("RGB")
        w, h = img.size
        side = min(w, h)
        left = (w - side) // 2
        top = (h - side) // 2
        sq = img.crop((left, top, left + side, top + side))
        # Zoom in with the focal point at top-center.
        z = round(side / RAW_ZOOM)
        zx = (side - z) // 2
        sq = sq.crop((zx, 0, zx + z, z)).resize((RAW_SIZE, RAW_SIZE))
        dest = OUT / f"{slug}.jpg"
        sq.save(dest, "JPEG", quality=92)
        print(f"  {dest.name}  {sq.size}  (raw override)")


def extract(page_path, mapping):
    page = Image.open(page_path).convert("RGB")
    for slug, col, row in mapping:
        seed_x = COL_X[col]
        seed_y = ROW_Y[row]
        box = detect_photo_box(page, seed_x, seed_y)
        if box is None:
            print(f"  !! {slug}: detection failed")
            continue
        if slug in RAW_OVERRIDE:
            continue
        portrait = native_portrait(page, box)
        dest = OUT / f"{slug}.jpg"
        portrait.save(dest, "JPEG", quality=92)
        print(f"  {dest.name}  {portrait.size}")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    print("Page 7:")
    extract(SRC / "page200-07.png", PAGE_7)
    print("Page 8:")
    extract(SRC / "page200-08.png", PAGE_8)
    print("Overrides:")
    extract_overrides()
    print(f"\nDone: {len(list(OUT.glob('*.jpg')))} portraits in {OUT}")


if __name__ == "__main__":
    main()
