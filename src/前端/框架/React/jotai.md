

特性：

- 细粒度的依赖追踪，无需手动声明依赖; 在内部会维护一个依赖图， 底层通过全局Store维护状态，配置监听器；
- 直接通过原子依赖同样的跳过虚拟dom，直接进行最小粒度的更新；
- 支持异步,(zustand要手动处理， context要结合外部库比如swr)
- 作用域隔离，通过`Provider`和`Scope`隔离原子状态，适合微前端以及同一页面渲染多个独立组件的情况


### 组合派生，依赖追踪自动更新

优势：
- 避免父组件更新的时候，所以子组件都触发渲染，即使它没有依赖变化的状态，也没有改变；
- 可以避免层级依赖，一层一层传递；比如下文中，组件b和c的状态依赖于a，但是他们无需作为a的子组件来传props；

天然支持跨组件通信，组合派生状态的使用场景；
```JS
// 组件 A 中定义原子
const countAtom = atom(0);
const CounterA = () => {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(count + 1)}>A: {count}</button>;
};


// 组件 B 派生状态,组件 B 可以直接引用 countAtom，并派生出双倍值：
const doubledAtom = atom((get) => get(countAtom) * 2);
const DisplayB = () => {
  const [doubled] = useAtom(doubledAtom);
  return <div>B: 双倍值 = {doubled}</div>;
};


// 组件 C 进一步派生, 组件 C 可以进一步基于 doubledAtom 生成平方值：
const squaredAtom = atom((get) => get(doubledAtom) ** 2);
const DisplayC = () => {
  const [squared] = useAtom(squaredAtom);
  return <div>C: 平方值 = {squared}</div>;
};
```

对比传统：
```js
// 父组件维护状态，通过 Context 传递
const App = () => {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      <CounterA />  // 子组件触发更新
      <DisplayB />  // 孙组件显示双倍值
      <DisplayC />  // 曾孙组件显示平方值
    </CountContext.Provider>
  );
};

// 子组件需逐层获取 Context
const DisplayB = () => {
  const { count } = useContext(CountContext);
  const doubled = count * 2; // 每次父组件更新都会触发重渲染
  return <div>B: {doubled}</div>;
};
```

### 实现原理
<https://www.paradeto.com/2023/10/30/jotai/>

也是基于订阅发布者模式，用类似“信号”机制的方式，

也是跳过虚拟dom的批量diff的，通过原子依赖的精准更新；



