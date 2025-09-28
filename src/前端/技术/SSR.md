

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


#### 抽奖小程序使用SSR的核心原因？

- 更快的首屏加载FCP/LCP
- SEO友好，虽然不直接关联传统搜索引擎

，但是这个也十分必要。

追问：
  1. 模糊的指标：你说实现了“秒级的页面加载”，这是一个非常模糊且不专业的
    描述。“秒级”是一秒、两秒还是八秒？对于C端活动页，超过1.5秒的FCP可
    能就已经流失了大量用户。你具体指的是哪个性能指标？是FCP（首次内容
    绘制）、LCP（最大内容绘制）还是TTI（可交互时间）？优化前后的具体数
    据是多少？你是用什么工具来量化这些指标的？Lighthouse？WebPageTest
    ？还是自建的性能监控平台？
      - 这个页面最开始是采用的纯CSR渲染，在我使用主流安卓机型以及4G慢速网络下，LCP的P90（90%的用户耗时）值在3.2秒左右，改造之后优化到了1.1秒。
      - 这是公司自建的性能监控平台采集盒汇总的。

  2. 含糊的场景：你提到“H5小程序页面”，这到底是一个纯粹的H5页面，还是内
    嵌在小程序里的WebView？这两者的优化侧重点和环境差异巨大。如果是小
    程序WebView，你如何处理小程序环境的登录、鉴权和数据传递？SSR带来的
    SEO优势在小程序封闭环境内价值又有多大？
      - 在webview里面，传统SEO的价值几乎为0，我们坚持用SSR的核心价值是：“体验”。
        - 用我们的基建平台数据分析，页面加载时间每增加500ms，用户的点击率就会降低5%。这一点差距虽然看起来不多，但是带来的业务的收益是实打实的。 
      - 主要在webview里面，但是也会涉及到其他渠道，可以实现一套代码在不同场景运行。

  3. 动画与渲染的矛盾：你强调使用了Animate、Keyframes等动画。如果这些动
    画很复杂，或者依赖JS计算，那么即使用户通过SSR很快看到了首屏，动画
    资源（特别是JS）的加载和执行也可能导致页面在短时间内无法响应，或者
    出现卡顿、布局抖动。你是如何处理SSR“注水”（Hydration）过程与复杂动
    画的启动时机的？
      - 分两种，状态动画使用纯css
      - 复杂动画做延迟启动，只有isMounted设置为true，才会启动，采耳避免js动画一定在组件水合之后才开始执行，避免与react渲染抢主线程导致的卡顿。

  4. SSR的代价：你只说了SSR的好处，但没有提它的成本。引入SSR会显著增加
    服务器的计算压力和运维复杂度。你的抽奖页面，QPS（每秒查询率）和峰
    值流量大概是多少？渲染服务器的配置和数量是怎样的？有没有做缓存策略
    ？是页面级的静态缓存，还是组件级、数据级的缓存？缓存的更新策略又是
    什么？
      - QPS（每秒查询率）峰值在5000左右，然后回落到日常的100；
        - 所以，在更现实的场景下，5000 QPS 的服务能力，可能只能支撑 1500 到 2000 名用户在同一秒内查询结果。
      - 我们常规配置是4个Pod，每个是2核4G，能支持自动扩容。
      - 缓存策略：
        - 设计了三层缓存：
          - CDN层： 配置HTTP头`Cache-Control: s-maxage=60, stale-while-revalidate=300`一分钟的页面缓存。这里能拦住90%的qps。
            - s-maxage 是共享缓存的强缓存（区别于浏览器本地的缓存），直接CDN拦住了，不会有回源流量。
            - 浏览器缓存（强缓存和协商缓存）和共享缓存（CDN/Proxy）。
          - Nginx反代缓存：5秒中的代理缓存来应对顺发的流量。设置proxy_cache。
            - Nginx的5秒缓存进一步将回源到Node.js应用的请求从500QPS削减到约100-150 QPS，为应用层提供了宝贵的缓冲。
          - 在服务内，我们还会做一层缓存，2分钟的缓存来存储静态页面的壳子。
      - 更新策略是一分钟的更新时间

  5. 有没有出现过服务端和客户端渲染结果不一致导致注水失
    败的问题？
      - 如何保证一渲染结果一致？
        - 服务端会将初始化的数据脱水成一个JSON字符串，挂载到window.__
          INITIAL_STATE__, 客户端在执行ReactDOM.hydrateRoot之前，会现在这下面读取初始State，避免水合错误。
      - 水合失败的场景？
        - 时间戳，随机数，浏览器特有的API，HTML结构不规范（`<p>`里面嵌套了`<div>`）

