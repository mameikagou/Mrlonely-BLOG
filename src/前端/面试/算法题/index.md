# 题单


## 堆

### 入门
2336.无限集中的最小数字




### 如何阅读一段代码？

1️⃣ 用「三遍阅读法」训练
不要指望一遍看懂复杂代码，分三步：

第一遍：找骨架（5秒）
while (start < text.length) {
  // ... 大段逻辑 ...
}
→ 只问：这是循环处理字符串的

第二遍：标路标（30秒）
chunkSize → 块大小
overlap → 重叠长度
lastIndexOf('\n') → 找换行
slice(start, end) → 截取片段 → 给每个变量/函数打语义标签

第三遍：走流程（2分钟）
拿笔模拟执行：
start=0 → end=30 → 找到\n在12 → 切第一块 → start=2
start=2 → end=32 → 找到\n在12 → 切第二块 → start=2 ← 啊！死循环！
💡 关键：把代码当「故事」读，而不是当「文字」读


3️⃣ 动手改造 > 被动阅读
不要只读，要改！

比如对这段代码：
// 尝试1：改成按句号分割
const lastPeriod = text.lastIndexOf('.', end);

// 尝试2：加个最大重叠限制
overlap = Math.min(overlap, chunkSize / 2);

// 尝试3：处理没有空格的情况
if (end === start + chunkSize) {
  // 强制截断
}
