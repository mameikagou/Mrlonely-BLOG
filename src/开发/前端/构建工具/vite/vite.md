
## vite
[]: # 
[]: # ## vite的工作原理
[]: # 
[]: # vite的工作原理主要分为两个阶段：开发阶段和构建阶段。
[]: # 
[]: # ### 开发阶段
[]: # 在开发阶段，vite会启动一个本地开发服务器，并使用esbuild进行快速编译和热更新。具体流程如下：
[]: # 
[]: # 1. 启动本地开发服务器：vite会启动一个本地开发服务器，监听指定的端口（默认是3000）。
[]: # 2. 处理请求：当浏览器请求某个模块时，vite会检查该模块是否已经被编译。如果没有，则使用esbuild进行编译，并将编译后的结果缓存起来。
[]: # 3. 热更新：当源代码发生变化时，vite会使用esbuild重新编译该模块，并通过WebSocket将更新通知浏览器。浏览器会根据更新的内容进行局部刷新，而不是整个页面刷新。
[]: # 
[]: # ### 构建阶段
[]: # 在构建阶段，vite会使用Rollup进行打包和优化。具体流程如下：
[]: # 
[]: # 1. 解析依赖关系：vite会分析项目中的所有模块，构建出一个依赖图。
[]: # 2. 打包：vite会使用Rollup将所有模块打包成一个或多个文件，并进行代码分割和优化。
[]: # 3. 输出：vite会将打包后的文件输出到指定的目录（默认是dist）。
[]: # 
[]: # ## vite的优势
[]: # 
[]: # - 快速启动：由于使用了esbuild进行编译，vite可以在几秒钟内启动本地开发服务器。
[]: # - 热更新：vite支持快速的热更新，可以在源代码发生变化时立即反映到浏览器中。
[]: # - 优化构建：vite使用Rollup进行打包和优化，可以生成高效的生产环境代码。
[]: # - 支持多种框架：vite支持Vue、React、Preact等多种前端框架，可以根据需要选择合适的框架进行开发。
[]: #


### 工程化需求

为什么我们需要构建工具？

- 模块化非常多，esm，cjs，amd，cmd，umd等等的兼容；
- 线上代码的质量：生产环境和开发环境的不同，还有浏览器的兼容和安全策略；
- 产物质量：treeShaking, 代码混淆，对低版本进行语法降级
- loader，polyfill, 语法加载(sass)和资源加载(图片等等)
- hmr热更新

关于vite在这些方面更好：
- 基于浏览器原生的esm支持实现模块加载； 在开发和生产环境都能将其他格式的产物（如cjs）转为ESM
- 内置对ts，jsx，sass的支持，也能加载图片
- 使用terser进行代码混淆，使用**Rollup**进行打包（webpack是用他自己实现的），使用**babel**进行代码转译；构建引擎使用esbuild
- 热更新上，no-bundle，webpack是把所有的模块打包，再启动开发服务器；vite则是直接启动开发服务器，然后**按需编译，按需加载**；

注意：no-bundle仅仅针对业务源代码，不针对`node_modules`里面的依赖代码，对于该代码，依然是整体打包的策略；

### 依赖预构建

- 到底做了什么？
    - 分析所有依赖，用Esbuild来打包成一个或几个文件。
    - 将格式转换成ESM格式，然后按需提供源码。
- 对比webpack，则是构建整个项目然后打包到内存中，整个加载。
    - 热更新是通过在内存中重新打包受影响的模块。

使用esbuild来做这个事：（webpack则是自研的引擎）
- 进行格式转换，vite原生支持esm，但是也需要把别的东西转换成esm，通过``<script type="module"><script>``加载
- 打包第三方库的代码，设置强缓存（Cache-Control: max-age=31536000,immutable），（还保存在node_modules/.vite中）


### 双引擎：

一般情况：开发环境是esbuild，生产环境用Rollup

[text](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02910cd2c6894bcdb3a9e0fc9e59f4c2~tplv-k3u1fbpfcp-watermark.image?)


#### 编译上

使用esbuild来替换bible（编译和代码转换）
（tsc和bible都比较慢）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e31ab3a305b54a509471db143d531a10~tplv-k3u1fbpfcp-zoom-1.image)

#### 生产环境上，也要使用Bundle
使用Rollup主要做这些：
- css代码分割，便于缓存复用
- 自动预加载
- 异步chunk优化

### Esbuild
主要在这些阶段发力：`依赖预编译`、`TS 语法转译`、`代码压缩`
快：
- 使用go语言
- 从0编写，不用轮子
- 尽可能复用ast，而不是频繁的解析和传递ast数据


### others

冷启动：冷启动是指项目第一次启动或清除缓存后的启动过程；

二次启动：已经有缓存的情况下再次启动

bible：提前用上esm语法的编译器，可以进行语法降级；语法转换器（jsx也是这样的）

Bundle：只把多个模块打包成一个或者多个文件的过程；一般webpack就是按照这种方式的；而vite按需转换，不打包；



## 插件：
浅析@vite/plugin-legacy 插件实现与配置应用
<https://mp.weixin.qq.com/s?__biz=MzI3OTE3ODk4MQ==&mid=2247487788&idx=1&sn=bdfdeffbe7473a0e3857610a160fbcc7&chksm=eb4aeaa6dc3d63b0f9cc3fca914a1852637bfc2de17f1563acc4a31c3645e343b82e8688ec30&cur_album_id=2126792242496405506&scene=189#wechat_redirect>