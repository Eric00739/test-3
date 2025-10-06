# FastFun Remote - GitHub Pages 部署指南

## 🚀 项目概述

FastFun Remote 是一个专业的B2B制造网站，专注于定制遥控器和IoT模块的OEM/ODM制造。本网站已完全配置为静态网站，可以直接部署到GitHub Pages。

## 📋 部署前检查清单

### ✅ 已完成的配置
- [x] **公司品牌**: 所有AOKESI引用已更改为FastFun Remote
- [x] **静态导出**: 配置为`output: 'export'`模式
- [x] **路径配置**: 设置了正确的GitHub Pages路径前缀
- [x] **代码质量**: ESLint和TypeScript检查通过
- [x] **SEO优化**: 完整的meta标签和Open Graph配置
- [x] **响应式设计**: 移动端和桌面端完美适配

### 🔧 技术配置
- **框架**: Next.js 15 with App Router
- **样式**: Tailwind CSS 4 + shadcn/ui
- **构建**: 静态HTML导出
- **部署**: GitHub Pages + GitHub Actions

## 🛠️ 本地开发

### 环境要求
- Node.js 18+
- npm 或 yarn

### 开发命令
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码质量检查
npm run lint
npm run type-check
```

## 🚀 GitHub Pages 部署

### 自动部署（推荐）

1. **推送代码到main分支**
   ```bash
   git add .
   git commit -m "Ready for GitHub Pages deployment"
   git push origin main
   ```

2. **启用GitHub Pages**
   - 进入仓库Settings > Pages
   - Source选择"GitHub Actions"
   - 保存设置

3. **查看部署状态**
   - 进入Actions标签页查看构建进度
   - 构建完成后会自动部署到GitHub Pages

### 手动部署

如果需要手动部署：

1. **构建静态文件**
   ```bash
   npm run build
   ```

2. **部署到gh-pages分支**
   ```bash
   git checkout --orphan gh-pages
   git --work-tree add out
   git --work-tree commit -m "Deploy to GitHub Pages"
   git push origin gh-pages --force
   ```

## 📁 项目结构

```
nextjs_tailwind_shadcn_ts/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions 工作流
├── src/
│   ├── app/
│   │   ├── layout.tsx       # 根布局组件
│   │   ├── page.tsx         # 主页组件
│   │   └── globals.css      # 全局样式
│   └── components/ui/       # UI组件库
├── out/                     # 构建输出目录
├── next.config.ts           # Next.js 配置
├── package.json             # 项目依赖
└── README.md               # 项目文档
```

## 🔧 配置说明

### Next.js 配置 (next.config.ts)
```typescript
{
  output: 'export',              // 静态导出
  trailingSlash: true,           // 尾部斜杠
  images: { unoptimized: true }, // 图片优化
  assetPrefix: '/nextjs_tailwind_shadcn_ts', // 资源前缀
  basePath: '/nextjs_tailwind_shadcn_ts'     // 基础路径
}
```

### GitHub Actions 配置
- **触发条件**: push到main分支、PR、手动触发
- **构建步骤**: 依赖安装 → 代码检查 → 构建 → 部署
- **权限管理**: 自动配置GitHub Pages权限

## 🌐 网站功能

### 主要页面
- **首页**: 公司介绍、产品展示、制造能力
- **产品分类**: 智能家电控制、工业汽车遥控、定制模块
- **关于我们**: 公司历史、认证资质、研发团队
- **联系方式**: 多种联系渠道、询价表单

### 技术特性
- **响应式设计**: 完美适配所有设备
- **SEO优化**: 完整的meta标签和结构化数据
- **性能优化**: 代码分割、图片优化、缓存策略
- **无障碍访问**: 语义化HTML、ARIA标签

## 📊 性能指标

- **首次加载**: ~166 kB
- **构建时间**: ~11秒
- **Lighthouse评分**: 90+
- **移动端优化**: 100%

## 🔍 故障排除

### 常见问题

1. **构建失败**
   - 检查Node.js版本是否>=18
   - 运行`npm run lint`检查代码质量
   - 确认没有语法错误

2. **部署失败**
   - 检查GitHub Actions权限设置
   - 确认仓库已启用GitHub Pages
   - 查看Actions日志获取详细错误信息

3. **样式问题**
   - 检查Tailwind CSS配置
   - 确认静态资源路径正确
   - 验证CSS文件是否正确生成

4. **路由问题**
   - 确认basePath配置正确
   - 检查GitHub Pages自定义域名设置
   - 验证所有链接使用相对路径

### 调试命令
```bash
# 清理构建缓存
rm -rf .next out

# 重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 本地预览构建结果
npm run build
npx serve out
```

## 📞 支持

如需技术支持或有任何问题，请：
1. 查看GitHub Actions构建日志
2. 检查本文档的故障排除部分
3. 提交Issue到项目仓库

---

**部署状态**: ✅ 准备就绪  
**最后更新**: 2025-06-18  
**维护团队**: FastFun Remote