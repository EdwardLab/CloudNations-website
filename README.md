# Cloud Nations website

An independent static website for `cloudnations.org`, operated by EdgeAlphix LLC. English content, self-hosted assets and no runtime dependencies. The identity platform remains at `id.cloudnations.org`.

## Local preview

Requires Node.js 22 or newer. No package installation is needed.

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:3210/. The preview binds only to loopback. If the port is occupied, use `PORT=3211 npm run preview`. Rebuild and reload after source edits. Stop the foreground preview with Ctrl+C.

```sh
npm test
```

The tests check all routes, internal links and fragments, asset existence, business rules, HTTP behavior, preview indexing restrictions, publication gates and asset budgets.

## Source

- `src/content.mjs`: prices, FAQ and support articles.
- `src/templates.mjs`: shared navigation, footer and five page templates.
- `styles.css`: responsive light/dark theme and reduced-motion behavior.
- `theme.js`: saved or system theme selection before first paint.
- `script.js`: menu, theme, example ID sides, help search and email copying.
- `build.mjs`: builds complete HTML and assets into `dist/`.
- `scripts/preview.mjs`: local static preview with custom 404 responses.
- `assets/`: generated illustrative photos, fictional example credentials and licensed font.

Pages: `/`, `/about/`, `/support/`, `/privacy/`, `/terms/`, `/404.html`.

Links to applications, accounts, organizations and developers open existing identity-platform routes. This site does not collect credentials, documents or card details. Help search stays in the browser. Support uses `contact@edgealphix.com` mail links; no email was sent as part of acceptance.

## Publication

The user approved publication on October 13, 2026. Source is in the separate public repository [EdwardLab/CloudNations-website](https://github.com/EdwardLab/CloudNations-website). The site uses GitHub Pages at [cloudnations.org](https://cloudnations.org/). See [PUBLICATION.md](PUBLICATION.md) for release evidence and current host checks.

For later releases:

1. Review source and the local preview.
2. Review any Privacy or Terms changes against actual platform behavior. Do not invent data retention periods.
3. Commit and push the reviewed source to the existing independent repository.
4. Run the GitHub Actions publishing workflow through **Run workflow**, with legal review approval explicitly selected. It does not run on every push.
5. Keep the custom domain and enforced HTTPS enabled. Preserve `id.cloudnations.org` and all mail records.
6. Verify all five paths, custom 404, asset loading, mobile behavior and HTTPS on the actual host.
7. Keep Google Wallet Customer support URL aligned with `https://cloudnations.org/support/`.

A local production build is available for reviewed source:

```sh
node build.mjs --production --legal-approved
```

This command generates indexable pages, `CNAME`, a sitemap and `.nojekyll`; it does not publish anything. Without `--legal-approved`, production builds fail. The regular build remains `noindex` and excludes `CNAME`.

The site uses root-relative paths for a custom domain. A GitHub repository subpath URL is not the intended production URL.

## Content and asset review

See [ASSETS.md](ASSETS.md) for sources, licenses and example provenance. See [ACCEPTANCE.md](ACCEPTANCE.md) for completed checks and outstanding publication requirements.

Membership prices and Founding Resident eligibility reflect the current identity-platform rules. Apple Wallet is coming soon.
