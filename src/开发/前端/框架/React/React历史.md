

#### React16 React 17 和 React 18 的新特性

- React16
    - 引入fiber架构，通过最小工作单元的模式，实现可中断渲染。

- React17，”没有新特性“
    - 新的jsx编译转换，跟Babel合作，不再需要手动引入React。
    - 新的事件委托，到DOM容器，而不是根节点。
        - 不会再出现微前端架构下，事件系统进行打架的情况。
    - useEffect的return从同步改成异步。

- React18 并发特性 (Concurrent Features) 的正式落地。
    - 使用createRoot来区别于render，开启并发模式。
    - 支持并发和就是可中断渲染，事件有了优先级，优先响应用户输入。
    - Transitions，不紧急的事件
    - Suspense，讲太多了
    - 新Hooks
        - useId，生成稳定的id，避免出现SSR场景下，服务端和客户端不稳定。
        - useSyncExternalStore: 用于帮助外部状态管理库（如 Redux, Zustand）安全地接入 React 的并发渲染。
        - useInsertionEffect: 一个新的生命周期 Hook，主要给 CSS-in-JS 库使用，用于在 DOM 变更前同步地插入样式
        - use() api，可以解包Promise。