import { defineConfig } from 'vite';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

import { articles, projects } from './src/content.js';

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function getSiteUrl(env) {
  const configuredUrl = env.VITE_SITE_URL
    || env.VERCEL_PROJECT_PRODUCTION_URL
    || (env.VERCEL_ENV === 'production' ? env.VERCEL_URL : '');
  if (!configuredUrl) return '';

  const candidate = configuredUrl.includes('://') ? configuredUrl : `https://${configuredUrl}`;
  const parsedUrl = new URL(candidate);
  if (parsedUrl.protocol !== 'https:' || parsedUrl.pathname !== '/' || parsedUrl.search || parsedUrl.hash) {
    throw new Error('VITE_SITE_URL must be an HTTPS origin without a path, query, or fragment.');
  }
  return parsedUrl.origin;
}

function portfolioSeoFiles(siteUrl) {
  return {
    name: 'portfolio-seo-files',
    apply: 'build',
    transformIndexHtml(html) {
      if (!siteUrl) return html;
      const metadata = [
        `<link rel="canonical" href="${siteUrl}/" />`,
        `<meta property="og:url" content="${siteUrl}/" />`,
      ].join('\n    ');
      return html.replace('</head>', `    ${metadata}\n  </head>`);
    },
    generateBundle() {
      const robotsLines = ['User-agent: *', 'Allow: /'];
      if (siteUrl) robotsLines.push(`Sitemap: ${siteUrl}/sitemap.xml`);
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `${robotsLines.join('\n')}\n`,
      });

      if (!siteUrl) {
        this.warn('No production site URL is configured; sitemap.xml and canonical metadata were not generated. Set VITE_SITE_URL before deployment.');
        return;
      }

      const locations = [
        `${siteUrl}/`,
        ...projects.map(({ id }) => `${siteUrl}/?project=${encodeURIComponent(id)}`),
        ...articles.map(({ id }) => `${siteUrl}/?article=${encodeURIComponent(id)}`),
      ];
      const entries = locations
        .map((location) => `  <url><loc>${escapeXml(location)}</loc></url>`)
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = getSiteUrl(env);
  return {
    plugins: [react(), portfolioSeoFiles(siteUrl)],
  };
});
