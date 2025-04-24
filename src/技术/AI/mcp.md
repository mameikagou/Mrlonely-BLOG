


## MCP model context protocol

官方文档：<https://modelcontextprotocol.io/introduction>

目的是标准化模型上下文的格式和内容，统一`数据格式`以及`上下文生命周期`

cursor的文档：<https://docs.cursor.com/context/model-context-protocol>

#### 核心组件

- Mcp Host：比如cursor或者其他的IDE等等，负责上下文的创建和管理

- MCP Client: 集成到app中，向模型发布并且管理上下文; 与MCP Server进行1:1连接并且进行通信；
- MCP Server: 负责上下文的缓存和路由
- Tool Host： 运行外部工具，通过MCP协议与MCP Server进行通信

#### MCP核心概念

#### cursor的mcp能力示例

- 访问数据库的能力
- 做笔记的能力notion
- 访问和使用github的能力，包括提交pr
- Memory：工作记忆，获取上下文的能力

#### cursor使用mcp服务器的方式

- stdio Transport: 本地的map服务器，通过标准输入输出进行通信；
<https://github.com/modelcontextprotocol/quickstart-resources/blob/main/mcp-client-typescript/index.ts>
基本操作是：客户端通过shell来发送内容，与Server进行交互

- sse Transport: 通过sse来进行通信
就是Server单向的推送数据到客户端

- websocket Transport: 通过websocket来进行通信

#### mcp相关的开发库
`"@modelcontextprotocol/sdk": "^0.1.0",`
源代码：<https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file#overview>
两个常见api：`McpServer`以及`Server`

example：<https://github.com/modelcontextprotocol/server-everything/blob/main/src/everything.ts>

```ts
// 高级封装
new McpServer({ name: string, version: string })
server.tool(name, description, schema, handler); // schema是参数校验规则
```

```ts
  const server = new McpServer(
    {
      name: 'vite',
      version,
      ...options.mcpServerInfo, // 好像是用来保底的
    },
  )

    server.tool(
    'get-component-tree',
    'Get the Vue component tree in markdown tree syntax format.',
    {
    },
    async () => {
      return new Promise((resolve) => {
        const eventName = nanoid()
        ctx.hooks.hookOnce(eventName, (res) => {
          resolve({
            content: [{
              type: 'text',
              text: JSON.stringify(res),
            }],
          })
        })
        ctx.rpcServer.getInspectorTree({ event: eventName })
      })
    },
  )
```



当我们在cursor中进行如下配置的时候，cursor会自动启动一个mcp server，并且将这个server注册到mcp协议中，这样我们就可以在cursor中使用这个server了。
这个server会从npm下载，并且存在一个临时目录中，-y表示自动确认安装。
```json
{
  "mcpServers": {
    "everything": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-everything"
      ]
    }
  }
}
```