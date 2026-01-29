

#### vite虚拟模块
[vite虚拟模块](https://juejin.cn/post/7128401663152357407)



[]: # vite的虚拟模块是指在开发环境中，vite会将一些模块的内容动态生成，而不是从磁盘读取。这些虚拟模块通常以`/@`开头，例如`/@fs/`、`/@id/`等。它们可以用于实现一些特殊的功能，例如：
[]: # 
[]: # - 处理静态资源：vite会将静态资源（如图片、字体等）转换为虚拟模块，以便在开发环境中快速加载和热更新。
[]: # - 实现自定义的模块解析：vite允许用户通过插件机制自定义虚拟模块的解析规则，以满足特定的需求。
[]: # - 支持 HMR：vite的虚拟模块支持热更新，可以在开发过程中实时更新模块内容，而无需刷新页面。
[]: # 
[]: #
[]: # 通过使用虚拟模块，vite可以提高开发效率，减少构建时间，并提供更好的开发体验。

官方文档的解释:
<https://cn.vitejs.dev/guide/api-plugin#virtual-modules-convention>

我的理解就是，根据Rollup的钩子，做一些“开发”阶段的辅助操作；（我这里是一个vite开发阶段插件的项目，正好适用于这种需求；）

```md
在开发中，Vite 开发服务器会创建一个插件容器来调用 Rollup 构建钩子，与 Rollup 如出一辙。

以下钩子在服务器启动时被调用：

- options
- buildStart

以下钩子会在每个传入模块请求时被调用：

- resolveId
- load
- transform

```


### vite-plugin-vue-mcp
这是一个vite的插件，主要是为了支持mcp协议的；（主要是cursor的mcp协议）
它的作用是将vue组件转换为mcp协议的格式，以便在cursor中使用。
它的实现原理是使用vite的插件机制，在编译阶段将vue组件转换为mcp协议的格式，然后在运行时将其加载到cursor中。
它的使用方式是，在vite.config.js中引入该插件，并在plugins中添加该插件即可。

<https://github.com/webfansplz/vite-plugin-vue-mcp>

#### 实现方式:

```ts
import { createHooks } from 'hookable' // hookable是一个轻量级的事件处理库
export function createVueMcpContext(): VueMcpContext {
  return {
    hooks: createHooks(),
    rpc: null!,
    rpcServer: null!,
  }
}
```

使用上下文ctx机制来统一 mcp服务器和rpc调用，并且统一封装成vite的插件；

使用流程：
使用mcp服务器，通过在cursor中输入命令的方式，触发mcp调用服务端rpc接口；

rpc具有通信的能力，服务端的rpc接口，直接调用客户端虚拟模块中的方法，再返回数据给服务端；

#### mcp
mcp的服务端和客户端，通过transport进行通信；


### vite-dev-rpc

```ts
// 看以下这个例子：
import { createRPCServer } from 'vite-dev-rpc'

export function createServerRpc(ctx: VueMcpContext): RpcFunctions {
  return {
    async Func1() {
      return ctx
    },
    async Func2() {
      return ctx
    },
  }
const serverFunctions = createServerRpc(ctx)

const rpcServer = createRPCServer<ServerFunctions, ClientFunctions>(
  namespace,
  wsServer, // vite.ws vite内置的ws实例
  serverFunctions, // 可以是一个对象，也可以是一个函数
  options
)

// 二者通过统一namespace的方式进行识别

import { createHotContext } from 'vite-hot-client'

// const hot = createHotContext<ServerFunctions>(namespace, wsClient)
const hot = createHotContext() // 一般0配置直接用，他会自己获取window以及vite的全局对象
// 客户端
const rpc = createRPCClient(
  namespace,
  hot, // 没太看懂这个hot
  clientFunctions, // 同上，可以是一个有一堆函数的对象，也可以是一个函数
  options
)
```

