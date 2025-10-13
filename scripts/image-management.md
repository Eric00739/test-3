# 图片管理指南

## 当前状态

✅ 已创建占位图片目录结构
- `public/images/blog/` - 博客图片
- `public/images/factory/` - 工厂图片

✅ 已生成占位图片
- 12个博客相关图片
- 7个工厂相关图片

✅ 已更新Markdown文件引用路径
- 所有图片路径已指向正确的目录

## 添加真实图片的步骤

### 1. 准备图片文件
- 格式：WebP（推荐）或JPEG
- 尺寸：按照README.md中的规范
- 文件大小：尽量控制在300KB以内

### 2. 替换占位图片
```bash
# 将真实图片复制到对应目录
cp /path/to/real-image.webp public/images/blog/filename.webp
```

### 3. 更新图片引用
如果文件名有变化，需要更新对应的Markdown文件中的图片路径。

### 4. 测试验证
- 检查博客页面图片显示
- 验证图片加载性能
- 确认响应式显示效果

## 批量处理建议

### 使用ImageMagick批量转换
```bash
# 将JPEG转换为WebP
mogrify -format webp -quality 85 *.jpg

# 调整图片尺寸
mogrify -resize 800x600 *.webp
```

### 使用Squoosh.app批量优化
1. 访问 https://squoosh.app/
2. 批量上传图片
3. 选择WebP格式，质量80-85%
4. 下载优化后的图片

## 图片命名规范

### 博客图片
- 格式：`{category}-{description}.webp`
- 示例：
  - `factory-smt-line.webp`
  - `technology-5g-demo.webp`
  - `maintenance-battery-care.webp`

### 工厂图片
- 格式：`{area}-{equipment}.webp`
- 示例：
  - `production-smt-machine.webp`
  - `testing-rf-equipment.webp`
  - `assembly-line-workers.webp`

## 图片SEO优化

### 文件名SEO
- 使用描述性文件名
- 包含相关关键词
- 使用连字符分隔单词

### Alt文本优化
- 准确描述图片内容
- 包含相关关键词
- 避免关键词堆砌

## 性能监控

### 检查图片加载性能
```javascript
// 在浏览器控制台检查图片加载时间
performance.getEntriesByType('resource')
  .filter(entry => entry.initiatorType === 'img')
  .forEach(entry => console.log(entry.name, entry.duration))
```

### 优化建议
- 使用Next.js Image组件自动优化
- 实施懒加载
- 考虑使用CDN
- 启用Gzip压缩

## 备份策略

### 本地备份
```bash
# 备份图片目录
tar -czf images-backup-$(date +%Y%m%d).tar.gz public/images/
```

### 云存储备份
- 考虑使用云存储服务备份重要图片
- 设置自动备份策略
- 定期验证备份完整性