

### 项目

#### 1，table组件要考虑哪些方面？比如有一万条数据，你要怎么处理？

答：分页、虚拟滚动懒加载；

#### 2，form组件，里面嵌入了默认值，那你如何实现“虚拟显示”的草稿态跟真实值切换？

#### 3. 选项如何做持久化的？

答了localStorage

#### 4. 封装请求库，你要如何实现axios，你要考虑哪些方面？ 二次封装axios，你要考虑哪些方面？知道什么说什么

- 请求拦截和响应拦截，比如统一识别成功的状态码200
- 全局封装请求，增加埋点信息，增加错误的message，提示以及增加错误埋点；
- 加一个`controllerMap`, 使用浏览器的`AbortController`增加请求取消的功能；

```typescript
const controllerMap = new Map()

const addController = (key: string, controller: AbortController) => {
  controllerMap.set(key, controller)
}

const cancelRequest = (key: string) => {
  controllerMap.get(key)?.abort()
  controllerMap.delete(key)
}

// 在请求配置中添加
config.signal = controller.signal
```

- 增加重试机制
demo如下：

```ts
const retryAdapter = (adapter: AxiosAdapter, options: { retry: number }) => {
  return async (config: AxiosRequestConfig) => {
    let retryCount = 0
    const attempt = async (): Promise<any> => {
      try {
        return await adapter(config)
      } catch (error) {
        if (shouldRetry(error) && retryCount < options.retry) {
          retryCount++
          return attempt()
        }
        throw error
      }
    }
    return attempt()
  }
}
```

- CSRF防御和XSS防御：
```typescript
service.defaults.xsrfCookieName = 'XSRF-TOKEN'
service.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'
```


```typescript
const xssFilter = (data: any) => {
  if (typeof data === 'string') {
    return data.replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }
  return data
}

service.interceptors.request.use(config => {
  config.data = xssFilter(config.data)
  return config
})
```

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

2xx，成功系列

4xx，错误系列

5xx，服务端错误系列

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

#### 2. 重绘重排；  更改opacity5到0.5会引发重绘重排吗 ？ 

一般不会重排，但是会重绘；
使用translateZ0提升到合成层，触发合成层优化，就不会触发重绘；

#### 更改width会引发重绘重排吗？

会触发重排，然后导致重绘；

#### 更改keyframes会引发重绘重排吗？

如果是更改几何属性，比如width这种，每一帧都会触发；
如果是transform或者opacity这类，都会优化到合成层；

#### 更改transform会引发重绘重排吗？

合成层，不触发

#### 更改translateY会引发重绘重排吗？

合成层，不触发

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