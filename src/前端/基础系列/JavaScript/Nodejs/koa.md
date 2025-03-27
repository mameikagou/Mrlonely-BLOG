

## KOA
最早是cjs，文档也是；现在已经完全兼容esm了；

- new Koa() 的 app 只有在 listen 的时候才创建 HTTP Server；


- use fn 的时候，传入的一个函数会被压入到中间件队列，像洋葱的一层层皮一样逐级进入逐级穿出

- Koa 支持对 Buffer/String/JSON/Stream 数据类型的直接响应

```js
// 1. String 类型响应
app.use(async ctx => {
  ctx.body = 'Hello World';  // 直接返回字符串
});

// 2. Buffer 类型响应
app.use(async ctx => {
  ctx.body = Buffer.from('Hello World');  // 直接返回 Buffer
});

// 3. JSON 类型响应
app.use(async ctx => {
  ctx.body = {  // 直接返回对象，Koa 会自动转换为 JSON
    name: 'John',
    age: 30
  };
});

// 4. Stream 类型响应
app.use(async ctx => {
  const fs = require('fs');
  ctx.body = fs.createReadStream('file.txt');  // 直接返回流
});
```

- 上下文 context 是在 Node 原生的 request 进入也就是异步回调执行的时候才创建，不是一开始创建好的，所以每个请求都有独立的上下文，自然不会互相污染

```js
// 当请求进来时
app.use(async (ctx) => {
  // 这里的 ctx 是 Koa 为这个请求新创建的上下文
  // 每个请求都会得到一个新的 ctx 对象
  console.log(ctx.request.url);
});
```
- 创建好的上下文，Koa 会把它们跟原生，以及请求和响应之间，建立各种引用关系，方便在业务代码和中间件中使用，也就是 createContext 里面所干的事情

```js
app.use(async (ctx) => {
  // ctx 包含了多个重要引用：
  
  // 1. 原生 Node.js 的请求对象
  ctx.req;  // Node.js 原生 request
  
  // 2. Koa 封装的请求对象
  ctx.request;  // Koa 的 request 对象
  
  // 3. 原生 Node.js 的响应对象
  ctx.res;  // Node.js 原生 response
  
  // 4. Koa 封装的响应对象
  ctx.response;  // Koa 的 response 对象
  
  // 5. 状态码
  ctx.status;
  
  // 6. 响应体
  ctx.body;
});
```