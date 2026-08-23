import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_xc_icon():
    size = 1024
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))

    cx, cy = size / 2, size / 2
    box_size = 780
    corner_radius = 160

    left = cx - box_size / 2
    top = cy - box_size / 2
    right = cx + box_size / 2
    bottom = cy + box_size / 2

    # 1. Soft Drop Shadow
    shadow_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_img)
    shadow_draw.rounded_rectangle(
        [left + 6, top + 18, right + 6, bottom + 18],
        radius=corner_radius,
        fill=(0, 0, 0, 160)
    )
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=28))
    img.alpha_composite(shadow_img)

    # 2. Main Cube (Rounded Square - 0 degree upright) with Light Blue / Lavender Gradient
    cube_canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    
    # Rounded rect mask
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [left, top, right, bottom],
        radius=corner_radius,
        fill=255
    )

    # App's signature vibrant light blue to lavender gradient (47, 118, 219 -> 153, 152, 228)
    grad_surf = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    grad_draw = ImageDraw.Draw(grad_surf)

    for y in range(int(top), int(bottom) + 1):
        ratio = (y - top) / (bottom - top)
        # Linear blend from bright electric blue (47, 125, 235) to light lavender cyan (160, 168, 245)
        r = int(47 + ratio * (160 - 47))
        g = int(125 + ratio * (168 - 125))
        b = int(235 + ratio * (245 - 235))
        grad_draw.line([(left, y), (right, y)], fill=(r, g, b, 255))

    cube_canvas.paste(grad_surf, (0, 0), mask)

    # 3. Outer Border Outline
    border_draw = ImageDraw.Draw(cube_canvas)
    border_draw.rounded_rectangle(
        [left, top, right, bottom],
        radius=corner_radius,
        outline=(255, 255, 255, 220),
        width=8
    )

    # 4. Extra-Bold Pure Black "XC" Monogram
    font = None
    font_paths = [
        "C:\\Windows\\Fonts\\ariblk.ttf",     # Arial Black
        "C:\\Windows\\Fonts\\segoeuib.ttf",    # Segoe UI Bold
        "C:\\Windows\\Fonts\\impact.ttf",      # Impact
        "C:\\Windows\\Fonts\\arialbd.ttf"      # Arial Bold
    ]
    for fp in font_paths:
        if os.path.exists(fp):
            try:
                font = ImageFont.truetype(fp, 400)
                break
            except:
                continue

    if not font:
        font = ImageFont.load_default()

    text = "XC"
    bbox = ImageDraw.Draw(cube_canvas).textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cx - tw / 2 - bbox[0]
    ty = cy - th / 2 - bbox[1] - 8

    # Render very bold pure black text (#000000) with stroke for maximum punchiness
    text_draw = ImageDraw.Draw(cube_canvas)
    text_draw.text((tx, ty), text, font=font, fill=(0, 0, 0, 255), stroke_width=12, stroke_fill=(0, 0, 0, 255))

    img.alpha_composite(cube_canvas)

    # Ensure output directories exist
    os.makedirs("assets", exist_ok=True)
    os.makedirs("assets/editor", exist_ok=True)
    os.makedirs("bin", exist_ok=True)
    os.makedirs("bin/assets", exist_ok=True)
    os.makedirs("bin/assets/editor", exist_ok=True)

    # Save PNGs
    png_512 = img.resize((512, 512), Image.LANCZOS)
    png_512.save("assets/icon.png", format="PNG")
    png_512.save("assets/editor/icon.png", format="PNG")
    png_512.save("bin/assets/editor/icon.png", format="PNG")

    # Generate Multi-Resolution Windows ICO
    icon_sizes = [(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    img.save("assets/app_icon.ico", format="ICO", sizes=icon_sizes)
    img.save("bin/app_icon.ico", format="ICO", sizes=icon_sizes)

    print("[SUCCESS] Re-generated upright light-blue cube icon with bold black XC!")

if __name__ == "__main__":
    create_xc_icon()
