import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

import { projects } from "../src/content/projects";
import type { MediaSlot } from "../src/content/schema";

const projectRoot = process.cwd();
const errors: string[] = [];
let managedMediaCount = 0;

const heroSource = resolve(
  projectRoot,
  "source-assets/hero/wildan-hero-talking-source.mp4",
);
const credentialPortrait = resolve(
  projectRoot,
  "public/media/profile/wildan-credential.jpg",
);
const projectMediaMaxBytes = 500 * 1024;

const publicMediaBudgets = [
  {
    label: "Hero poster",
    path: resolve(projectRoot, "public/media/hero/wildan-hero-poster.jpg"),
    maxBytes: 200 * 1024,
  },
  {
    label: "Hero mobile poster",
    path: resolve(projectRoot, "public/media/hero/wildan-hero-poster-mobile.jpg"),
    maxBytes: 150 * 1024,
  },
  {
    label: "Hero WebM",
    path: resolve(projectRoot, "public/media/hero/wildan-hero-video.webm"),
    maxBytes: 2 * 1024 * 1024,
  },
  {
    label: "Hero MP4",
    path: resolve(projectRoot, "public/media/hero/wildan-hero-video.mp4"),
    maxBytes: 3 * 1024 * 1024,
  },
] as const;

// These talking-video derivatives were probed with ffprobe: 1280x720, 24 fps,
// about 7.54 seconds, with one intentionally retained audio stream (AAC in MP4,
// Opus in WebM). A replacement must be re-audited for those properties and for
// visible provenance before its new hash is accepted here.
const approvedTalkingVideoHashes = new Map([
  [
    resolve(projectRoot, "public/media/hero/wildan-hero-video.webm"),
    "1e16d9ee270a20310f720f078b79cd58a69159a6203f4c130dab5124ee9dc3aa",
  ],
  [
    resolve(projectRoot, "public/media/hero/wildan-hero-video.mp4"),
    "c84db40735aab962e9c9d4cf1969108f663057c62d5b4102c0e9ec5ea43e220d",
  ],
]);

if (!existsSync(heroSource)) {
  errors.push("The approved hero source video is missing from the repository root.");
} else {
  const size = statSync(heroSource).size;
  if (size === 0 || size > 10 * 1024 * 1024) {
    errors.push(`Hero source size is outside the source-asset budget: ${size} bytes.`);
  }
}

if (!existsSync(credentialPortrait)) {
  errors.push("The approved credential portrait crop is missing.");
} else {
  const size = statSync(credentialPortrait).size;
  if (size === 0 || size > 500 * 1024) {
    errors.push(`Credential portrait size is outside the 500 KB budget: ${size} bytes.`);
  }
}

for (const mediaBudget of publicMediaBudgets) {
  if (!existsSync(mediaBudget.path)) {
    errors.push(`${mediaBudget.label} is missing.`);
    continue;
  }

  const size = statSync(mediaBudget.path).size;
  if (size === 0 || size > mediaBudget.maxBytes) {
    errors.push(
      `${mediaBudget.label} size is outside its ${mediaBudget.maxBytes}-byte budget: ${size} bytes.`,
    );
  }

  const approvedHash = approvedTalkingVideoHashes.get(mediaBudget.path);
  if (approvedHash) {
    const actualHash = createHash("sha256").update(readFileSync(mediaBudget.path)).digest("hex");
    if (actualHash !== approvedHash) {
      errors.push(
        `${mediaBudget.label} changed and must be re-audited for duration, dimensions, frame rate, its intentional audio stream, and visible provenance.`,
      );
    }
  }
}

for (const project of projects) {
  for (const media of project.media as readonly MediaSlot[]) {
    if (media.state === "placeholder") {
      if (!media.label.trim()) {
        errors.push(`${project.title}: placeholder media requires an honest label.`);
      }
      continue;
    }

    managedMediaCount += 1;
    const filePath = resolve(projectRoot, "public", media.src.slice(1));

    if (!existsSync(filePath)) {
      errors.push(`${project.title}: ${media.state} media does not exist at ${media.src}.`);
      continue;
    }

    if (!media.alt.trim()) {
      errors.push(`${project.title}: ${media.state} media requires alt text.`);
    }

    const size = statSync(filePath).size;
    if (size === 0 || size > projectMediaMaxBytes) {
      errors.push(
        `${project.title}: ${media.state} media exceeds the ${projectMediaMaxBytes}-byte project-cover budget: ${size} bytes.`,
      );
    }

    if (media.state === "published" && (media.width <= 0 || media.height <= 0)) {
      errors.push(`${project.title}: published media requires positive dimensions.`);
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`error: ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Media validation passed. Talking hero source, public derivatives, and credential portrait are within budget; ${managedMediaCount} candidate/published project asset(s) checked.`,
  );
}
