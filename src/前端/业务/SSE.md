

项目拷打：rag的流程和项目的创新点，子问题拆分如何实现
2. sse用的是啥协议，前后端具体如何实现不断发送内容
    - http/https
    - text/event-stream
3. sse和websocket的区别
    - 没必要全双工。
    - 服务器负担比较大，更容易掉线。
    - 健壮性： SSE 的 EventSource API 原生支持断线重连，对开发者非常友好。
    - WebSocket 的断线重连和心跳保活机制需要自己实现或依赖库来完成
4. http建立连接过程
