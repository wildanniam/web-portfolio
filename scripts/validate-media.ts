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
  "source-assets/hero/wildan-human-checkpoint-source.mp4",
);
const credentialPortrait = resolve(
  projectRoot,
  "public/media/profile/wildan-credential.jpg",
);

const publicMediaBudgets = [
  {
    label: "Hero poster",
    path: resolve(projectRoot, "public/media/hero/wildan-human-checkpoint-poster.jpg"),
    maxBytes: 200 * 1024,
  },
  {
    label: "Hero WebM",
    path: resolve(projectRoot, "public/media/hero/wildan-human-checkpoint-loop.webm"),
    maxBytes: 2 * 1024 * 1024,
  },
  {
    label: "Hero MP4",
    path: resolve(projectRoot, "public/media/hero/wildan-human-checkpoint-loop.mp4"),
    maxBytes: 3 * 1024 * 1024,
  },
] as const;

// These exact derivatives were probed with ffprobe: 1280x720, 24 fps,
// 9.375 seconds, and zero audio streams. A replacement must be re-audited before
// its new hash is accepted here.
const approvedSilentVideoHashes = new Map([
  [
    resolve(projectRoot, "public/media/hero/wildan-human-checkpoint-loop.webm"),
    "3123913c6b2fbbad22fc93ee3f1028c19a6369e31e2b406afe808e76f31d3189",
  ],
  [
    resolve(projectRoot, "public/media/hero/wildan-human-checkpoint-loop.mp4"),
    "0e243a8225db7a131ffd7b179fe5a250d9b66d76ebf6fd7b16b32d814f8f8018",
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

  const approvedHash = approvedSilentVideoHashes.get(mediaBudget.path);
  if (approvedHash) {
    const actualHash = createHash("sha256").update(readFileSync(mediaBudget.path)).digest("hex");
    if (actualHash !== approvedHash) {
      errors.push(
        `${mediaBudget.label} changed and must be re-audited for duration, dimensions, frame rate, and zero audio streams.`,
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
    `Media validation passed. Hero source, public derivatives, and credential portrait are within budget; ${managedMediaCount} candidate/published project asset(s) checked.`,
  );
}
