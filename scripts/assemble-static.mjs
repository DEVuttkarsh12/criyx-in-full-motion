// Assembles a fully static folder Vercel can serve:
//   dist/client            -> dist/static   (assets, chunks, fonts, images)
//   dist/server/prerendered-routes/*.html -> dist/static   (index.html, products/*.html, 404.html)
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const clientDir = join(root, 'dist', 'client');
const routesDir = join(root, 'dist', 'server', 'prerendered-routes');
const outDir = join(root, 'dist', 'static');

if (!existsSync(clientDir)) {
  throw new Error(`Missing ${clientDir}. Run 'vinext build --prerender-all' first.`);
}
if (!existsSync(join(routesDir, 'index.html'))) {
  throw new Error(`Missing prerendered routes in ${routesDir}. Build with '--prerender-all'.`);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
cpSync(clientDir, outDir, { recursive: true });
cpSync(routesDir, outDir, { recursive: true });

console.log(`Static site assembled in ${outDir}`);
