
#### 跨域问题，a向b网站发起跨域请求，那么cors的credentials应该在谁上面设置，携带的是谁的cookie？

credentials在发请求的a上面，携带的cookie是b自己的cookie（这个是服务端发给客户端的凭证）。

同源策略（域名、协议、端口）限制。

可以把cookie理解成身份证，这种情况只能是a.com给b.com发请求的时候带入b.com的身份证，绝不能是带入a.com自己的身份证。


#### 如何解决跨域

- 最核心的就是响应头的`Access-Control-Allow-Origin`字段
    - 浏览器收到请求之后，会检查这个头，如果存在且其值包含了当前源，那么浏览器就认为这次通信是合法的。

- 一些细节：
    - 简单请求和预检请求：复杂请求，比如option和delete、put等等，会先发送option请求去询问服务器是否允许接下来将要发生的实际请求

- 解决方案：
    - 前端开发中使用Proxy代理，绕过
    - Nginx反向代理
    - jsonp的`<script>`标签，（有xss问题）
    - websocket天然跨域
    - BFF层代理