
#### useState原理 setState

JSX → Virtual DOM → Fiber → DOM

useState原理
- 闭包保存状态（每次都访问之前的）
- 异步批处理
- fiber调度更新

- 这东西的执行本身是同步的，但是会表现为异步，框架会把多次setState合并进行批处理，从小减少频繁的更新。
- 在setTimeout等等场景是同步的

###### 它会做什么？

- 浅比较、然后建树、在dom中进行diff，然后更新。

触发重新渲染来维护状态

#### useEffect时机

useEffect（浏览器绘制后，异步执行）
```text
首字节时间 → DOM构建完成时间 → CSS加载完成时间(DOM Ready) → 首屏时间 → 页面完全加载
                                                     ↑
                                            useEffect 在这个时机执行
```


useLayoutEffect (DOM 更新后、绘制前，同步执行)



### 面试问题：
- 在 React 中，为什么推荐使用函数式 setState(updater) 而不是对象式 setState(object)？这能解决什么问题？
    - 解决批量更新的时候，访问旧值，而造成的不一致问题

如果你连续调用三次 setState({ counter: this.state.counter + 1 })，React 可能会将它们合并。在这三次调用中，this.state.counter 的值都是一样的（更新前的旧值），所以这三次调用实际上等同于 setState({ counter: 0 + 1 }) 执行了三次，最终结果是 counter 只增加了 1，而不是 3。