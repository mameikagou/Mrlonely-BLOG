为什么 Redux 在这个场景下会慢？它的 useSelector 做 diff 还不够吗？

Jotai 的“原子”是怎么解决“依赖追踪”问题的？它和 Recoil 的区别是什么？

React Flow 本身就有 useNodesState，它自己就能做局部更新，你为什么还要引入
Jotai？你是怎么把 Jotai 和 React Flow 的内部状态结合的？

你（真正做过的人）应该这样回答：

React Flow 的 useNodesState 确实能做局部更新，但它是一个**‘黑盒’**。

它的状态（nodes 和 edges）是被**“封装”在 `<ReactFlowProvider>` 内部**的。

痛点： 这导致外部组件（比如“右边的详细信息栏”）很难去“响应式”地监听
useNodesState 的内部变化，也非常难**“从外部去修改”**它。我们只能通过 getNodes()
这种“命令式”的 API 去取，这不 React。

我的方案（Jotai + React Flow）：

我弃用了 useNodesState。

我自己定义了两个全局原子：const nodesAtom = atom([...]) 和 const edgesAtom =
atom([...])。

我把 `<ReactFlow>` 组件变成了**“受控”**组件：
`<ReactFlow nodes={useAtomValue(nodesAtom)} edges={useAtomValue(edgesAtom)} ... />`

（这才是核心！）

画布内（React Flow） 修改节点时，我通过 onNodesChange 回调，调用
setNodesAtom(...) 来更新原子。

画布外（右侧详细信息栏），它也订阅
nodesAtom。当它在输入框里修改了“节点名称”时，它也直接调用 setNodesAtom(...)
来更新同一个原子。

结论： 这个方案，把 React Flow 的**“内部黑盒状态”，“提升”** 成了**“Jotai
的全局原子化状态”。这让画布、左侧列表、右侧详情栏，三个毫不相关的组件，可以“平权”地、“响应式”地去订阅和修改“同一份”节点数据，且互不干扰**，性能最高。”

### 最需要解决的问题就是

Sidebar可能离画布在组件上面很远，总不能层层传递。不好读数据，也不好写数据。

通过jotai就可以实现解耦，自动订阅然后依赖更新。
