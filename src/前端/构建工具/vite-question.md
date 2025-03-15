

#### 为什么vite更快
- 第一次启动是冷启动
- webpack是全量打包然后更新，但是vite是分批的，通过`<script type="module">`的方式直接加载模块，每个模块通过http请求按需引入；

（通过http2的多路复用并行导入）

同时错误处理方面，vite对单个页面拥有错误隔离的能力，不会影响其他页面的运行；而webpack是全局错误，其他页面也打包失败；

- 基于ESbuild进行依赖预构建，将umd/amd/cjs各种模块转为esm，并且合并多个子模块为一个模块，减少请求次数；
Esbuild使用go语言实现的，语言天然相比于js工具更具有性能优势；

- I/O 读取会有缓存优化，而webpack是每次都会重新读取

- vite的热更新仅仅通过`websockets`，只更新有变化的模块，而webpack是全量更新；

- 缓存上，对依赖强制强缓存，对源码使用协商缓存；


#### 如何处理不支持esm的环境？

开发环境使用Esbuild：
- Esbuild依赖预构建，转化成esm；
- 动态导入的polyfill降级机制，比如`@vitejs/plugin-legacy`插件；

生产环境使用Rollup：
进行全量降级以及polyfill注入