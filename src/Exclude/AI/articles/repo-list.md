# 一些可以共享的资料

1. 这个是eliza-starter使用的包，发布于2025.1.4日，暂不知用途；
@elizaos/client-direct

<https://www.npmjs.com/package/@elizaos/client-direct>



2. @elizaos/plugin-node
这东西内部封了一个Llama（（Large Language Model Meta AI）是 Meta 开源的大语言模型）
<https://www.npmjs.com/package/@elizaos/plugin-node>

调它的话，会本地下载一个 Hermes-3-Llama-3.1-8B.Q8_0.gguf 文件，这个文件是一个大型的语言模型，用于生成文本。

3. @elizaos/core
elizaos的核心代码，不知道它具体做了什么
<https://www.npmjs.com/package/@elizaos/core>


4. 

@ai-sdk/anthropic - Anthropic AI API的SDK封装
@ai-sdk/google - Google AI相关服务的SDK
@ai-sdk/google-vertex - Google Vertex AI平台的SDK
@ai-sdk/groq - Groq AI平台的SDK封装
@ai-sdk/openai - OpenAI API的SDK封装
@anthropic-ai/sdk - Anthropic官方SDK
@fal-ai/client - FAL.AI平台的客户端SDK

openai - OpenAI官方SDK
together-ai - Together.ai平台的SDK

tinyld - 轻量级语言检测(检测中文英文这种)

"ai": "3.4.33", Vercel 的 AI SDK
```js
// 用于构建AI应用的框架
// 提供统一接口对接多个AI服务
import { OpenAIStream, StreamingTextResponse } from 'ai';

// 使用示例
const response = await OpenAIStream({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello' }]
});

// 支持流式响应
return new StreamingTextResponse(response);
```

"openai": "4.73.0",