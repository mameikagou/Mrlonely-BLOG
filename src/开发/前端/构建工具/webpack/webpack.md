
### webpack 整体生命周期

- 初始化阶段：主要是加载compiler等基础对象以及plugin插件，最终找到entry入口模块
- 构建阶段：从entry开始，
  - 调用loader加载资源
  - 转换成ast语法树
  - 递归遍历所有依赖，构建模块依赖关系图
- 生成阶段：封装chunk模块

### webpack&vite 模块的处理流程（流水线）
- webpack （解析转换依赖优化生成）
 - Entry → Resolve → Load → Transform → Parse → Optimize → Generate → Output
- vite 
 - 开发：Entry → Native ESM → Transform on demand → HMR
 - 生产：Entry → Rollup bundling → Transform → Optimize → Output

### HMR
  - webpack：
    - 先打包，构建一套自己的依赖系统
    - 然后遍历更新的模块及其依赖，列一个变更清单，针对每一个变更发送最新的请求。
  - vite
    - esm原生支持import，所以不用打包。
    - 就启动一个websocket，通过esm故而无需打包，按需取用。文件有变更就通过import按照时间戳去请求最新的文件，然后自己按需编译就行。

### loader
只负责加载，一般都是loader进行Transform工作

### 插件 plugin
涉及全生命周期

包括：
```md
| 插件名称                      | 用途                          | 示例配置                          |
|-----------------------------|-----------------------------|---------------------------------|
| `HtmlWebpackPlugin`         | 生成HTML入口文件                | ```new HtmlWebpackPlugin({ template: './src/index.html' })``` |
| `MiniCssExtractPlugin`      | 提取CSS到独立文件                | ```new MiniCssExtractPlugin()``` |
| `DefinePlugin`              | 定义全局常量                     | ```new webpack.DefinePlugin({ PRODUCTION: JSON.stringify(true) })``` |
| `CopyWebpackPlugin`         | 复制静态资源                     | ```new CopyWebpackPlugin({ patterns: [{ from: 'public' }] })``` |
| `SplitChunksPlugin`         | 代码分割优化                     | 通过`optimization.splitChunks`配置 |
| `TerserWebpackPlugin`       | JS代码压缩                      | 通过`optimization.minimizer`配置 |

**典型场景**：
```js
// 生产环境配置示例
plugins: [
  new HtmlWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css'
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
]
```

```md
| 插件名称                      | 用途                          | 示例配置                          |
|-----------------------------|-----------------------------|---------------------------------|
| `@vitejs/plugin-react`      | React项目支持                  | ```react()```                   |
| `vite-plugin-pwa`           | PWA支持                      | ```VitePWA()```                 |
| `vite-plugin-svg-icons`     | SVG雪碧图优化                  | ```createSvgIconsPlugin({ iconDirs: [path.resolve(process.cwd(), 'src/icons')] })``` |
| `vite-plugin-mock`          | Mock数据服务                  | ```mock({ mockPath: 'mock' })``` |
| `vite-plugin-compression`   | Gzip/Brotli压缩              | ```compression({ algorithm: 'gzip' })``` |
| `vite-plugin-inspect`       | 调试插件中间状态                | ```inspect()```                 

**典型场景**：
```js
// Vite配置示例
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My App'
      }
    }),
    compression()
  ]
})
```
