
别人的简历原文：
(https://www.nowcoder.com/discuss/533796999712239616?sourceSSR=users)

重构的质量：

1. 测试
测试，自动化测试
CI、CD集成化测试
配置git hooks

测试为导向的重构，先编写测试，准确定义功能行为；在重构过程中持续运行测试，确保功能不被破坏；

深入理解业务逻辑，理解每一个接口的预期行为，以及经过了哪些处理，在重构的过程中，确保每个功能的行为都符合预期；

Chrome的lighthouse测试；

自己使用performance api来测试

2. 白屏检测：
windows.error

promise的unhandledrejection

performance api：
- 资源加载时间（css。js）
- fcp，首次渲染时间；LCP（Largest Contentful Paint）：最大内容渲染时间；

```ts
// 获取所有 Paint 条目
const paintEntries = performance.getEntriesByType('paint');

// 提取 FP 和 FCP
const fpEntry = paintEntries.find(entry => entry.name === 'first-paint');
const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');

console.log('FP:', fpEntry.startTime, 'ms');
console.log('FCP:', fcpEntry.startTime, 'ms');



const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach(entry => {
    console.log(`[${entry.name}] 时间: ${entry.startTime}ms`);
  });
});

// 监听 paint 类型的性能条目
observer.observe({ type: 'paint', buffered: true });
```
