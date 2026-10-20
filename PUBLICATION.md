# Website publication

The user approved publication on October 13, 2026.

- Repository: https://github.com/EdwardLab/CloudNations-website
- Host: GitHub Pages, custom GitHub Actions workflow; manual dispatch only.
- Canonical origin: https://cloudnations.org
- Support: https://cloudnations.org/support/
- DNS: four GitHub Pages apex A records and www CNAME to edwardlab.github.io; Cloudflare-proxied with automatic TTL.
- Existing identity-platform record and all mail records are preserved.
- Contact mailbox: Cloudflare Email Routing shows contact@edgealphix.com Active. No test email was sent.
- GitHub Actions deployment passed. Cloudflare serves HTTPS while the GitHub origin certificate is pending. The existing Full encryption mode is unchanged. A website-only redirect upgrades HTTP to the canonical HTTPS origin and preserves paths and query strings. Public HTTPS, HTTP upgrades and www redirects are verified. All five pages, twelve assets and the custom 404 passed public acceptance. HTML matches the approved build after decoding Cloudflare’s email protection; asset hashes match exactly.

Visitor pages contain product information and support steps. Issuer configuration and release procedures are kept out of page copy. The Google Wallet business form has the website, support URL and support email prepared; its remaining required business category needs completion before saving.

## Source updates

```sh
npm test
node build.mjs --production --legal-approved
git push origin main
gh workflow run pages.yml -R EdwardLab/CloudNations-website -f legal_review_approved=true
```

Changes to Privacy and Terms must reflect actual operations. The source contains no credentials, customer records or private fixture output. Prior website history is backed up only in the ignored local directory before the user-requested history cleanup.


## Public acceptance

The deployed customer copy uses KYC on the homepage and in help articles. Browser checks passed for the ID front/back switch, Wallet FAQ, mobile menu, KYC help search, theme switching and support email copying. At 390 px the tested homepage and support flow have no horizontal overflow. The local preview remains available at http://127.0.0.1:3210. The identity service health endpoint still reports ok.

The GitHub origin certificate remains pending; the public HTTPS certificate is served by Cloudflare. Existing zone encryption settings were not changed. Website and support URLs are ready to use in the Google Wallet console. The console form remains unsaved pending its required business category; publishing approval was not submitted.


## Homepage official-site banner — 19 October 2026

Commit `348cb51`, published by successful manual Pages run `39146453487`, adds the identity platform’s official-site banner to the homepage. The approved domain and HTTPS guidance, cloud icon and native disclosure match the platform. Six static tests, production build, keyboard toggles, dark/light modes and320/390/768/1440px layouts pass locally. Public HTTPS content and CSS match; live desktop/mobile disclosure and screenshots pass. Identity-platform, DNS and mail settings were not changed.


## Returning-browser CSS repair — 19 October 2026

The first banner acceptance used a fresh browser and missed the four-hour cached legacy stylesheet. A returning-browser reproduction confirmed the banner HTML could load while `/styles.css` remained the pre-banner version. Commit `7f2a32a`, published by successful Pages run `39147690002`, gives every page a content-fingerprinted stylesheet filename. Seven tests pass. The same warm-cache browser loads the corrected style without clearing caches; ordinary Reload updates already-cached HTML. Public five-page asset checks and live desktop/mobile disclosure checks pass.

## Support contact update — October 21, 2026

Release2a9a75a replaces the customer-support mailbox with contact@cloudnations.org across the shared footer, support page, privacy notice and terms. All seven checks passed in publication run39459165111. Browser read-back verified the new address on all five pages and no old contact address in their HTML. Cloudflare Email Routing shows contact@cloudnations.org Active to the existing Mailflare worker. No routing changes or test email were made.
