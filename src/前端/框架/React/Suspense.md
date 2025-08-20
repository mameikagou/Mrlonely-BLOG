
## React理念： 代数效应
代数效应：将`副作用`从`函数`中抽离出来
- 计算效应的分离：将程序的"做什么"（纯逻辑）和"如何做"（副作用）分开处理。（hooks，以及Suspense机制）
- 可组合性：允许以模块化方式组合和处理副作用
- 声明式处理副作用：以声明方式定义和处理副作用，而不是命令式（在useEffect中请求，而不是直接请求）
- 续体：可中断，且可以保存当前状态。（Fiber架构，可中断的更新。Suspense"暂停"渲染，等待某些异步操作完成）


#### Suspense

- 说一下React的 Suspense 是干嘛的？
    - 作用就是在加载时候，显示一个默认组件（比如Loading状态），然后等加载完了，再展示加载出来的组件。 属于一种降级的方案。
- 为什么要用 Suspense？以前也能做 loading啊，为什么非得用它
    - 一般的手动设置，是命令式的。
    - 而Suspense不必手动操作，是声明式的。
    - 他是一个包裹组件，
        - 可以避免出现 请求-渲染-请求的这种情况导致的Loading框时断时续的问题。
    - 也可以避免手动设置loading导致的时断时续的问题。

- 既然我们可以封装一个 Loading 组件（传一个 Promise），那为啥还需要 Suspense？
    - 这里我就不扯代数效应那一套很复杂的设计哲学了，我就直说Suspense的设计
        - 他可以实现架构分离，Suspense并不关心具体的Loading状态如何，它实现了关注点分离，只管”请求“和”挂起“，如果请求完毕，就渲染新请求来的组件，如果没有完毕，就渲染fallback降级兜底的组件。
    - 然后它也可以介入react的渲染线程，实现”可中断“的机制，比如当一个组件没有加载完成的之后，它可以中断它的渲染，先使用fallback的组件。等他加载完成了，再来继续执行渲染。

    - 然后，从操作体验上来讲，它不必命令式执行Loading状态，开发负担更小。

#### use() API 与 Suspense实现新的关注点分离以及声明式编程

```ts
// fetchUser(id) 返回一个经过缓存处理的 Promise
function UserProfile({ dataPromise }) {
  // 1. use() 会尝试读取 Promise
  // - 如果 pending, 它会“抛出”Promise, 暂停渲染
  // - 如果 resolved, 它会返回值
  // - 如果 rejected, 它会抛出错误
  const user = use(dataPromise);
  return <h1>{user.name}</h1>;
}

// Page.js
import { Suspense } from 'react';

function Page({ id }) {
  // 注意：这里的 fetchUser 需要做缓存，避免每次渲染都重新请求
  const dataPromise = fetchUser(_with_cache_)(id);

  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <Suspense fallback={<Spinner />}>
        <UserProfile dataPromise={dataPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
```


#### 追问
好的，基于你对这些问题的回答，我会继续深入考察：
关于性能优化：你提到了 useCallback，在什么场景下 useCallback 的滥用反而可能导致性能变差？React.memo 的第二个参数（areEqual function）你在什么场景下会使用它？它有什么潜在的坑？
关于 Suspense：Suspense 和传统的 ErrorBoundary 有什么异同？它们可以协同工作吗？如果可以，一个典型的嵌套顺序是怎样的，为什么？
你提到了 use hook，它和 useEffect + useState 的数据请求方式相比，除了代码写法更简洁，在组件的生命周期和数据请求时机上，有什么本质的不同？
如果一个 Suspense 边界内有两个子组件都挂起了，Suspense 会等待两个都完成后再显示内容。如果我希望其中一个完成后就先显示出来，另一个继续 loading，应该如何设计组件结构？
Suspense for Data Fetching 目前在客户端还不是开箱即用的，需要框架（如 Next.js）或库（如 Relay）的支持。你知道其底层实现原理是什么吗？为什么一个普通的 fetch Promise 不能直接触发 Suspense？（提示：Promise 的状态）