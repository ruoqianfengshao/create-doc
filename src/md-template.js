// index.md 模板
module.exports = ({name, cnName}) => {
  return (
    `---
title: ${cnName}
title_en: ${name}
category: 1
order: 2
description: 请在这里描述组件功能
---

# 简介


# 用法


## 场景


# 组件参数
    `
  )
}