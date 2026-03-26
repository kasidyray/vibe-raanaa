/**
 * Build shadcn custom registry
 *
 * Reads every component in components/ui/ and lib/utils.ts, embeds the source
 * into individual JSON files at public/r/{name}.json, and writes a root
 * registry.json index.
 *
 * Run:  node scripts/build-registry.mjs
 * Or:   npm run build:registry
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "fs";
import { join, basename, extname } from "path";

const ROOT = process.cwd();
const OUTPUT_DIR = join(ROOT, "public/r");

// ── npm packages available in this project ────────────────────────────────────
const NPM_PACKAGES = [
  "@base-ui/react",
  "@dnd-kit/core",
  "@dnd-kit/modifiers",
  "@dnd-kit/sortable",
  "@dnd-kit/utilities",
  "@remixicon/react",
  "@tanstack/react-table",
  "class-variance-authority",
  "clsx",
  "cmdk",
  "date-fns",
  "input-otp",
  "lucide-react",
  "next-themes",
  "react-day-picker",
  "recharts",
  "sonner",
  "tailwind-merge",
  "vaul",
  "zod",
];

// ── helpers ───────────────────────────────────────────────────────────────────

function extractNpmDeps(content) {
  const deps = new Set();
  const re = /from ['"]([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const pkg = m[1];
    if (pkg.startsWith(".") || pkg.startsWith("@/")) continue;
    for (const npmPkg of NPM_PACKAGES) {
      if (pkg === npmPkg || pkg.startsWith(npmPkg + "/")) {
        deps.add(npmPkg);
        break;
      }
    }
  }
  return [...deps];
}

function buildItem(name, files, type = "registry:ui") {
  const allDeps = new Set();
  files.forEach((f) => extractNpmDeps(f.content).forEach((d) => allDeps.add(d)));

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type,
    dependencies: [...allDeps],
    registryDependencies: ["utils"],
    files: files.map((f) => ({
      path: f.path,
      content: f.content,
      type: f.type ?? type,
      target: "",
    })),
  };
}

function write(name, item) {
  writeFileSync(join(OUTPUT_DIR, `${name}.json`), JSON.stringify(item, null, 2));
  console.log(`  ✓ ${name}`);
}

// ── setup ─────────────────────────────────────────────────────────────────────

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const registryItems = [];

// ── lib/utils ─────────────────────────────────────────────────────────────────

const utilsContent = readFileSync(join(ROOT, "lib/utils.ts"), "utf-8");
const utilsItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "utils",
  type: "registry:lib",
  dependencies: ["clsx", "tailwind-merge"],
  registryDependencies: [],
  files: [
    {
      path: "lib/utils.ts",
      content: utilsContent,
      type: "registry:lib",
      target: "",
    },
  ],
};
write("utils", utilsItem);
registryItems.push({ name: "utils", type: "registry:lib" });

// ── MTN design tokens (globals.css) ───────────────────────────────────────────
// Extracts just the :root and .dark token blocks — the parts the colleague
// needs to paste into their own globals.css (or import as a separate file).

const globalsContent = readFileSync(join(ROOT, "app/globals.css"), "utf-8");

const tokensItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "mtn-tokens",
  type: "registry:file",
  dependencies: [],
  registryDependencies: [],
  files: [
    {
      path: "app/mtn-tokens.css",
      content: globalsContent,
      type: "registry:file",
      target: "app/mtn-tokens.css",
    },
  ],
};
write("mtn-tokens", tokensItem);
registryItems.push({ name: "mtn-tokens", type: "registry:file" });

// ── individual ui components ──────────────────────────────────────────────────

const UI_DIR = join(ROOT, "components/ui");
const uiFiles = readdirSync(UI_DIR).filter(
  (f) => extname(f) === ".tsx" && f !== "data-table"
);

console.log("\nBuilding ui components…");
for (const file of uiFiles.sort()) {
  const name = basename(file, ".tsx");
  const content = readFileSync(join(UI_DIR, file), "utf-8");
  const item = buildItem(name, [{ path: `components/ui/${file}`, content }]);
  write(name, item);
  registryItems.push({ name, type: "registry:ui" });
}

// ── data-table (composite — all sub-files in one item) ────────────────────────

console.log("\nBuilding data-table…");
const DT_DIR = join(UI_DIR, "data-table");
const dtFiles = readdirSync(DT_DIR)
  .filter((f) => extname(f) === ".tsx" || extname(f) === ".ts")
  .sort();

const dtItem = buildItem(
  "data-table",
  dtFiles.map((f) => ({
    path: `components/ui/data-table/${f}`,
    content: readFileSync(join(DT_DIR, f), "utf-8"),
  }))
);
write("data-table", dtItem);
registryItems.push({ name: "data-table", type: "registry:ui" });

// ── root registry.json index ──────────────────────────────────────────────────

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "raana-ui",
  homepage: "https://github.com/kasidyray/vibe-raanaa",
  items: registryItems,
};
writeFileSync(join(ROOT, "registry.json"), JSON.stringify(registry, null, 2));
console.log("\n  ✓ registry.json (root index)");

console.log(`\nDone — ${registryItems.length} items written to public/r/`);
console.log(
  "Tip: commit public/r/ and registry.json so the registry is served from your deployed app."
);
