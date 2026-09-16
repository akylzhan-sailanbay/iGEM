// @ts-check
import { defineConfig } from 'astro/config';

/**
 * iGEM wikis are served from a sub-path, e.g. https://2026.igem.wiki/<team-slug>/
 * Set ONCONOSE_BASE at build time so every link and asset URL is prefixed correctly:
 *   ONCONOSE_BASE=/team-slug/ npm run build
 */
const base = process.env.ONCONOSE_BASE ?? '/';
const site = process.env.BIONOSE_SITE ?? 'https://2026.igem.wiki';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Keep common iGEM URLs pointing at the pages that hold that evidence.
  redirects: {
    '/description': '/solution',
    '/engineering': '/experiments',
    '/human_practices': '/human-practices',
    '/safety': '/safety-and-security',
    '/safety_and_security': '/safety-and-security',
    '/contribution': '/judging',
    '/modeling': '/model',
    '/bibliography': '/references',
  },
  devToolbar: { enabled: false },
});
