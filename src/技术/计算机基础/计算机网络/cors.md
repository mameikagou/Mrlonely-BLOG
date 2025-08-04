
#### 跨域问题，a向b网站发起跨域请求，那么cors的credentials应该在谁上面设置，携带的是谁的cookie？

credentials在发请求的a上面，携带的cookie是b自己的cookie（这个是服务端发给客户端的凭证）。

同源策略（域名、协议、端口）限制。

可以把cookie理解成身份证，这种情况只能是a.com给b.com发请求的时候带入b.com的身份证，绝不能是带入a.com自己的身份证。