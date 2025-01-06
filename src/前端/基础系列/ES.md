## ESM和CJS的区别

1, 异步/同步加载

2，动态性
```js
// CommonJS - 运行时加载
if (condition) {
    const module = require('./module')  // 可以
}

// ESM - 静态加载
if (condition) {
    import module from './module'  // 错误！
}

// ESM 动态导入
if (condition) {
    import('./module').then(module => {  // 正确
        // 使用 module
    })
}
```

3，this的值
```js
// CommonJS
console.log(this)  // {} (模块对象)

// ESM
console.log(this)  // undefined
```

4，循环依赖问题

关键区别：
```js
// CommonJS
// 1. 同步加载和执行
// 2. 可能得到未完成的导出
// 3. 模块导出是值的拷贝

// ESM
// 1. 先解析所有导入导出，再执行代码
// 2. 模块导出是引用
// 3. 保证导出值的正确性
```

```js
// a.js
console.log('a.js 开始执行')
const b = require('./b')  // 2. 执行 b.js
console.log('b 的值:', b)
module.exports = {
    foo: 'a',
    say: () => console.log('a说话')
}
console.log('a.js 执行完毕')

// b.js
console.log('b.js 开始执行')
const a = require('./a')  // 3. 返回未完成的 a 的导出
console.log('a 的值:', a)  // 4. {} (空对象)
module.exports = {
    foo: 'b',
    say: () => console.log('b说话')
}
console.log('b.js 执行完毕')

// 执行顺序：
// 1. a.js 开始执行
// 2. 遇到 require('./b')，转去执行 b.js
// 3. b.js 执行，遇到 require('./a')
// 4. 由于 a.js 还未执行完，返回未完成的导出（空对象）
// 5. b.js 继续执行完成
// 6. 返回 b.js 的导出到 a.js
// 7. a.js 继续执行完成
```

```js
// a.js
console.log('a.js 开始执行')
import { b } from './b'
console.log('b 的值:', b)
export const a = 'a'
console.log('a.js 执行完毕')

// b.js
console.log('b.js 开始执行')
import { a } from './a'
console.log('a 的值:', a)
export const b = 'b'
console.log('b.js 执行完毕')

// ESM 的处理：
// 1. 首先解析所有导入和导出语句
// 2. 创建模块环境和绑定
// 3. 求值模块代码
// 4. 如果遇到循环依赖，会保持引用的正确性
```