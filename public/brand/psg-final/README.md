# PSG — Final diagonal DNA logo

Approved design: `exec-5f887f11-5228-470d-8ecb-47d8205dc03b.png`.
Black silhouette traced into cubic Bezier paths; baked checkerboard removed. This is a vector reconstruction of the selected image, not the later horizontal-DNA concept. Source hash and tracing method are recorded in `manifest.json`.

All logo SVGs contain actual paths, not embedded PNGs, fonts or external assets. Backgrounds and counters are transparent. Every SVG scales to arbitrary dimensions; size exports provide convenient intrinsic dimensions rather than separate detail levels. Preserve aspect ratio.

| Use | Files | Sizes |
| --- | --- | --- |
| Portfolio header, documents | `psg-black.svg`, `psg-white.svg` | Scalable; 1600 × 864 viewBox |
| Inline SVG using CSS color | `psg-currentcolor.svg` | Scalable; currentColor inherits only when embedded inline |
| LinkedIn/GitHub profile artwork | `profile/psg-profile-{black,white}.svg` and PNGs | 400, 800, 1024 square; circle-safe padding |
| Watermark | `watermark/psg-watermark-{black,white}.svg` | Scalable; set opacity around 15–35% in consuming app |
| Wide size exports | `svg-sizes/` and `png/` | Widths 128, 256, 512, 1024, 2048, 4096 |
| Browser favicon | `favicon/psg-favicon-adaptive.svg` | Black on light system theme, white on dark system theme |
| Static favicon | `favicon/psg-favicon-{black,white}.svg`, PNGs, ICOs | PNG: 16, 24, 32, 48, 64, 96, 128, 180, 192, 256, 512; ICO: 16/32/48 |
| Apple touch icon | `favicon/apple-touch-icon.png` | 180 square, white background |
| Maskable device icon | `favicon/maskable-{192,512}.png` | White background, extra safe-zone padding |

For LinkedIn/profile upload dialogs, use the 800px black PNG fallback when SVG is unavailable. White logos require a dark destination background; a platform may flatten uploaded transparency. Check the crop preview before saving. Profiles have not been uploaded or changed by this kit.

GitHub currently accepts PNG, JPG or GIF, below 1 MB and below 3000 × 3000: [GitHub profile reference](https://docs.github.com/en/account-and-profile/reference/profile-reference). Included profile PNGs meet those limits.

Full PSG geometry remains intact in favicon exports. Thin DNA rungs lose definition at 16–24px; the SVG cannot overcome a tiny physical display size. This kit does not silently substitute a new symbol.

All SVGs and ordinary PNGs are transparent. Only `preview.png`, Apple touch and maskable compatibility PNGs have presentation backgrounds. `index.html` is a local visual comparison with circle crop guides and actual-size icons.

The local portfolio uses the final header SVG, SVG/ICO favicon, touch icon and manifest icons. No account upload, commit or deployment was performed.

Browser integration follows [MDN link element guidance](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link) and [manifest icon guidance](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/icons).
