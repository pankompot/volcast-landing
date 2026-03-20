import { defineMiddleware } from 'astro:middleware';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Serves static HTML files from public/ with directory index resolution.
 * Needed because Astro's dev server doesn't resolve /en/ → public/en/index.html.
 * In production on Vercel, static files are served before this middleware runs.
 */
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();

  if (response.status === 404) {
    const url = new URL(_context.request.url);
    const pathname = url.pathname;
    const publicDir = path.resolve(process.cwd(), 'public');

    const candidates = [
      path.join(publicDir, pathname, 'index.html'),
      path.join(publicDir, pathname + '.html'),
      path.join(publicDir, pathname),
    ];

    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        const content = fs.readFileSync(candidate, 'utf-8');
        return new Response(content, {
          headers: { 'Content-Type': 'text/html' },
        });
      }
    }
  }

  return response;
});
