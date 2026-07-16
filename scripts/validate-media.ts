import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

import { projects } from "../src/content/projects";
import type { MediaSlot } from "../src/content/schema";

const projectRoot = process.cwd();
const errors: string[] = [];
let managedMediaCount = 0;

const heroSource = resolve(
  projectRoot,
  "source-assets/hero/the-verifiable-machine-source.mp4",
);
const credentialPortrait = resolve(
  projectRoot,
  "public/media/profile/wildan-credential.jpg",
);

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
    `Media validation passed. Hero source and credential portrait are present; ${managedMediaCount} candidate/published project asset(s) checked.`,
  );
}
