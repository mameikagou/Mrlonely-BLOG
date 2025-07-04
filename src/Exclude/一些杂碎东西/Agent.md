

#### AI搜索
AI搜索三个场景：
 -基于知识库的小AI问答，一般是离线的，往往针对某个领域的知识库进行特化。
 -基于文档平台作为知识库的深度搜索AI
    -分两块：普通搜索、AI搜索；
        -AI搜索通过用户信息，去召回跟他的query相关的他的部门的文档和聊天记录；
        -然后通过这些召回的文档和记录，
        -使用AI来理解他的意图，并构建Prompt，来向AI查询。
            - 这里是Prompt包括设计搜索规划，然后对其中相关性最高的几篇进行处理。
        -输出结果以及召回的文档索引（可以点进文档以及聊天记录）
 -基于聊天记录进行整合的AI（支持通过点击打开上下文）

#### MCP
本质是上下文管理协议：既是工具协议，也是上下文协议。拥有上下文感知能力。
- 统一格式，所有交互结构化
- 上下文管理，维护对话历史

- 能力拓展
- 多模态支持
- 上下文感知
    - 意图识别与工具触发
    - 各种维度的上下文：
     - 工具链
     - 参数
     - 环境

- 主动发现以及主动推送资源
- 复杂交互：涉及多轮对话和状态管理
    - 智能选择工具
- 动态资源：资源列表需要实时生成
- MCP 不是 HTTP 的替代品，而是在需要智能化、上下文感知、个性化交互的场景下的更好选择



##### MCP只是个协议，实现了客户端都能用


```json
// 工具列表请求
{
  "jsonrpc": "2.0",
  "id": "req-1",
  "method": "tools/list",
  "params": {}
}

// 服务器响应
{
  "jsonrpc": "2.0",
  "id": "req-1",
  "result": {
    "tools": [
      {
        "name": "getPlugDocs",
        "description": "当用户要求使用plug组件库进行开发时...",
        "inputSchema": {
          "type": "object",
          "properties": {
            "componentNames": {
              "type": "array",
              "items": { "type": "string" }
            }
          }
        }
      }
    ]
  }
}

// 工具调用请求
{
  "jsonrpc": "2.0",
  "id": "req-2", 
  "method": "tools/call",
  "params": {
    "name": "getPlugDocs",
    "arguments": {
      "componentNames": ["Button", "Input"]
    }
  }
}

// 工具调用响应
{
  "jsonrpc": "2.0",
  "id": "req-2",
  "result": {
    "content": [
      {
        "type": "text",
        "text": "# Plug React Component Documentation\n\n## Button\n\n..."
      }
    ]
  }
}
```