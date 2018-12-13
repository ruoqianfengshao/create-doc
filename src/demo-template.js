// demo 里的示例 md 模板
module.exports = ({ name }) => {
  return (
    `---
category: 2
title: 用法一
title_en: First Usage
order: 0
---

这里是描述

\`\`\`jsx
import { ${name} } from 'parkball';

// 这里写一些 demo
\`\`\`
    `
  )
}