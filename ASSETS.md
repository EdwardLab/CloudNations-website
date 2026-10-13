# Asset sources

All published images and fonts are served from this repository. The website makes no requests to image CDNs, font CDNs or analytics services.

## Font

`assets/dm-sans-latin.woff2` is DM Sans, sourced from the existing locally checked-out DigitalPlat website asset. DM Sans is licensed under the SIL Open Font License 1.1; the accompanying `assets/DM-Sans-OFL.txt` is included. The typeface is available through the official Google Fonts DM Sans project: https://github.com/google/fonts/tree/main/ofl/dmsans.

Numbers and developer examples use the visitor's system monospace font.

## Illustrative photographs

The hero and collaboration photographs were generated specifically for Cloud Nations on October 13, 2026 using OpenAI Image Gen. They depict fictional people, not customers or resident testimonials. No stock-photo or third-party brand assets were copied from the reference site.

- `hero-800.webp`, `hero-1200.webp`: a fictional adult working on a laptop beside a window overlooking a coastal city, cobalt overshirt, neutral architecture and natural daylight. Landscape 3:2 source.
- `community-1200.webp`: three fictional adults discussing a project at a studio table, soft daylight, neutral palette and a small cobalt accent. Landscape 3:2 source.

Generation instructions excluded logos, readable screen content, flags, badges and watermarks. Sharp was used for resizing and WebP encoding. Original generated PNG files remain outside the repository in the local generated-image directory. Generated output has no third-party stock license; its use remains subject to the applicable OpenAI service terms.

## Credential examples

`id-front.webp`, `id-back.webp` and `certificate.webp` were exported with the existing Cloud Nations identity image and PDF certificate renderers at dashboard release `b23f741`. A standalone fixture replaced database, identity decoding, signing and notification dependencies; it did not connect to a database, issue a real number, use a signing key or change production.

Example details are fictional: Maya Ellis, birth date April 18, 1997, USA, number `5839 1742 6064`, issue October 13, 2026 and expiry October 13, 2031. The portrait was generated for this fictional example. Test flags keep SAMPLE labels in the ID and certificate. The website adds an Example caption and descriptive alternative text. QR links point to a nonexistent example credential, never a real resident record.

The certificate image is a raster export, not a valid signed PDF. The fixture's placeholder proof is not published. Poppler rendered the PDF to PNG; Sharp encoded the final WebP.

## Brand assets

`favicon.svg` and `share.png` are original Cloud Nations assets created for this site. The sharing image uses outlined lettering from the existing SIL-OFL Geist font; it does not distribute the font file. No real identity data appears in these assets.

## Visual reference

https://digitalplat.one/ informed the split photographic hero, whitespace and section rhythm. Its source, logo, photography and copy are not distributed by this site.
