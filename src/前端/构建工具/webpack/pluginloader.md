
## 如何扩展 Webpack？
- Loader 主要是将资源内容翻译成webpack可以理解和处理的js代码
- Plugin 深度介入 Webpack 构建过程，**重塑** 构建逻辑
    - 它代表了初始化到资源输出的各个生命周期阶段

https://rspack.rs/zh/api/plugin-api/compiler-hooks

### 常见钩子：

`compiler.hooks.emit` 时机是，webpack完成构建和打包之后，在把内容发送到输出目录之前。

### Tapable
就发布/订阅模式
Tapable事件流程很简单：
创建钩子实例、注册回调、触发回调、运行结果

#### Hooks

- SyncHook 同步hook，就按照注册顺序依次调用回调
- SyncBailHook 同步熔断钩子 ：`bail` 类型钩子的特点是在回调队列中，若任一回调返回了非 `undefined` 的值，则中断后续处理，直接返回该值，

### loader