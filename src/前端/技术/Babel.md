


Babel的核心：Babel 的核心能力是**语法降级**，以适配老的浏览器，通过操作 AST（抽象语法树）完成代码重构；


### 语法降级 与 Babel流程
语法降级的本质是：AST驱动的代码重构

parse 生成 ast，transform 对 ast 进行转换，generate 打印 ast 成目标代码并生成 sourcemap

流程：
parse: 解析，构建语法树
transform: 转换，增加/改动/删除节点；
generate: 生成，将修改后的AST转化目标代码；


### babel于polyfill的区别

babel仅仅指语法降级，比如var，const以及管道符，可选链操作符等等

polyfill指提前使用不存在的api，比如`Array.prototype.includes`

### 一些概念

- ESNext: 下一代ECMA标准，一般通过babel提前使用上下一代标准的语法，比如顶层await等等；
- Flow： Facebook开发的js静态检查工具，类似于ts，但是实现方式更轻量；


- source map: 便于调试映射，就是在浏览器可以映射到源代码，而不是打包压缩混淆后的 min.js

开发环境，webpack配置
```js
module.exports = {
  devtool: 'source-map', // 生成完整的 Source Map
  // 其他选项：'eval'（最快）、'cheap-module-source-map'（折中）
};

```