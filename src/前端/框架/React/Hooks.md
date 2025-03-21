

### Hooks

内部维护一个单向链表, 每个hook对应一个节点, 每个节点包含当前状态、基础状态、更新队列等信息。
```ts
type Hook = {
  memoizedState: any,        // 当前状态（不同的hooks的值存储的内容不同，如 useState 的值、useEffect 的依赖）
  baseState: any,            // 基础状态（用于更新计算）
  baseQueue: Update<any> | null, // 待处理的更新队列
  queue: UpdateQueue<any> | null, // 更新队列（如 useState 的 setState）
  next: Hook | null,         // 指向下一个 Hook
};
```

就是初始化（beginwork）的时候，会创建一个链表，然后每个hook都会创建对应的节点并且追加到链表中；

然后调用的时候，会遍历链表，从中取出节点，然后更新对应的状态；

（他应该按照完全相同的顺序调用， 链表的memorizeState才能正确对应到hooks实例）

```ts
function render() {
  workInProgressHook = fiber.memoizedState;
  nextWorkInProgressHook = workInProgressHook ? workInProgressHook.next : null;
  while (nextWorkInProgressHook) {
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook ? workInProgressHook.next : null;
  }
}
```

#### memoizedState
memoizedState 是一个指针，指向当前的状态值，当更新的时候，会根据这个值来进行更新；

- useState: memoizedState 指向当前的状态值；
- useEffect: memoizedState 指向依赖数组（deps）， 副作用函数（create）， 清理函数（clean）；
```ts
type Effect = {
  tag: EffectTag;    // 标识是否需要执行（如 PassiveEffect）
  create: () => (() => void) | void; // 副作用函数
  destroy: (() => void) | void;      // 清理函数
  deps: any[] | null; // 依赖数组
  next: Effect | null;
};
```

- useRef ref引用的对象
- useMemo/useCallback 缓存的值的数组

##### 其生命周期： 就是初始化的时候会确定链表的顺序，如果是if的话，就会乱；
- 初始化：memoizedState 指向初始值；
- 更新：memoizedState 指向新值；
- 卸载：memoizedState 指向 null；



### 为什么用函数式更新？
因为函数式更新可以保证更新的时候是最新的值，而不是闭包中的值；
```ts
setState(prevState => {
  return prevState + 1;
});
```