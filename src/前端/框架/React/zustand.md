


### zustand特性：

适合用于中大项目中，需要大量更新的地方；
0. 基于订阅发布者模式，实现了类似 "Signal" 的细粒度响应式更新；
1. 将依赖存储在外部，绕过React的生命周期机制，绕过React的虚拟dom diff机制；
2. 仅仅通过forceUpdate()强制渲染，不触发父组件和子组件的渲染流程，独立于React的树形更新机制；

```js
// React Context 的典型更新流程
<Context.Provider value={state}>
  <ChildA />  // 即使只用到 value.a , 但是所有 消费组件 都会重新渲染
  <ChildB />  // 即使只用到 value.b
</Context.Provider>
```

zustand优化之后：

```js
// Zustand 订阅模式
const ChildA = () => {
  const a = useStore(state => state.a) // 仅订阅 a
  return <div>{a}</div>
}

const ChildB = () => {
  const b = useStore(state => state.b) // 仅订阅 b
  return <div>{b}</div>
}
```
当 state.a 变化时，只有 ChildA 重新渲染

当 state.b 变化时，只有 ChildB 重新渲染

3. 流程对比：
```md
传统 React 更新流程:
[State Change] 
  → [触发组件重新渲染] 
  → [Virtual DOM Diff] 
  → [DOM 更新]

Zustand 更新流程:
[State Change]
  → [执行所有选择器]  (选择器基于订阅发布者模式， 更新时会遍历所有选择器)
  → [浅比较过滤变化项] 
  → [仅触发需更新的组件 forceUpdate()] 
  → [直接 DOM 更新]
```

4. 关键设计约束： 不可变更新、保持`useStore`稳定

```js
// 错误示例（直接修改）
setState(state => {
  state.user.name = 'Bob' // 不会触发更新！
  return state
})

// 正确做法（不可变更新）
setState(state => ({
  ...state,
  user: { ...state.user, name: 'Bob' }
}))


// 错误示例（每次渲染新函数）
const user = useStore(state => ({ name: state.name, age: state.age }))

// 正确做法（使用记忆化选择器）
const selectUser = useCallback(state => ({ name: state.name, age: state.age }), []);
const user = useStore(selectUser)
```

5. 浅比较短路原则，仅仅做第一层比较；而且在流程的第一步就比较，如果相同的话，就跳过整个流程； 如果是原生React的话，要生成虚拟dom树，在dom diff中才会比较；

```js
// React 组件更新过程
function Component() {
  const [state, setState] = useState({ count: 0 })
  
  // 即使新值相同也会触发以下流程：
  // 1. 执行组件函数
  // 2. 生成新 Virtual DOM
  // 3. Diff 算法比对
  // 4. 决定是否更新真实 DOM
  return <Child />
}
```

```js
function ConnectedComponent() {
  const slice = useStore(state => state.slice)
  
  // 更新判断前置：
  // 1. 状态变化时立即执行浅比较
  // 2. 不同 → 触发组件重渲染
  // 3. 相同 → 跳过整个渲染周期
  return <Child />
}
```

需要深比较的地方特殊处理

```js
// 自定义比较器示例
const useDeepStore = create((set) => ({...}))

// 在组件中使用深比较
const data = useStore(
  state => state.deepData,
  (oldVal, newVal) => _.isEqual(oldVal, newVal) // lodash 深比较
)
```

#### 设计哲学

- 提前短路原则: 在更新流程的最早期就触发更新，提高效率；
- 订阅发布者模式， 类似 "Signal" 的细粒度响应式更新
- 最小化重渲染原则：仅仅在切片更新的时候触发更新； 与原生的Context API的层连更新形成对比；
- 引用透明性： 任何状态变更必须通过返回一个全新的对象（或不可变数据结构）来触发更新；
在不引入immmer的情况下，不能直接更改对象；

以此来避免深度递归；