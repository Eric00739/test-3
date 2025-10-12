# Image Guidelines

We keep hero, factory, and case-study photography in this folder to avoid external CDN dependencies and to guarantee consistent load performance across builds (including static export to GitHub Pages).

## Required Assets

| Filename                     | Purpose                | Suggested Dimensions | Notes                         |
|-----------------------------|------------------------|----------------------|-------------------------------|
| `factory-montage.webp`      | Hero montage background| 1600 × 900 px (16:9) | Prioritized load (`priority`) |
| `smt-production-line.webp`  | Factory gallery #1     | 1600 × 1000 px (16:10)| Shows SMT line / shop floor   |
| `rf-shielded-test-lab.webp` | Factory gallery #2     | 1600 × 1000 px (16:10)| Shielded room / RF testing    |

## Optimisation Requirements

- Format: **WebP**
- Quality: target 80–85 to balance crispness and file size (aim < 300 KB per image)
- Colour space: sRGB
- No alpha channel unless absolutely necessary (opaque backgrounds preferred)
- Cropping: maintain the recommended aspect ratios so the layout does not stretch the images.

## Usage

- Hero background is referenced in `src/components/home/HeroSection.tsx`.
- Factory gallery images are referenced in `src/app/page.tsx` within the `factoryGallery` array.
- Keep filenames stable; if you replace assets, maintain the same name (or update imports accordingly).

## Tips

- When exporting from design tools, use “export as WebP” with 85% quality.
- For photos shot in RAW/JPEG, process them via Squoosh/Imagemin/Sharp to generate the optimized WebP version.
- After adding or replacing images, run `npm run build` to ensure static export includes the new assets.
