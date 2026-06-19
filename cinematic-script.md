# One Piece - Luffy "Gears Awakening" Cinematic - Shot Script

A high-energy anime sequence: Luffy escalating through his gears - Base -> Gear 2 -> Gear 3 ->
Gear 4 Boundman -> Snakeman - mid-fight, each transition fused into an attack so the power-up
and the punch happen at the same time. Built with the script-first + Kling frame-chaining flow
(see ~/.cursor/skills/motion-sites/references/scripted-kling-cinematic.md).

Personal/educational fan demo. Luffy is Eiichiro Oda / Toei IP - not for commercial use.

## Style bible (append to every still + every clip prompt)

modern shonen anime, cel-shaded with cinematic lighting, bold ink linework, dynamic motion blur,
speed lines, impact frames, dramatic rim light, dust and debris, vivid saturated color, epic
low-angle hero framing, 16:9.

## Character lock (keep identical across EVERY keyframe for consistency)

Monkey D. Luffy: lean muscular young man, messy black hair, small scar under his LEFT eye,
open RED sleeveless vest (bare chest, X-shaped scar), blue knee shorts, yellow waist sash,
straw hat hanging on his back by a cord. Always same face, same outfit, same hat.
Generation tip: generate the Base still first, then generate every other keyframe with that
file passed as a reference image (img2img) so the character stays on-model.

## Setting

A cracked stone battle arena at dusk, ruined pillars, embers and dust in the air, storm sky.
Keep the SAME arena/background in every shot so cuts read as one continuous fight.

## Full beat map (the whole arc - we build it in pieces)

| #   | Form            | Visual signature                                                     | Signature beat                                       |
| --- | --------------- | -------------------------------------------------------------------- | ---------------------------------------------------- |
| 1   | Base            | normal Luffy, straw-hat grin, determined                             | winds up a stretching Gomu Gomu no Pistol            |
| 2   | Gear 2          | steam pouring off body, pink-red shiny skin                          | the wind-up IGNITES into Gear 2; Jet Pistol barrage  |
| 3   | Gear 3          | bites thumb, one arm inflates to giant size                          | Gigant Pistol - a giant fist smashes down            |
| 4   | Gear 4 Boundman | bloated upper body, black haki flame tattoos on arms, bounces, steam | Kong Gun - recoils then fires a massive haki punch   |
| 5   | Snakeman        | leaner, flame-shaped hair, haki forearms, gaseous steam-fire         | King Cobra - a homing, accelerating serpentine punch |

(Tankman optional later: huge round haki torso, defensive bounce-counter.)

Transitions are always FUSED with an attack - never a standing power-up. Each next clip starts
from the previous clip's actual extracted last frame (true frame-chaining).

---

## BUILD NOW - 2 clips: Base -> Gear 2 (minimalist black-void rework)

Creative core: a pure-BLACK-VOID character study. No environment, no punching - the steam,
the red glow and the body language carry everything. Each clip has its own camera move + pose
so that, played on scroll, it feels like the camera is cutting around the character as he
charges and then erupts into Gear 2. Energy and silhouette are the whole spectacle.

Void style override (append to every still + clip): pure solid black background, single
dramatic rim/key light carving the figure out of darkness, glowing volumetric steam, floating
embers and energy sparks, deep contrast, no scenery, no horizon. Character only.

### Clip 1 - "The Coil" (gathering energy)

- Camera: starts eye-level wide, slow PUSH-IN + slight orbit to 3/4 as he lowers.
- START keyframe (generate): Base Luffy standing calm and centered in a pure black void,
  relaxed, arms loose, rim-lit, faint embers floating; total stillness before the storm.
  [character lock + style bible + void override]
- END keyframe (from START as reference): he has dropped into a low, coiled crouch, both fists
  clenched at his sides, head slightly bowed, muscles taut; thin threads of white steam curl
  upward off his shoulders and arms and a faint red flush flickers under his skin; energy
  sparks gather around him. Same black void. The "about to burst" pose.
- Duration: 5s. Audio off.
- Motion / prompt: "Anime fighter alone in a pure black void slowly coils down into a tense
  crouch, fists clenching, head bowing, muscles tightening; thin wisps of white steam begin
  curling off his body and a faint red energy glow flickers under his skin, sparks gathering;
  camera slowly pushes in; quiet, building, ominous power; glowing rim light, floating embers,
  deep contrast, no background; <style bible>."

### Clip 2 - "The Ignition" (Gear 2 erupts)

- Camera: snaps to a low hero angle, slight rise, then settles.
- START keyframe: clip 1's EXTRACTED last frame (coiled, steam beginning).
- END keyframe (from clip1 last frame as reference): FULL Gear 2 - he has surged upright into a
  confident hero stance, body wreathed in thick billowing steam, skin glowing glossy red with
  crackling energy veins like lightning across his arms and chest, fierce grin, embers spiraling
  outward in a shockwave; one fist raised / chest out, radiating power. Pure black void.
- Duration: 5s. Audio off.
- Motion / prompt: "The coiled fighter erupts upward as his whole body bursts into billowing
  white steam and his skin flashes glossy red with crackling lightning-like energy veins; he
  throws his stance open into a fierce confident hero pose, embers spiraling outward in a
  shockwave, intense aura; explosive but controlled power-up, low hero angle, glowing rim light,
  pure black background; <style bible>."

### Clip 3 - "Gigant Pistol" (Gear 3, pre-haki) [BUILT]

- START: clip 2's extracted last frame (Gear 2 stance). END: he lunges, bites his thumb and
  inflates one arm into a colossal SKIN-TONED giant fist toward camera, keeping the red Gear 2
  glow + steam (no haki yet). Pure black void. -> public/video/op-clip3.mp4

