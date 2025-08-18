

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






## 服务端渲染SSR

react-dom/server
```js
// 服务端代码
import { renderToString } from 'react-dom/server';

// 将 React 组件渲染成 HTML 字符串
const html = renderToString(<App />);
```

只渲染页面，不添加交互和API；

客户端水合(Hydration) 过程就是给渲染出的模版添加交互的过程；
其中包括：保持原本的dom结构，添加事件处理，应用浏览器api

```js
// 客户端水合
hydrateRoot(document.getElementById('root'), 
  <button onClick={() => alert('clicked')}>
    Click me
  </button>
);
```




#### 问题：

- ssr node端请求后端数据接口报错，如何处理？
  - 捕获错误与优雅降级 (Graceful Degradation)
    -
  - 超时重试，指数退避
    - 一般只对GET重试
- ssr后端失效，如何切换为前端渲染
  - nginx配置反向代理
    - 用户的请求都放到nginx里面，如果超时了就返回一个只有#root的html
    - 如果前端因为发现这个html的#root没有包含内容，那么就自动触发CSR降级
    - 接下来就会在客户端完成工作
- ssr造成服务端负载增大，如何缓解
  - 核心思想：能不渲染就不渲染，要渲染就快速渲染
  - 缓存
    - 页面级的缓存，对于不常变化的页面：我会将首次 SSR 渲染生成的完整 HTML 页面缓存到 CDN、Varnish 或 Redis 中
    - 组件级缓存：页眉页脚缓存
    - 数据缓存：请求数据缓存
  - 方法二
  - 方法三
  - 资源拓展：
    - 增加node实例
    - pm2多进程


##### ssr后端失效，如何切换为前端渲染，追问
- Nginx 返回的这个兜底 HTML 是如何部署和更新的？它和前端 JS bundle 的版本如何保持同步？

- 这种从 SSR 降级到 CSR 的切换，对网站的 SEO 会有什么影响？有什么办法可以缓解这种影响吗？

- 在 CSR 模式下，首次数据请求是在哪个生命周期阶段发起的？这和 SSR 模式有什么不同？

- 如果 SSR 服务只是响应变慢但没有完全失效，Nginx 的超时时间设置得太短可能会导致频繁降级到 CSR，这个超时时间你是如何评估和决定的？


##### 面试官延伸追问:
- 页面级缓存对于“千人一面”的个性化页面（比如已登录用户的推荐信息流）是否适用？如果不适用，你有什么替代方案？（提示：ESI, Edge Side Includes）

- 使用流式渲染时，如果某个数据块在流式传输过程中获取失败了，会发生什么？你有什么机制来处理这种情况？

- 你如何具体决策一个页面应该使用 SSR、SSG 还是 ISR？你的决策流程和依据是什么？

- 在使用 PM2 进行集群部署时，多个进程之间是无状态的。如果业务需要共享某些状态（如 WebSocket 连接），你会如何处理？