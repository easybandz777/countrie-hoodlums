"""
Alpha-key the Capsule 01 artwork PNGs.

Every artwork file in artwork/capsule-01/ currently ships as opaque RGB
(some are even JPEGs renamed to .png). Printful's mockup generator
faithfully prints the white background as a literal white rectangle on
every garment — that's the "sticker on a shirt" defect.

Fix: convert each file to RGBA with the white background keyed out.

The key uses a soft threshold on min(R,G,B):
  - min >= WHITE_HIGH (250) → fully transparent
  - min <= WHITE_LOW (230) → fully opaque
  - linear in between for smooth edges

Creek Cream #F5F0E1 = (245, 240, 225). Its minimum channel is 225, well
below WHITE_LOW, so Creek Cream artwork survives untouched.

Antique Gold #C9A227 = (201, 162, 39). Min channel 39 — survives.

The originals are copied to artwork/capsule-01/originals/ before any
in-place rewrite. Run idempotently — once a file has alpha < 255 anywhere
it's already keyed and is skipped.
"""

import os
import sys
from PIL import Image
import numpy as np

ROOT = "/Users/williambeltz/Documents/countrie-hoodlums"
# Process both copies: gitignored /artwork (image-gen source) AND
# /public/artwork (committed, served from thecountriehoodlums.com so the
# Printful mockup generator can fetch via URL).
INPUT_DIRS = [
    os.path.join(ROOT, "artwork/capsule-01"),
    os.path.join(ROOT, "public/artwork/capsule-01"),
]

FILES = [
    "piece-01-back.png",
    "piece-02-front.png",
    "piece-03-back.png",
    "piece-04-back.png",
    "piece-05-hood.png",
    "piece-06-front.png",
    "piece-07-front.png",
    "piece-09-front.png",
]

WHITE_LOW = 230
WHITE_HIGH = 250


def key_one(src: str, backup: str) -> None:
    """Alpha-key src in-place. Idempotent."""
    if not os.path.exists(src):
        print(f"SKIP missing: {src}", file=sys.stderr)
        return

    if not os.path.exists(backup):
        os.makedirs(os.path.dirname(backup), exist_ok=True)
        with open(src, "rb") as inp, open(backup, "wb") as out:
            out.write(inp.read())

    probe = Image.open(src)
    if probe.mode == "RGBA":
        alpha_min = np.array(probe)[:, :, 3].min()
        if alpha_min < 255:
            print(f"SKIP already keyed: {src}")
            probe.close()
            return
    probe.close()

    im = Image.open(src).convert("RGB")
    arr = np.array(im)
    R, G, B = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    min_ch = np.minimum(np.minimum(R, G), B).astype(np.int32)

    alpha = np.clip(
        (WHITE_HIGH - min_ch) * (255.0 / (WHITE_HIGH - WHITE_LOW)),
        0, 255,
    ).astype(np.uint8)

    rgba = np.dstack([arr, alpha])
    out = Image.fromarray(rgba, mode="RGBA")
    out.save(src, "PNG", optimize=True)

    transparent_pct = (alpha == 0).sum() / alpha.size * 100
    opaque_pct = (alpha == 255).sum() / alpha.size * 100
    print(
        f"OK {src}: keyed "
        f"({transparent_pct:.1f}% transparent, "
        f"{opaque_pct:.1f}% fully opaque)"
    )


def main() -> int:
    for input_dir in INPUT_DIRS:
        backup_dir = os.path.join(input_dir, "originals")
        for fname in FILES:
            key_one(
                os.path.join(input_dir, fname),
                os.path.join(backup_dir, fname),
            )
    return 0


if __name__ == "__main__":
    sys.exit(main())
