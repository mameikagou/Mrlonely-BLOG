### service worker1

就是服务器和浏览器的中间层，可以拦截所有请求，进行数据处理，并且访问chahe和indexDB，独立线程，纯异步API（所以不能调用同步api，比如localStorge）；