#!/usr/bin/env python3
"""Build OG and favicon raster assets from the square brand master image."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "website.png"
PUBLIC = ROOT / "public"
IMAGES = PUBLIC / "images"

OG_WIDTH = 1200
OG_HEIGHT = 630
JPEG_QUALITY = 88


def load_master() -> Image.Image:
    if not MASTER.is_file():
        raise SystemExit(f"Missing master image: {MASTER}")
    image = Image.open(MASTER).convert("RGB")
    if image.width != image.height:
        raise SystemExit(f"Expected square master image, got {image.width}x{image.height}")
    return image


def build_og_image(master: Image.Image) -> Image.Image:
    side = OG_HEIGHT
    resized = master.resize((side, side), Image.Resampling.LANCZOS)
    background = Image.new("RGB", (OG_WIDTH, OG_HEIGHT), (0, 0, 0))
    offset_x = (OG_WIDTH - side) // 2
    background.paste(resized, (offset_x, 0))
    return background


def save_jpeg(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="PNG", optimize=True)


def main() -> None:
    master = load_master()
    og = build_og_image(master)

    og_jpg = IMAGES / "og-default.jpg"
    save_jpeg(og, og_jpg)

    icon_512 = master.resize((512, 512), Image.Resampling.LANCZOS)
    save_png(icon_512, IMAGES / "site-icon-512.png")

    save_png(icon_512.resize((180, 180), Image.Resampling.LANCZOS), PUBLIC / "apple-touch-icon.png")
    save_png(icon_512.resize((48, 48), Image.Resampling.LANCZOS), PUBLIC / "favicon-48.png")

    print(f"Wrote {og_jpg} ({OG_WIDTH}x{OG_HEIGHT})")
    print(f"Wrote {PUBLIC / 'favicon-48.png'} and {PUBLIC / 'apple-touch-icon.png'}")


if __name__ == "__main__":
    main()
