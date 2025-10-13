const fs = require('fs')
const path = require('path')

// 创建一个简单的SVG占位图片
function createPlaceholderSVG(width, height, text, color = '#f97316') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" dy=".3em">${text}</text>
  </svg>`
}

// 创建博客图片目录
const blogImagesDir = path.join(__dirname, '../public/images/blog')
const factoryImagesDir = path.join(__dirname, '../public/images/factory')

// 确保目录存在
if (!fs.existsSync(blogImagesDir)) {
  fs.mkdirSync(blogImagesDir, { recursive: true })
}

if (!fs.existsSync(factoryImagesDir)) {
  fs.mkdirSync(factoryImagesDir, { recursive: true })
}

// 博客图片占位符
const blogImages = [
  { name: 'rc-maintenance.webp', text: 'RC Maintenance', width: 800, height: 400 },
  { name: 'rc-technology-future.webp', text: 'RC Technology Future', width: 800, height: 400 },
  { name: 'ai-control-system.webp', text: 'AI Control System', width: 600, height: 400 },
  { name: 'battery-technology.webp', text: 'Battery Technology', width: 600, height: 400 },
  { name: '5g-connectivity.webp', text: '5G Connectivity', width: 600, height: 400 },
  { name: 'advanced-materials.webp', text: 'Advanced Materials', width: 600, height: 400 },
  { name: 'green-technology.webp', text: 'Green Technology', width: 600, height: 400 },
  { name: 'future-technology.webp', text: 'Future Technology', width: 600, height: 400 },
  { name: 'pre-use-inspection.webp', text: 'Pre-Use Inspection', width: 600, height: 400 },
  { name: 'battery-maintenance.webp', text: 'Battery Maintenance', width: 600, height: 400 },
  { name: 'motor-maintenance.webp', text: 'Motor Maintenance', width: 600, height: 400 },
  { name: 'electronics-care.webp', text: 'Electronics Care', width: 600, height: 400 }
]

// 工厂图片占位符
const factoryImages = [
  { name: 'production-line-main.webp', text: 'Production Line', width: 1200, height: 600 },
  { name: 'smt-production-line.webp', text: 'SMT Production Line', width: 800, height: 600 },
  { name: 'quality-control.webp', text: 'Quality Control', width: 800, height: 600 },
  { name: 'rf-testing-lab.webp', text: 'RF Testing Lab', width: 800, height: 600 },
  { name: 'assembly-line.webp', text: 'Assembly Line', width: 800, height: 600 },
  { name: 'environmental-testing.webp', text: 'Environmental Testing', width: 800, height: 600 },
  { name: 'packaging-logistics.webp', text: 'Packaging Logistics', width: 800, height: 600 }
]

// 创建博客图片
blogImages.forEach(image => {
  const svg = createPlaceholderSVG(image.width, image.height, image.text)
  fs.writeFileSync(path.join(blogImagesDir, image.name), svg)
  console.log(`Created: ${image.name}`)
})

// 创建工厂图片
factoryImages.forEach(image => {
  const svg = createPlaceholderSVG(image.width, image.height, image.text)
  fs.writeFileSync(path.join(factoryImagesDir, image.name), svg)
  console.log(`Created: ${image.name}`)
})

console.log('Placeholder images created successfully!')