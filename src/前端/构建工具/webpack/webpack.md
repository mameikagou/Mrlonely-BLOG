

### loader
只负责加载

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
