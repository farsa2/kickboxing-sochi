from __future__ import annotations

import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
IMAGES_DIR = ROOT / "public" / "images"
VIDEOS_DIR = ROOT / "public" / "videos"


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def optimize_video(source: Path, crf: int = 27) -> None:
    tmp_output = source.with_suffix(".tmp.mp4")
    vf = "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))':flags=lanczos"
    cmd = [
        "ffmpeg",
        "-y",
        "-i",
        str(source),
        "-vf",
        vf,
        "-c:v",
        "libx264",
        "-profile:v",
        "high",
        "-level",
        "4.0",
        "-preset",
        "medium",
        "-crf",
        str(crf),
        "-movflags",
        "+faststart",
        "-pix_fmt",
        "yuv420p",
        "-an",
        str(tmp_output),
    ]
    run(cmd)
    tmp_output.replace(source)


def to_webp(source: Path, destination: Path, quality: int = 80, width: int | None = None) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    cmd = ["cwebp", "-quiet", "-q", str(quality)]
    if width:
        cmd.extend(["-resize", str(width), "0"])
    cmd.extend([str(source), "-o", str(destination)])
    run(cmd)


def optimize_all_videos() -> None:
    for video in sorted(VIDEOS_DIR.rglob("*.mp4")):
        optimize_video(video)


def optimize_all_images() -> None:
    for image in sorted(IMAGES_DIR.rglob("*")):
        if image.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        to_webp(image, image.with_suffix(".webp"), quality=82)


def create_responsive_variants() -> None:
    tasks: list[tuple[Path, list[int], int]] = [
        (IMAGES_DIR / "hero-bg-bag.jpg", [768, 1280, 1920], 82),
        (IMAGES_DIR / "about.jpg", [640, 960, 1280], 82),
    ]

    for idx in range(1, 11):
        tasks.append((IMAGES_DIR / "gallery-premium" / f"gallery-{idx:02d}.jpg", [480, 960], 80))

    for idx in range(1, 8):
        tasks.append((IMAGES_DIR / f"coach-poster-{idx}.png", [480, 960], 82))

    for source, widths, quality in tasks:
        for width in widths:
            destination = source.with_name(f"{source.stem}-{width}.webp")
            to_webp(source, destination, quality=quality, width=width)


def main() -> None:
    optimize_all_videos()
    optimize_all_images()
    create_responsive_variants()
    print("Media optimization complete.")


if __name__ == "__main__":
    main()
