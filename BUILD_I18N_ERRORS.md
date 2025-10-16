# 构建过程中的多语言错误

## 错误概述

构建过程中会显示多语言缺失错误，但由于我们实现了回退机制，构建仍会成功完成。这些错误不影响网站功能，但会在构建日志中显示。

## 缺失的翻译键

### 1. Hero 部分
以下键在 pt, es, fr, it 语言中缺失：
- `hero.primaryCtaOptions.0`
- `hero.compatibilityCta`
- `hero.catalogCta`
- `hero.promise`
- `hero.disclaimerTitle`
- `hero.disclaimer.0`
- `hero.disclaimer.1`
- `hero.disclaimer.2`
- `hero.disclaimer.3`

### 2. 导航部分
以下键在 pt, es, fr, it 语言中缺失：
- `taskRouting`
- `compatibility`
- `process`

## 错误示例

```
Error: MISSING_MESSAGE: hero.primaryCtaOptions.0 (pt)
Error: MISSING_MESSAGE: hero.compatibilityCta (pt)
Error: MISSING_MESSAGE: taskRouting (pt)
```

## 解决方案

### 短期解决方案（已实现）
1. **回退机制**：在 `src/i18n/get-messages.ts` 中实现了英语回退
2. **构建完成**：尽管显示错误，构建仍会成功完成
3. **功能正常**：网站会以英语显示缺失的翻译内容

### 长期解决方案
1. **补充翻译**：为 pt, es, fr, it 语言添加缺失的翻译键
2. **翻译完整性**：确保所有语言都有完整的翻译

## 如何补充翻译

1. 打开对应的语言文件：
   - `src/messages/pt.json`
   - `src/messages/es.json`
   - `src/messages/fr.json`
   - `src/messages/it.json`

2. 添加缺失的翻译键，参考 `src/messages/en.json`：
```json
{
  "hero": {
    "primaryCtaOptions": {
      "0": "Get a Quote (creates a ticket instantly)"
    },
    "compatibilityCta": "Compatibility/Replacement Lookup",
    "catalogCta": "Browse Finished Products",
    "promise": "Creates support ticket instantly • Business-hours reply guaranteed",
    "disclaimerTitle": "Important Notes:",
    "disclaimer": {
      "0": "Range figures are open-field typical values; actual distance depends on antenna, mounting, and interference.",
      "1": "Long-range (1–3 km) requires compliant RF power, tuned antennas, and lower data rates.",
      "2": "Learning remotes provided only support cleartext fixed codes (EV1527 / PT2262).",
      "3": "Rolling-code compatibility depends on receiver capability; bridge or replacement receivers are recommended when unsupported."
    }
  },
  "taskRouting": "How can we help you today?",
  "compatibility": "Compatibility/Replacement Center",
  "process": "Our Process"
}
```

## 构建验证

构建成功后会显示：
```
✓ Compiled successfully in 27.0s
✓ Generating static pages (61/61)
```

尽管过程中会显示多语言错误，但构建会成功完成，网站功能正常。

## 注意事项

1. 这些错误不影响网站的部署和功能
2. GitHub Pages 工作流会成功完成
3. 用户会看到英语内容作为缺失翻译的回退
4. 建议在后续版本中补充完整的翻译