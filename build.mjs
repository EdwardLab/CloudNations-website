import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/content.mjs';
import { home, about, support, legal, notFound, layout } from './src/templates.mjs';
export const root = dirname(fileURLToPath(import.meta.url));
export const routes = [
  { path: '/', title: 'Cloud Nations | Identity Beyond Borders', description: 'Cloud Residency: a private digital identity and community membership. $19.99 for five years, with identity verification included.', render: home },
  { path: '/about/', title: 'About | Cloud Nations', description: 'A private digital identity and community network operated by EdgeAlphix LLC. One identity. Anywhere online.', render: about },
  { path: '/support/', title: 'Support | Cloud Nations', description: 'Get help with Cloud Nations applications, verification, accounts, billing, credentials and Wallet.', render: support },
  { path: '/privacy/', title: 'Privacy | Cloud Nations', description: 'How Cloud Nations handles website, account, verification and public profile information.', render: () => legal('privacy') },
  { path: '/terms/', title: 'Membership Terms | Cloud Nations', description: 'Cloud Nations membership eligibility, application fees, verification, permanent identifiers and renewal rules.', render: () => legal('terms') },
  { path: '/404.html', title: 'Page not found | Cloud Nations', description: 'Return to Cloud Nations or find help with your account.', render: notFound },
];
export async function build({ production = false, legalApproved = false, output = resolve(root, 'dist') } = {}) {
  if (production && !legalApproved) throw new Error('Publication requires reviewed legal pages. Pass --legal-approved only after operator approval.');
  if (output === root || !output.startsWith(root + '/')) throw new Error('Build output must be a child directory of this repository.');
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  for (const route of routes) {
    const file = route.path.endsWith('.html') ? route.path.slice(1) : route.path === '/' ? 'index.html' : route.path.slice(1) + 'index.html';
    await mkdir(dirname(resolve(output, file)), { recursive: true });
    await writeFile(resolve(output, file), layout({ ...route, body: route.render(), production, legalApproved }));
  }
  for (const file of ['styles.css', 'script.js', 'theme.js', 'favicon.svg']) await cp(resolve(root, file), resolve(output, file));
  await cp(resolve(root, 'assets'), resolve(output, 'assets'), { recursive: true });
  await writeFile(resolve(output, '.nojekyll'), '');
  await writeFile(resolve(output, 'robots.txt'), production ? `User-agent: *\nAllow: /\nSitemap: ${site.origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
  await writeFile(resolve(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.filter(r => r.path !== '/404.html').map(r => `<url><loc>${site.origin}${r.path}</loc></url>`).join('')}</urlset>`);
  if (production) await writeFile(resolve(output, 'CNAME'), new URL(site.origin).hostname + '\n');
  return output;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await build({ production: process.argv.includes('--production'), legalApproved: process.argv.includes('--legal-approved') });
  console.log('Built Cloud Nations website.');
}
