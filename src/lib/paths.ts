/**
 * Prefix an internal path with the configured base (see ONCONOSE_BASE in astro.config.mjs).
 * Always use this for internal links and files in /public so the site works under
 * https://2026.igem.wiki/<team-slug>/ as well as at the root during development.
 */
const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export function href(path = ''): string {
  const [pathname, hash] = path.split('#');
  const clean = pathname.replace(/^\/+/, '');
  const withSlash = clean === '' || clean.endsWith('/') || clean.includes('.') ? clean : `${clean}/`;
  return `${BASE}${withSlash}${hash ? `#${hash}` : ''}`;
}

/** Normalise the current pathname (minus base) to a bare slug such as "problem" or "". */
export function slugFromPath(pathname: string): string {
  const withoutBase = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname.replace(/^\//, '');
  return withoutBase.replace(/\/+$/, '').replace(/index\.html$/, '');
}
