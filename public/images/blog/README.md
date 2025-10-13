# Blog Images

This directory contains images used in blog posts.

## Image Guidelines

### File Naming
- Use descriptive names with kebab-case
- Include relevant keywords for SEO
- Example: `rc-maintenance-guide-cover.webp`

### Image Specifications
- **Format**: WebP (preferred), JPEG (fallback)
- **Dimensions**: 
  - Hero images: 1200x600px (16:9 ratio)
  - Inline images: 800x600px (4:3 ratio)
  - Thumbnails: 400x300px (4:3 ratio)
- **File Size**: Keep under 300KB for optimal loading
- **Quality**: 80-85% for WebP format

### Organization
```
public/images/blog/
├── hero/           # Hero/header images
├── inline/         # Inline content images
├── thumbnails/     # Thumbnail images
└── assets/         # General blog assets
```

## Usage in Markdown

Reference images in blog posts using relative paths:

```markdown
![Image Description](/images/blog/filename.webp)
```

### Alt Text
Always provide descriptive alt text for accessibility:
- Good: `SMT production line with automated optical inspection`
- Bad: `image`, `pic`, `photo`

## Current Images

### Factory Related
- `production-line-main.webp` - Main production line hero image
- `smt-production-line.webp` - SMT equipment in operation
- `quality-control.webp` - Quality control station
- `rf-testing-lab.webp` - RF testing laboratory
- `assembly-line.webp` - Assembly line workers
- `environmental-testing.webp` - Environmental testing chamber
- `packaging-logistics.webp` - Packaging and shipping area

### Technology & Innovation
- `rc-technology-future.webp` - Future RC technology concept
- `ai-control-system.webp` - AI control interface
- `battery-technology.webp` - Advanced battery systems
- `5g-connectivity.webp` - 5G connectivity demonstration
- `advanced-materials.webp` - Advanced composite materials
- `green-technology.webp` - Sustainable technology
- `future-technology.webp` - Future technology concepts

### Maintenance & Care
- `rc-maintenance.webp` - General maintenance overview
- `pre-use-inspection.webp` - Pre-use inspection checklist
- `battery-maintenance.webp` - Battery care procedures
- `motor-maintenance.webp` - Motor maintenance
- `electronics-care.webp` - Electronics care and protection

## Image Optimization

### Before Adding Images
1. **Resize** to appropriate dimensions
2. **Compress** using tools like Squoosh, TinyPNG, or ImageOptim
3. **Convert** to WebP format for better compression
4. **Test** loading performance

### Tools for Optimization
- **Squoosh.app** - Online image compression
- **ImageOptim** - Mac image optimizer
- **FileOptimizer** - Windows image optimizer
- **Sharp** - Node.js image processing library

## Accessibility Guidelines

1. **Alt Text**: Always provide descriptive alt text
2. **Contrast**: Ensure sufficient color contrast
3. **Text Overlays**: Avoid placing text over complex backgrounds
4. **Image Maps**: Provide text alternatives for image maps

## Performance Considerations

1. **Lazy Loading**: Images are automatically lazy-loaded by Next.js
2. **Responsive Images**: Use appropriate sizes for different devices
3. **CDN**: Consider using a CDN for production
4. **Caching**: Implement proper caching headers

## Updating Images

When updating images:
1. Keep the same filename if replacing
2. Update alt text if content changes
3. Test on different screen sizes
4. Check page load performance

## Deleting Images

Before deleting images:
1. Check all blog posts that reference the image
2. Update or remove references
3. Test blog pages to ensure no broken images
4. Consider redirecting if the image was externally linked