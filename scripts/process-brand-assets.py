#!/usr/bin/env python3
"""Build OG and favicon raster assets from the square brand master image."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "website.png"
PUBLIC = ROOT / "public"
IMAGES = PUBLIC / "images"

OG_WIDTH = 1200
OG_HEIGHT = 630
JPEG_QUALITY = 88

# Site tokens from guideline/ui/ui-guideline.md
RICE_BG = (255, 253, 247)
BLACK_MATTE_THRESHOLD = 32


def load_master_rgba() -> Image.Image:
    if not MASTER.is_file():
        raise SystemExit(f"Missing master image: {MASTER}")
    image = Image.open(MASTER).convert("RGBA")
    if image.width != image.height:
        raise SystemExit(f"Expected square master image, got {image.width}x{image.height}")
    return image


def is_matte_black(pixel: tuple[int, int, int, int], threshold: int) -> bool:
    red, green, blue, _alpha = pixel
    return red <= threshold and green <= threshold and blue <= threshold


def remove_exterior_matte(image: Image.Image, threshold: int = BLACK_MATTE_THRESHOLD) -> Image.Image:
    """Turn corner-connected near-black matte into transparency (keeps in-art dark pixels)."""
    if image.mode != "RGBA":
        image = image.convert("RGBA")

    width, height = image.size
    pixels = image.load()
    exterior: set[tuple[int, int]] = set()
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))

    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= width or y >= height:
            continue
        if (x, y) in exterior:
            continue
        if not is_matte_black(pixels[x, y], threshold):
            continue
        exterior.add((x, y))
        queue.append((x + 1, y))
        queue.append((x - 1, y))
        queue.append((x, y + 1))
        queue.append((x, y - 1))

    result = image.copy()
    result_pixels = result.load()
    for x, y in exterior:
        red, green, blue, _alpha = result_pixels[x, y]
        result_pixels[x, y] = (red, green, blue, 0)

    return result


def content_bbox(image: Image.Image) -> tuple[int, int, int, int]:
    alpha = image.split()[3]
    return alpha.getbbox() or (0, 0, image.width, image.height)


def fit_on_square_canvas(
    image: Image.Image,
    size: int,
    background: tuple[int, int, int, int],
    padding_ratio: float = 0.06,
) -> Image.Image:
    cropped = image.crop(content_bbox(image))
    pad = max(1, int(size * padding_ratio))
    inner = size - 2 * pad
    scale = min(inner / cropped.width, inner / cropped.height)
    target = (max(1, int(cropped.width * scale)), max(1, int(cropped.height * scale)))
    resized = cropped.resize(target, Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), background)
    offset_x = (size - resized.width) // 2
    offset_y = (size - resized.height) // 2
    canvas.paste(resized, (offset_x, offset_y), resized)
    return canvas


def build_og_image(cutout: Image.Image) -> Image.Image:
    side = OG_HEIGHT
    icon = fit_on_square_canvas(cutout, side, (0, 0, 0, 0), padding_ratio=0.04)
    canvas = Image.new("RGB", (OG_WIDTH, OG_HEIGHT), RICE_BG)
    offset_x = (OG_WIDTH - side) // 2
    canvas.paste(icon, (offset_x, 0), icon)
    return canvas


def save_jpeg(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="PNG", optimize=True)


def main() -> None:
    master = load_master_rgba()
    cutout = remove_exterior_matte(master)
    og = build_og_image(cutout)

    og_jpg = IMAGES / "og-default.jpg"
    save_jpeg(og, og_jpg)

    icon_bg = (*RICE_BG, 255)
    icon_512 = fit_on_square_canvas(cutout, 512, icon_bg)
    save_png(icon_512, IMAGES / "site-icon-512.png")

    favicon = fit_on_square_canvas(cutout, 48, (0, 0, 0, 0), padding_ratio=0.05)
    save_png(favicon, PUBLIC / "favicon-48.png")

    touch_icon = fit_on_square_canvas(cutout, 180, icon_bg)
    save_png(touch_icon, PUBLIC / "apple-touch-icon.png")

    print(f"Wrote {og_jpg} ({OG_WIDTH}x{OG_HEIGHT}) on rice background")
    print(f"Wrote {PUBLIC / 'favicon-48.png'} (transparent favicon, matte removed)")
    print(f"Wrote {PUBLIC / 'apple-touch-icon.png'}")


if __name__ == "__main__":
    main()
