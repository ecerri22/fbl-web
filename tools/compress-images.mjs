import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = "public/images";

const exts = /\.(jpe?g|png)$/i;

async function walk(dir) {
  for (const name of await fs.readdir(dir)) {
    const p = path.join(dir, name);
    const s = await fs.stat(p);
    if (s.isDirectory()) { await walk(p); continue; }
    if (!exts.test(name)) continue;

    const base = p.replace(exts, "");
    try { await fs.access(base + ".webp"); await fs.access(base + ".avif"); continue; } catch {}

    await sharp(p).toFormat("webp", { quality: 75 }).toFile(base + ".webp");
    await sharp(p).toFormat("avif", { quality: 50 }).toFile(base + ".avif");
    console.log("Compressed:", p);
  }
}

await walk(ROOT);
console.log("Done.");