### Clip 4 - "Reset & Reach" (power down to normal) [next]

- START: clip 3's extracted last frame (giant fist + red glow).
- END (generate from op-void-base reference): the giant arm deflates back to normal, ALL red
  glow and steam fade away; calm NORMAL Luffy in a confident frontal stance raises one arm and
  holds his hand OPEN, palm forward, calmly looking at it. Plain skin, no gear. Pure black void.
  -> assets/op-void-hand.png
- Motion: giant fist shrinks back to normal, energy dissipates, he straightens and lifts his
  open hand; quiet, controlled, the calm before the next escalation.

### Clip 5 - "Haki Coat" (introduce Armament Haki) [next]

- START: clip 4's extracted last frame (open hand, normal).
- END (generate from op-void-hand reference): he snaps the open hand into a tight FIST and
  glossy obsidian-BLACK Armament Haki races up from the fist along the whole arm to the
  shoulder, with subtle flame patterning and dark purple energy crackling. Rest of body normal.
  Pure black void. -> assets/op-void-haki.png
- Motion: sudden clench, black haki surges up the arm like spreading ink/metal, dark sparks.
- This black-haki arm is the springboard into Gear 4 (next session).

### Clip 6 - "Gear 4 Boundman" (THE FINALE - canon activation, split in 2 for the bite)

Canon activation order (One Piece, researched): 1) coat forearm in Armament Haki [done in clip 5]
-> 2) Luffy BITES his haki-coated hand/thumb -> 3) blows a massive amount of air into his body
("Muscle Balloon"): his muscles inflate, emphasis on the upper torso, and he grows taller -> 4) black Armament Haki spreads over arms, legs and torso as glowing RED flame-like tattoo
patterns, hair stands on end, smokey eyes -> 5) lands in the constant springy BOUNCE.

- Character: ALWAYS "Monkey D. Luffy from One Piece", anime style (not a generic fighter).
- LESSON: a single start->end clip skipped the bite (it's a mid-action neither keyframe shows).
  Fix = split so the BITE/BLOW is its own clip's END frame, guaranteeing it animates.

#### Clip 6a - "Bite & Blow" (air intake) - AS-IS, no transformation yet

- START: clip 5's extracted last frame (ONE black-haki arm, body otherwise normal).
- END (generated from join5 reference): Luffy raises that SAME one black-haki forearm to his
  WIDE-OPEN mouth and blows air into it (iconic Gear 4 air-intake). CRUCIAL: only the one arm is
  black haki; the OTHER arm and his whole body stay NORMAL skin, NOT inflated - the bite happens
  "as he is", the transformation does NOT start until 6b. -> assets/op-void-gear4-bite.png
- Duration: 5s. Prompt: "Monkey D. Luffy from One Piece, anime style, pure black background; he
  raises his one black Armament-Haki forearm up to his wide-open mouth and blows powerfully into
  it, the iconic Gear 4 air-intake, head tilted back; only that one arm is black haki, his other
  arm and whole body stay completely normal and un-inflated; intense determined eyes, minimal
  effects, clearly readable iconic pose, smooth cinematic anime motion."
- NOTE: 'bite/teeth on own arm' wording trips the image safety filter; phrase as 'holds forearm
  to open mouth and blows' instead.

#### Clip 6b - "Boundman" (full inflation -> final form)

- START: clip 6a's extracted last frame (biting, cheeks puffed, inflating).
- END: the ALREADY-APPROVED final Gear 4 form -> assets/op-void-gear4.png (do NOT regenerate).
- Duration: 10s. Prompt: "Monkey D. Luffy from One Piece, anime style, on a pure black background
  completes his Gear 4 Boundman transformation: his upper torso and arms balloon and inflate
  huge and muscular as he grows taller, glossy black Armament Haki with glowing red flame-like
  tribal tattoos spreads fully across his arms, torso and legs, his hair stands on end, thick
  white steam bursts off his whole body; the camera slowly orbits around him; he lands in a
  springy bouncy Boundman combat stance, fierce grin, glowing eyes, embers and sparks flying,
  explosive cinematic anime power-up."

### Pipeline (per the skill)

```
# 1. generate Base still -> assets/base.png  (1280x720, character lock)
# 2. generate clip1 END from base.png as reference -> assets/g1_end.png
# 3. node scripts/kling-i2v.mjs --start assets/base.png --end assets/g1_end.png --duration 5 \
#      --out public/video/op-clip1.mp4 --prompt "<clip1 prompt>"
# 4. ffmpeg -sseof -0.1 -i public/video/op-clip1.mp4 -frames:v 1 \
#      -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720" /tmp/op_join1.png
# 5. generate clip2 END (Gear 2) from /tmp/op_join1.png as reference -> assets/g2_end.png
# 6. node scripts/kling-i2v.mjs --start /tmp/op_join1.png --end assets/g2_end.png --duration 5 \
#      --out public/video/op-clip2.mp4 --prompt "<clip2 prompt>"
# 7. concat op-clip1 + op-clip2 -> public/video/op-base-to-gear2.mp4 (preview)
```

Cost: 2 clips x ~$0.42 = ~$0.84 + any re-rolls.

## Risks / notes

- Character consistency is the hard part for ORIGINAL pieces (no reference video). Mitigate by
  always generating new keyframes with the Base still as an image reference, same outfit wording.
- Keep one action per clip; the "stretch + steam" simultaneity is fine because it's one motion.
- Same camera + same arena across clips so the chained joins read as one continuous fight.
