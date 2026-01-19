# 题单

## 堆

### 入门
- 2336. 无限集中的最小数字

## 如何阅读一段代码？

### 用「三遍阅读法」训练
不要指望一遍看懂复杂代码，分三步：

1. 找骨架（5 秒）
   - 只问：这段代码在“干什么”
   - 例子：这是循环处理字符串

2. 标路标（30 秒）
   - 给变量/函数打语义标签
   - 例子：`chunkSize` 是块大小，`overlap` 是重叠长度

3. 走流程（2 分钟）
   - 手动模拟执行，验证每一步是否符合预期

### 示例

```js
while (start < text.length) {
  // ... 大段逻辑 ...
}
```

```txt
start=0 → end=30 → 找到 \n 在 12 → 切第一块 → start=2
start=2 → end=32 → 找到 \n 在 12 → 切第二块 → start=2 ← 啊！死循环！
```

### 动手改造 > 被动阅读
不要只读，要改：

```js
// 尝试1：改成按句号分割
const lastPeriod = text.lastIndexOf('.', end);

// 尝试2：加个最大重叠限制
overlap = Math.min(overlap, chunkSize / 2);

// 尝试3：处理没有空格的情况
if (end === start + chunkSize) {
  // 强制截断
}
```
