/**
 * Multi-tenant mapping: which domain shows which area.
 *
 * The SAME app serves every domain. When a visitor arrives on one of these
 * hostnames, the middleware shows that area's hub at "/". Add a new area site
 * by buying a domain and adding one line here — no new codebase.
 */
export const tenantDomains: Record<string, string> = {
  "laxminagardelhi.com": "laxmi-nagar",
  "www.laxminagardelhi.com": "laxmi-nagar",
  "modeltowndelhi.com": "model-town",
  "www.modeltowndelhi.com": "model-town",
};

/** Return the area slug for a hostname, or null for the default landing site. */
export function resolveTenant(host?: string | null): string | null {
  if (!host) return null;
  const clean = host.split(":")[0].toLowerCase();
  return tenantDomains[clean] ?? null;
}
