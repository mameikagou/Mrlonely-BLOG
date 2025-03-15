

<https://www.nowcoder.com/feed/main/detail/445d92ba462e42138a92aa989a034b76?sourceSSR=search>

1. 正则表达式
2. Proxy方法
3. es新特性代替hasOwnProperty
4. promise.all
5. 大数相加
6. 二叉树后序遍历


八股：
5. Monorepo的实现及其多种工具的组合有了解吗？有总结出一个最佳实践吗？

我的回答：
- 已有的老项目项目，使用lerna + yarn的workplace进行升级
- 大一点的项目，使用pnpm+nx，优势是：任务图并行构建，缓存，依赖图（生态比较强， 适合企业级）
- 一些中小型项目，使用pnpm workspace + turborepo：管道配置、手动管理依赖，也有单独构建能力

6. 组件库是Monorepo的，那组件的构建是如何处理的？能做到单个组件的更新吗？

- 使用`turbo`进行增量构建，只构建有变更的组件
使用 `nx affected:build` 或 `turbo run build --filter=package-name`，仅构建受代码变更影响的组件及其依赖链26。

7. 如何处理开发过程中组件间相互依赖的问题呢？（Monorepo部分答得都不好，应该是挂的主要原因）
比如使用nx直接看依赖图：nx dep-graph

我的回答：
- 构建中间层 a <-> interface <-> b
- “单向数据流” 将a、b都依赖c，通过c进行交互

8. vite有做过相关插件的开发吗？

需要去做个简单的

9. vite为什么快，体现在哪些地方呢？

- vite进行冷启动，然后通过http请求获取模块，按需编译，按需加载；而webpack是全量打包，然后启动开发服务器；

- webpack是全量打包然后更新，但是vite是分批的，通过`<script type="module">`的方式直接加载模块，每个模块通过http请求按需引入；

同时错误处理方面，vite对单个页面拥有错误隔离的能力，不会影响其他页面的运行；而webpack是全局错误，其他页面也打包失败；

- 基于ESbuild进行依赖预构建
- 依赖使用强缓存 cache-control，源码使用协商缓存
- vite的热更新的no-Bundle的，仅仅更新变化的模块及其依赖
- I/O 上，读取会有缓存优化，而webpack是每次都会重新读取

10. vite依赖的esm，如果遇到不支持esm的环境，vite是如何处理的？

不就通过Esbuild转化成esm吗