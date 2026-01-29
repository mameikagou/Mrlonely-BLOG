
#### socket.io到底升级了什么？

| 特性 | 原生 WebSocket (我们刚做的) | Socket.IO (前端库) |
| :--- | :--- | :--- |
| 本质 | 底层传输协议 (像一个零件) | 实时通信框架 (像一个全家桶) |
| 连接性 | 仅 WS。失败=彻底失败 | WS 优先，自动降级为 HTTP 长轮询 |
| API 风格 | `ws.send(string)` / `ws.onmessage` | `socket.emit('event', data)` / `socket.on('event', fn)` |
| 重连 | 需手动实现（非常复杂） | 自动重连（内置） |
| 消息回执 | 需手动实现（非常复杂） | 内置回调函数 |
| 后端依赖 | 任何“纯”WS 服务器 (如 gorilla/websocket) | 必须是 Socket.IO 服务器 |