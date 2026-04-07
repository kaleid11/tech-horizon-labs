import { build as esbuild } from "esbuild";
import { rm, readFile, cp } from "fs/promises";

// Server deps to bundle (reduces cold start openat syscalls)
const allowlist = [
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "helmet",
  "compression",
  "nanoid",
  "pg",
  "resend",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("copying static site...");
  await cp("client/static", "dist/static", { recursive: true });

  console.log("minifying client JS...");
  await esbuild({
    entryPoints: ["client/static/main.js"],
    minify: true,
    outfile: "dist/static/main.min.js",
    logLevel: "info",
  });

  console.log("minifying client CSS...");
  await esbuild({
    entryPoints: ["client/static/styles.css"],
    minify: true,
    loader: { ".css": "css" },
    outfile: "dist/static/styles.css",
    allowOverwrite: true,
    logLevel: "info",
  });

  console.log("minifying critical CSS...");
  await esbuild({
    entryPoints: ["client/static/critical.css"],
    minify: true,
    loader: { ".css": "css" },
    outfile: "dist/static/critical.css",
    allowOverwrite: true,
    logLevel: "info",
  });

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
