


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