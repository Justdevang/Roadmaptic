/**
 * Post-build prerender script.
 * Runs `vite preview`, visits each route with Puppeteer,
 * and writes the fully-rendered HTML to dist/ so that search-engine
 * crawlers see real content without executing JavaScript.
 *
 * Usage:  node prerender.mjs
 * (Runs automatically via `npm run build` → `npm run postbuild`)
 */

import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');
const BASE_URL = 'http://localhost:4174';

// All routes to prerender
const ROUTES = [
  '/',
  '/about',
  '/blog',
  '/contact',
  '/privacy-policy',
  '/glossary',
  // Blog articles
  '/blog/ai-agents',
  '/blog/quantum-safe',
  '/blog/rust-edge',
  '/blog/ai-ethics',
  '/blog/esg-sustainability',
  '/blog/bci-ux',
  '/blog/climate-resilience',
  '/blog/did-web5',
  '/blog/neuro-symbolic',
  '/blog/bio-informatics',
  // Glossary term pages
  '/glossary/microservices',
  '/glossary/docker',
  '/glossary/kubernetes',
  '/glossary/api-gateway',
  '/glossary/database-sharding',
  '/glossary/eventual-consistency',
  '/glossary/circuit-breaker-pattern',
  '/glossary/load-balancer',
  '/glossary/rate-limiting',
];

async function prerender() {
  console.log('🚀 Starting prerender...\n');

  // Start Vite preview server
  const server = await createServer({
    root: __dirname,
    preview: { port: 4174, strictPort: true },
    build: { outDir: 'dist' },
  });

  // Use preview mode — createServer doesn't do preview, use child_process
  const { spawn } = await import('child_process');
  const preview = spawn('npx', ['vite', 'preview', '--port', '4174', '--strictPort'], {
    cwd: __dirname,
    stdio: 'pipe',
  });

  // Wait for server to be ready
  await new Promise((resolve) => {
    preview.stdout.on('data', (data) => {
      if (data.toString().includes('4174')) resolve();
    });
    preview.stderr.on('data', (data) => {
      if (data.toString().includes('4174')) resolve();
    });
    setTimeout(resolve, 3000); // fallback
  });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let success = 0;
  let failed = 0;

  for (const route of ROUTES) {
    try {
      const page = await browser.newPage();

      // Block images/fonts/css to speed things up — we only need the HTML
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const type = req.resourceType();
        if (['image', 'font', 'media'].includes(type)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      // Wait for React to finish rendering
      await new Promise((r) => setTimeout(r, 2500));

      const html = await page.content();
      await page.close();

      // Determine output path
      const routePath = route === '/' ? '/index' : route;
      const outputDir = join(DIST, routePath.split('/').slice(0, -1).join('/'));
      const fileName = routePath.split('/').pop() || 'index';
      const outputPath = join(DIST, routePath === '/index' ? 'index.html' : `${route}/index.html`);

      // Create directory if needed
      const dir = dirname(outputPath);
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

      writeFileSync(outputPath, html, 'utf-8');
      console.log(`  ✅  ${route}`);
      success++;
    } catch (err) {
      console.error(`  ❌  ${route} — ${err.message}`);
      failed++;
    }
  }

  await browser.close();
  preview.kill();

  console.log(`\n✨ Prerender complete: ${success} succeeded, ${failed} failed.`);
  process.exit(failed > 0 ? 1 : 0);
}

prerender().catch((err) => {
  console.error('Fatal prerender error:', err);
  process.exit(1);
});
