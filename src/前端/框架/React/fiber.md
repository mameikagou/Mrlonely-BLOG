React依赖管理：
- 就是无自动依赖追踪，都是手动依赖追踪，然后在setState的时候进行组件级的更新；

## Fiber架构：
哈啰的文章，其实也是一样，很多细节都没讲出来：<https://mp.weixin.qq.com/s/q70TMZ5jJcOCJpHOWndo8A>
卡颂的文章，其实讲的不好，太笼统：<https://react.iamkasong.com/process/reconciler.html>
需要二者结合着看，填充细节；

### React16之后的Fiber架构：
- 调度器: Scheduler，调度任务优先级
    - 放弃浏览器的api，自己实现的`requestIdleCallbackpolyfill`来作为scheduler
    - 有类似于os的那种时间片机制，以此来避免卡顿；
- 协调器： Reconciler 负责找出变化的组件, 打上标签；
    - render阶段（更应该叫Reconcile，协调阶段）
        - 双缓存Fiber 通过alternate指针切换虚拟dom树
        - 收集effect，构建副作用链表（effect list）
        - 放弃递归，使用循环编写，可中断；
- 渲染器： Renderer（不同的环境有不同的render， 比如ReactDom， 比如Native）
    - commit阶段

<https://juejin.cn/post/7184747220036485177>

![React链表](image-1.png)

如上图，其中memoizedState就是我们存放hooks数据的地方。它是一个通过 next 串联的链表。

### Fiber是什么？是React新的架构，也是一种新的协调算法；

React将渲染过程拆解成了一些Fiber节点

Fiber将更新过程拆解成一些小任务，并且采用一定的**优先级管理**，来决定渲染顺序；

### Fiber的结构：

- 作为静态单元来说，储存了ReactElement的节点信息
- 作为动态单元来说，它储存了（本次更新相关的信息）节点的变动tag（增加/删除 操作等等）


### 如何更新dom？

#### 双缓存

比如在canvas中，每一帧都要清理上一帧的内容，并且进行下一帧的绘制；如果其中有比较大的间隙，就会出现白屏；

有的Scheduler和Reconciler都在内存中绘制，绘制完了统一交给渲染器渲染出来；这种方式就叫做**双缓存**；

#### 双缓存Fiber树

当前屏幕显示的是current fiber树，正在内存中的是 workInProgress fiber树； 

二者的fiber节点通过alternate连接

通过current指针的指向，来完成不同fiber树的切换；


### render阶段（Renconciler, 协调阶段）

这或许是fiber架构的设计目标，实现基于优先级的可中断渲染；

performUnitOfWork负责执行单个节点的工作；

在performUnitOfWork中，当有更高优先级的的渲染任务到来时，React可以中断当前任务，将其压入栈中，后续可再恢复到中断的地方继续执行；

```js
const performUnitOfWork=(fiber)=>{

    // 处理当前节点的工作
    beginWork(fiber);

    if(fiber.child){
        return fiber.child;
    }

    let nextFiber = fiber;
    while(nextFiber){
        completeWork(nextFiber);
        if(nextFiber.sibling){
            return nextFiber.sibling; // 处理下一个兄弟节点
        }
        nextFiber = nextFiber.return; // 返回到父节点
    }
    return null; // 完成所有工作
}
```

#### ”递“，处理当前节点的工作，一直到叶子节点；

为遍历到的每个Fiber节点调用**beginWork** 方法。

#### ”归“，

为每个节点调用**completeWork**方法；

如果有兄弟节点，会**优先更新**兄弟节点；如果没有，则return到父节点；

### commit阶段
