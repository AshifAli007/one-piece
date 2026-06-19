# Reproduce the "Gears" cinematic in Draw Things (Wan 2.2 I2V)

Step-by-step, one clip at a time. Same flow as our Kling build: animate a start
image -> export -> grab its last frame -> use as the next clip's start (chaining)
-> stitch at the end.

All start images are in `onepiece/keyframes/`.

---

## One-time setup

1. **Model Manager -> download:**
   - `Wan 2.2 High Noise Expert [T2V/I2V A14B]` (SVDQuant) — the base
   - `Wan 2.2 Low Noise Expert [T2V/I2V A14B]` (SVDQuant) — the refiner
   - (16 GB RAM? use the **A5B** variants instead.)
2. **Fixed settings for every clip** (set once):
   - Mode: **Image to Video** (drop the start image on the canvas, fill it fully)
   - Base model: **Wan 2.2 High Noise Expert**
   - Refiner: **Wan 2.2 Low Noise Expert**, refiner start ~**12%**
   - Frames: **81**  ·  Size: **1024x576**  ·  Steps: ~**20**  ·  CFG ~**5**
   - Export: **H.264**, **16 fps**
   - Negative prompt (all clips): `blurry, low quality, distorted, deformed, extra limbs, text, watermark`
3. Make a working folder for outputs, e.g. `onepiece/dt-out/`.

> Note: standard Wan I2V uses ONLY the start image (no end frame). The prompt
> steers the ending, so it won't be pixel-identical to our Kling end poses. If
> you find a **Wan FLF2V (first-last-frame)** model, load our matching END frame
> as the last frame to pin it exactly (end frames listed per clip below).

---

## Clip 1 — "The Coil"
- Start image: `keyframes/op-void-base.png`
- (FLF2V end, optional): `keyframes/op-void-coil.png`
- Prompt: `Anime Luffy alone in a pure black void slowly coils down into a tense crouch, fists clenching, head bowing, thin white steam curling off his body, faint red glow flickering under his skin, sparks gathering, camera slowly pushes in`
- Camera: zoom in
- Export -> `dt-out/clip1.mp4`

## Clip 2 — "The Ignition" (Gear 2)
- Start image: `keyframes/op-void-join1.png`  (or clip1's last frame you extract)
- (FLF2V end): `keyframes/op-void-erupt.png`
- Prompt: `He erupts upward, whole body bursts into billowing white steam, skin flashes glossy red with crackling lightning-like energy veins, fierce confident hero stance, embers spiraling outward, low hero angle, pure black background`
- Camera: tilt up / slight zoom
- Export -> `dt-out/clip2.mp4`

## Clip 3 — "Gigant Pistol" (Gear 3)
- Start image: `keyframes/op-void-join2.png`
- (FLF2V end): `keyframes/op-void-gear3.png`
- Prompt: `Glowing red Gear 2 Luffy lunges forward, bites his thumb and blasts air into one arm, inflating it into a colossal skin-toned giant fist rocketing toward the camera, red energy crackling, steam billowing, pure black background`
- Camera: punch-in toward camera
- Export -> `dt-out/clip3.mp4`

## Clip 4 — "Reset & Reach"
- Start image: `keyframes/op-void-join3.png`
- (FLF2V end): `keyframes/op-void-hand.png`
- Prompt: `The giant fist rapidly deflates back to a normal arm, all red glow and steam fade away, he straightens into a calm composed stance and raises one open hand in front of him, palm forward, pure black background`
- Camera: slow pull back
- Export -> `dt-out/clip4.mp4`

## Clip 5 — "Haki Coat"
- Start image: `keyframes/op-void-join4.png`
- (FLF2V end): `keyframes/op-void-haki.png`
- Prompt: `He snaps his open hand into a tight fist and glossy obsidian-black Armament Haki races up his forearm to the shoulder, dark purple energy crackling around the blackened arm, intense, pure black background`
- Camera: hold / slight push
- Export -> `dt-out/clip5.mp4`

## Clip 6a — "Bite & Blow"
- Start image: `keyframes/op-void-join5.png`
- (FLF2V end): `keyframes/op-void-gear4-bite.png`
- Prompt: `He raises his one black Armament-Haki forearm to his wide-open mouth and blows powerfully into it, the iconic Gear 4 air-intake, head tilted back; only that one arm is black haki, the rest of his body stays normal and un-inflated, pure black background`
- Camera: hold
- Export -> `dt-out/clip6a.mp4`

## Clip 6b — "Boundman" (finale)
- Start image: `keyframes/op-void-join6a.png`
- (FLF2V end): `keyframes/op-void-gear4.png`
- Prompt: `Right after blowing air in, his upper torso and arms balloon and inflate huge and muscular, glossy black Armament Haki with glowing red flame-like tribal tattoos spreads across his arms torso and legs, hair stands on end, thick white steam bursts off, camera does a full 360-degree orbit around him, lands in a springy bouncy Boundman stance, pure black background`
- Camera: 360 orbit
- This was 10s in our edit. Wan 81 frames ~= 5s; either accept 5s, or run it as
  two chained 5s segments (extract the midpoint frame and continue).
- Export -> `dt-out/clip6b.mp4`

---

## Chaining between clips
After each clip, grab its true last frame for the next start (only needed if you
prefer continuity over using our provided join frames):
```bash
ffmpeg -sseof -0.1 -i dt-out/clip1.mp4 -frames:v 1 \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" \
  dt-out/join1.png
```

## Final stitch
```bash
cd onepiece/dt-out
ffmpeg -y -i clip1.mp4 -i clip2.mp4 -i clip3.mp4 -i clip4.mp4 -i clip5.mp4 -i clip6a.mp4 -i clip6b.mp4 \
 -filter_complex "[0:v]scale=1280:720,fps=24,setsar=1[v0];[1:v]scale=1280:720,fps=24,setsar=1[v1];[2:v]scale=1280:720,fps=24,setsar=1[v2];[3:v]scale=1280:720,fps=24,setsar=1[v3];[4:v]scale=1280:720,fps=24,setsar=1[v4];[5:v]scale=1280:720,fps=24,setsar=1[v5];[6:v]scale=1280:720,fps=24,setsar=1[v6];[v0][v1][v2][v3][v4][v5][v6]concat=n=7:v=1[outv]" \
 -map "[outv]" -c:v libx264 -pix_fmt yuv420p -crf 18 -movflags +faststart gears-drawthings.mp4
```
Drop `gears-drawthings.mp4` into `onepiece/public/video/` to use it on the site.
