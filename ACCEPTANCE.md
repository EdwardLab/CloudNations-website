# Local acceptance

Date: October 13, 2026. Preview: http://127.0.0.1:3210/. This is the local website delivery; no remote repository, Pages deployment or DNS change has been made.

## Verified

- Six Node test cases passed: metadata and preview indexing, internal links and fragments, content rules, static HTTP behavior, production-build approval gate and asset budgets.
- Five complete pages, custom 404, local font and images, favicon, sharing image, canonical URLs, sitemap and robots output.
- Application, login, dashboard, identity, profile, organizations, developer and settings links point to existing identity-platform routes. Anonymous requests returned their expected login redirects; public login and OIDC Discovery returned 200.
- Desktop 1440px, tablet 768px and phone 390px browser layouts. No horizontal overflow was found on any of the five pages at the phone width.
- Light/dark toggle and saved theme across navigation. Reduced-motion emulation disabled smooth scrolling and transitions, then was reset.
- Mobile menu opens and closes; Tab reaches navigation, Escape closes the menu and returns focus. Native FAQ details open. ID front/back controls update the displayed image and pressed state.
- Support text search, topic filter, empty results, filter reset, result count and clipboard feedback. Mail links and instructions are present; no message was sent.
- Generated credentials and photographs contain fictional details. Both ID sides and the certificate are rendered product examples, with SAMPLE and Example labeling.
- All homepage images loaded during browser acceptance. No website JavaScript errors were observed. Warnings from installed Chrome extensions were identified separately.
- Unslop phrase, structure, silhouette and readability scans were run on all five pages. Contextual edits and protected soft findings are documented in COPY-REVIEW.md.

## Performance

Lighthouse 13.4.1 ran through Chrome DevTools in an incognito window, with emulated Moto G Power and slow 4G. Final local homepage results:

| Category / metric | Result |
| --- | ---: |
| Performance | 91 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 69 |
| First Contentful Paint | 2.0 seconds |
| Largest Contentful Paint | 3.0 seconds |
| Total Blocking Time | 0 milliseconds |
| Cumulative Layout Shift | 0 |

SEO is reduced by the intentional local noindex restriction. The regular Chrome profile produced extension-contaminated results; it was not used for the final performance score. An initial contrast failure in the developer example caption was traced to CSS specificity, repaired, and passed the clean rerun. These are local lab measurements, not a claim about production performance or every user's device.

The homepage's image and font payload totals approximately 438 KB before server compression. Runtime JavaScript is below 8 KB. GitHub Pages compression, caching and HTTPS must be checked on the actual public host after approval.

## Evidence

Screenshots and raw audit evidence are in the ignored `.local/acceptance/` directory:

- `home-desktop.png`, `home-desktop-full.png`
- `support-desktop.png`, `support-desktop-full.png`
- `home-mobile.png`, `support-mobile.png`
- `lighthouse-mobile.png`, `lighthouse-mobile-ax.txt`
- `*-copy-audit.json`

Browser viewport and motion overrides were reset. The ordinary preview tab is retained for review. The temporary incognito audit window was closed.

## Publication requirements still pending

- User approval of this local design and content.
- Operator review of Privacy and Terms, including a retention schedule and removal of draft wording.
- Confirmation that contact@edgealphix.com receives customer-support mail. Mail delivery was not exercised in this website task.
- Creation of the approved separate GitHub repository, manual Pages publishing, domain configuration and public HTTPS/path/resource checks.
- Google Wallet support URL update after the support page is public. No Wallet issuer settings were changed in this task.

The existing identity dashboard remains unchanged. Google Wallet publishing approval and Apple Wallet availability are described as their current testing and coming-soon states.


## Publication follow-up — October 13, 2026

The user approved publication. The independent website is live at https://cloudnations.org, with Cloudflare HTTPS proxy and a website-only HTTP upgrade. Five pages, twelve asset hashes, canonical redirects and the custom 404 passed public checks. Desktop ID switching and FAQ, plus 390 px navigation, help search, theme and support email copying, passed browser checks. Homepage and support use KYC; provider names remain in Privacy disclosures. See PUBLICATION.md for deployment and external-console status.
