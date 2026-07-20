import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";

const projectRoot = process.cwd();
const manifestPath = resolve(
  projectRoot,
  ".next/server/app/page_client-reference-manifest.js",
);
const homepageBudget = 180 * 1024;

if (!existsSync(manifestPath)) {
  console.error("error: Homepage client manifest is missing. Run `npm run build` first.");
  process.exit(1);
}

const manifest = readFileSync(manifestPath, "utf8");
const chunkMatches = manifest.matchAll(/(?:\/_next\/|\")(static\/chunks\/[^\"]+\.js)/g);
const chunkPaths = [...new Set([...chunkMatches].map((match) => match[1]))];

if (chunkPaths.length === 0) {
  console.error("error: No homepage JavaScript chunks were found in the client manifest.");
  process.exit(1);
}

const gzipBytes = chunkPaths.reduce((total, chunkPath) => {
  const source = readFileSync(resolve(projectRoot, ".next", chunkPath));
  return total + gzipSync(source).byteLength;
}, 0);

const formatKiB = (bytes: number) => `${(bytes / 1024).toFixed(1)} KiB`;

if (gzipBytes > homepageBudget) {
  console.error(
    `error: Initial homepage JavaScript is ${formatKiB(gzipBytes)} gzip; budget is ${formatKiB(homepageBudget)}.`,
  );
  process.exit(1);
}

console.log(
  `Bundle validation passed. Initial homepage JavaScript is ${formatKiB(gzipBytes)} gzip across ${chunkPaths.length} chunk(s); budget is ${formatKiB(homepageBudget)}.`,
);
