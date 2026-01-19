# 常见八股

## 1. JS 有哪些基本类型？判断类型有哪些方式？`Object.prototype.toString` 的原理是什么？

### 标准答法
- 基本类型：`string`、`number`、`boolean`、`null`、`undefined`、`symbol`、`bigint`
- 判断方式：`typeof`、`instanceof`、`Object.prototype.toString`、`Array.isArray`
- `Object.prototype.toString` 基于对象内部 `[[Class]]` 标识输出类型，`Symbol.toStringTag` 可自定义

### 关键点
- `typeof null === 'object'` 是历史遗留问题
- `typeof` 适合原始类型，复杂结构优先用 `toString`/`Array.isArray`

### 追问
- `NaN` 如何判断？
- `instanceof` 的原理是什么？

### 易错点
- `typeof` 无法区分数组/对象

### 扩展/链接
- `Symbol.toStringTag` 的使用场景

## 2. 项目中表格大数据如何优化？

### 标准答法
- 虚拟滚动 + 视口渲染
- 分页或分段加载
- 请求去重与缓存
- 降低组件复杂度（拆分/懒渲染）

### 关键点
- 渲染成本通常比请求成本更高
- 统一行高可简化虚拟滚动实现

### 追问
- 动态行高如何处理？
- 虚拟滚动与分页如何选择？

### 易错点
- 只优化请求不优化渲染
