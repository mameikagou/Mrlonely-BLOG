


#### options请求

- http/1.1协议（长连接和多路复用）
- 幂等：执行一次和执行多次的效果相同。

- 使用场景
    - CORS预检请求：如果满足特定条件，会自动发送 OPTIONS 预检请求来检查是否被允许。
        - 非简单请求方法：PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH。发送这些来确定是否支持。
        - 非简单请求头：Content-Type 不是 application/x-www-form-urlencoded、multipart/form-data、text/plain包含自定义头部
        - 携带凭证的请求
    - 查询服务器支持的 HTTP 方法，返回 Allow 头部告知支持哪些方法
    - 进行cors协商