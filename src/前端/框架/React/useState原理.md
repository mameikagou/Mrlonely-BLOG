
#### useState原理

JSX → Virtual DOM → Fiber → DOM

useState原理
- 闭包保存状态（每次都访问之前的）
- 异步批处理
- fiber调度更新

触发重新渲染来维护状态

#### useEffect时机

useEffect（浏览器绘制后，异步执行）
```text
首字节时间 → DOM构建完成时间 → CSS加载完成时间(DOM Ready) → 首屏时间 → 页面完全加载
                                                     ↑
                                            useEffect 在这个时机执行
```


useLayoutEffect (DOM 更新后、绘制前，同步执行)
