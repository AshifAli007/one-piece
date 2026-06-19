#!/usr/bin/env node
// Kling image-to-video via fal.ai. Reusable for the motion-sites cinematic pipeline.
//
// Requires:  FAL_KEY env var, and `@fal-ai/client` installed (npm i @fal-ai/client)
// Usage:
//   node kling-i2v.mjs --start a.png [--end b.png] --prompt "..." \
//        [--duration 5] [--audio] [--model fal-ai/kling-video/v3/standard/image-to-video] \
//        [--cfg 0.5] [--neg "blur, distort, low quality"] --out out.mp4
//
// --start/--end accept local file paths (auto-uploaded) or http(s) URLs.
// Audio is OFF by default (cheaper, and the site supplies its own score).

import { fal } from "@fal-ai/client";
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

function arg(name, def = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return def;
  const next = process.argv[i + 1];
  if (next === undefined || next.startsWith("--")) return true; // boolean flag
  return next;
}

const FAL_KEY = process.env.FAL_KEY;
if (!FAL_KEY) {
  console.error(
    "FAL_KEY is required.\nGet one at https://fal.ai/dashboard/keys then:\n  export FAL_KEY=...",
  );
  process.exit(1);
}
fal.config({ credentials: FAL_KEY });

const model = arg("model", "fal-ai/kling-video/v3/standard/image-to-video");
const start = arg("start");
const end = arg("end");
const prompt = arg("prompt", "");
const duration = String(arg("duration", "5"));
const audio = arg("audio", false) === true;
const cfg = parseFloat(arg("cfg", "0.5"));
const neg = arg("neg", "blur, distort, and low quality");
const out = arg("out", "kling-out.mp4");

if (!start) {
  console.error("Missing --start <image path or url>");
  process.exit(1);
}

const isUrl = (s) => typeof s === "string" && /^https?:\/\//.test(s);

async function toUrl(pathOrUrl) {
  if (isUrl(pathOrUrl)) return pathOrUrl;
  const buf = await readFile(pathOrUrl);
  const file = new File([buf], basename(pathOrUrl), { type: "image/png" });
  const url = await fal.storage.upload(file);
  console.log(`uploaded ${pathOrUrl} -> ${url}`);
  return url;
}

const input = {
  start_image_url: await toUrl(start),
  prompt,
  duration,
  generate_audio: audio,
  negative_prompt: neg,
  cfg_scale: cfg,
};
if (end) input.end_image_url = await toUrl(end);

const perSec = audio ? 0.126 : 0.084; // kling v3 standard i2v
console.log(
  `\nModel: ${model}\nDuration: ${duration}s  Audio: ${audio}\n` +
    `Est. cost: ~$${(perSec * Number(duration)).toFixed(2)}\nSubmitting...\n`,
);

const result = await fal.subscribe(model, {
  input,
  logs: true,
  onQueueUpdate: (u) => {
    if (u.status === "IN_PROGRESS") {
      (u.logs || []).forEach((l) => l.message && console.log(l.message));
    } else {
      console.log(`status: ${u.status}`);
    }
  },
});

const video = result?.data?.video;
if (!video?.url) {
  console.error("No video in response:", JSON.stringify(result?.data, null, 2));
  process.exit(1);
}
console.log(`\nGenerated: ${video.url} (${video.file_size} bytes)`);
const resp = await fetch(video.url);
const arrbuf = Buffer.from(await resp.arrayBuffer());
await writeFile(out, arrbuf);
console.log(`Saved -> ${out}`);
