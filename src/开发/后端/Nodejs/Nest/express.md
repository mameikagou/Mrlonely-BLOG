## express

### Request

原生的 request 对象

```ts
  request.method  // GET/POST 等
  request.url     // 原始 URL
  request.headers // 请求头
  request.on('data', ...) // 手动处理请求体
```

一些 express 的拓展参数，在 express 和 以 express 为底层的 nestjs 中，这些参数是直接挂载在 req 上的。

```ts
req.params; // 路由参数 /users/:id → { id: 123 }
req.query; // 解析后的查询参数 ?name=John → { name: 'John' }
req.body; // 解析后的请求体（需配合 body-parser）
req.cookies; // 解析后的 Cookies（需配合 cookie-parser）
req.ip; // 客户端 IP
req.path; // 路径部分 /users/123 → '/users/123'
req.xhr; // 是否是 AJAX 请求
```

### Response

原生：

```ts
response.statusCode = 200;
response.setHeader("Content-Type", "text/plain");
response.write("Hello");
response.end();
```

### Router
