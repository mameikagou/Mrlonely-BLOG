### 使用cursor

#### 使用cursor进行mcp

##### 使用mcp

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

##### AI coding

###### PRD与组件库文档系统化

在项目中创建/Instructions文件夹，存放完整的PRD文档、技术架构图、开发规范、组件库说明（如API接口、UI组件示例等）。

PRD需明确核心功能、交互流程、技术栈（如React+TypeScript），组件库需包含命名规范、使用示例及约束条件。

###### 配置AI的规则和提示词：
cursor 的 `Settings > Rules for AI ` 中，可以设置一些规则，比如：

- 只允许他使用业务中已有的工具函数/组件库用法
- 遵循xxx规范
- 