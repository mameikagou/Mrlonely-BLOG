

### 项目

#### 1，table组件要考虑哪些方面？比如有一万条数据，你要怎么处理？

答：分页，虚拟滚动懒加载

#### 2，form组件，里面嵌入了默认值，那你如何实现“虚拟显示”的草稿态跟真实值切换？

#### 3. 选项如何做持久化的？

答了localStorage

#### 4. 封装请求库，你要如何实现axios，你要考虑哪些方面？ 二次封装axios，你要考虑哪些方面？知道什么说什么

#### 5. 一个loading效果，他在页面还没挂载（mounted），组件还没加载出来，你要怎么把loading插入进去？

答了React的Suspense和Lazy，以及骨架屏；


#### 6. 说一下对性能优化的理解

- 组件层面：懒加载、 lazy 、SusPense 、memo、useMemo、useCallback；
- 框架层面：把webpack换为vite，vite的热更新更快；
- 请求层面：react-query，请求缓存；
- 然后答了一些：埋点监控，CDN，Proformance；
- PNPM，减少包的体积以及加载速度
- 图片上，用webp


#### 7. 如何异步加载图片

- offset，监听滚动事件，判断图片是否在视口内，如果在视口内，就加载图片；
- IntersectionObserver，监听元素是否进入视口；

#### 8. vite和webpack分包的区别，chunk有什么不同

不知道，瞎扯了一下vite用Rollup，webpack用的是原生的，vite更快；

### 计网

#### 1. 从url到页面展示，中间发生了什么？

- DNS解析
- TCP三次握手
- HTTP请求
- 服务器处理请求
- 解析html，css，渲染

#### 2. 讲一下http状态码

1xx，

4xx，

5xx

#### 3. 浏览器缓存，硬缓存，协商缓存

硬缓存：Cache0-Control，Expires

协商缓存：Etag，Last-Modified


#### 4. 说一下前端的漏洞

- XSS
- CSRF

CSRF（跨站请求伪造）：  攻击者盗用了你的身份，以你的名义发送恶意请求；
就referer字段，token，验证码，加密等等

#### 5. 讲讲跨域

- JSONP、CORS
- 前端框架设置代理，后端允许跨域




#### 前端基础

#### 1. 埋点监控如何监控错误？

window.onerror

监听promise的reject

#### 2. 重绘重排；  更改opacity。5和0.5会引发重绘重排吗 ？ 
#### 更改width会引发重绘重排吗？
#### 更改keyframes会引发重绘重排吗？
#### 更改transform会引发重绘重排吗？
#### 更改translateY会引发重绘重排吗？

- 重绘：元素的样式改变，但是不影响布局；
- 重排：元素的布局改变，会引起重绘；


#### 3. 事件循环

#### 4. 如何判断变量的类型

- typeof
- 去原型链上找

#### 5. 有多个请求，如何并发？

- Promise.all
又问，失败了如何处理？  用Promise.allSettled

### 手撕

算法题1：<https://leetcode-cn.com/problems/add-strings/>

算法题2：<https://leetcode.cn/problems/lru-cache/description/>