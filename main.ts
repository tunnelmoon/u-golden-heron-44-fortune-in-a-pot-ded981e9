import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "A sunny morning is coming: you will lean toward it, grow two new leaves, and be forgiven for the one you dropped.";

if (FORTUNE.length < 1 || FORTUNE.length > 120) {
  throw new Error(`fortune must be 1 to 120 characters, got ${FORTUNE.length}`);
}
if (FORTUNE.includes("\n") || FORTUNE.includes("\r")) {
  throw new Error("fortune must be a single line");
}
if (FORTUNE.trim().length === 0) {
  throw new Error("fortune must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = join(outDir, "entry.txt");
writeFileSync(dst, FORTUNE, "utf8");
// Self-check: what was written must read back exactly as the fortune.
if (readFileSync(dst, "utf8") !== FORTUNE) {
  throw new Error(`round-trip mismatch: ${dst} does not match the fortune`);
}
console.log(`wrote ${dst} (${FORTUNE.length} characters)`);
