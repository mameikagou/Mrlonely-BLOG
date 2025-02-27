

本文参考文章：
<https://mp.weixin.qq.com/s/1Vq_ddDqhcEO77jYRtQHHw>

## 一些概念：

- SSR 服务端渲染：服务端生成html文件，将其发送到客户端
- SSG 静态站点生成：在构建阶段预生成所有的HTML静态文件，适合博客和文档站；
- ISG：SSG增强版，允许在构建后按需更新部门页面，比如电商列表，新闻聚合等等；

## 同构

说白了就是一个映射的方式
你编写的一个组件，可以在服务端被渲染成字符串，在客户端被渲染成dom节点；

#### 什么是水合（hydrate）？什么是脱水(dehydrate)？

脱水：在服务端生成html文件的时候，将初始状态嵌入到html的script标签，以便它能快读反应
```html
<script>window.__PRELOADED_STATE__ = ${JSON.stringify(state)};</script>
```

水合：发生在页面首次加载的时候
指将服务端渲染的静态HTML和与客户端的React绑定，使其可交互的过程；

### nextjs的方案
使用React Server Component(RSC)服务端组件来解决服务端渲染的问题

在服务端组件中也能引入客户端组件，进行“按需水合”；

服务端会把客户端组件的html模版渲染出来，但是它不具备响应能力；

服务端
```tsx
<Flex>
  <ChatButton />
  <ActiveCodeButton />
  <ThemeToggleButton/>
</Flex>
```

其中的客户端组件<ThemeToggleButton/>

```tsx
'use client';

import Button from "@/components/Button";
import { useEffect } from "react";
import { useTheme } from 'next-themes'

export default function ThemeToggleButton() {
  const {theme, setTheme} = useTheme()

  function __themeToggle() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button onClick={__themeToggle}>Switch</Button>
  )
}
```

### 某rn和mp同构方案
在某公司的业务场景中，随着业务的迅猛发展，很多业务需求都要求站内实现RN和微信小程序MP双端更新；
目前的问题是：使用原本的max方案转码包体积较大、代码可读性差、在复杂环境下可用性较低的问题；

简单来说：分逻辑层和视图层同构

逻辑层：
- 相同功能的组件以及函数同构，函数/类 组件，生命周期函数等等；
- 异步形式：Promise以及回调等等；

视图层：
- dom结构
- css

