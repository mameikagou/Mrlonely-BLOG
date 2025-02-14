
[TOC]

# 无关平台的SDK核心方法

## 分两种，一个是主动埋点，一个是自动监控

### 主动埋点

功能点：

1. 手动上报，比如主动给按钮点击的时候添加上报事件，上传监控数据；

实现方式的话，可以用封装函数类直接调用

但是没法使用装饰器

domo:
```js
class Track {
    async buttonClick(eventname){
        // 添加上报逻辑
    }
}

// 调用方式是：
const onHandleClick=()=>{
    Track.buttonClick('xxxEvnet')
    // 其他的的点击逻辑
}
```
在React中，函数组件偏多，没法直接使用装饰器，所以推荐使用封装钩子的形式

```tsx
// 创建统一的埋点Hook
const useTracking = () => {
    const trackEvent = useCallback((eventName: string, params?: Record<string, any>) => {
        // 实际的埋点逻辑
        fetch('/api/track', {
            method: 'POST',
            body:
        });
    }, []);

    return { trackEvent };
};

// 创建可复用的埋点组件
const TrackButton: React.FC<{
    eventName: string;
    params?: Record<string, any>;
    onClick?: () => void;
    children: React.ReactNode;
}> = ({ eventName, params, onClick, children }) => {
    const { trackEvent } = useTracking();

    const handleClick = () => {
        trackEvent(eventName, params);
        onClick?.();
    };

    return (
        <button onClick={handleClick}>
            {children}
        </button>
    );
};
```

应用场景：c端中，监控用户喜好的行为

#### 参考文档

https://github.com/xl-xueling/xl-lighthouse


### 自动监控

代码报错、性能数据、页面录屏、用户行为、白屏检测

参考：https://github.com/clouDr-f2e/monitor




## core包 

- subscribe.ts：发布，订阅
- breadcrumb.ts：面包屑, 监控用户行为
- errorId.ts：错误监控
- performance.ts：性能监控
- blankScreenDetector.ts：白屏监控
- Custom.ts：自定义事件类型监控，手动上报

### subscribe

订阅发布模式
```ts
// 使用一个map来管理事件
const eventMap = new Map<string, Function[]>();

// 订阅事件
const subscribe = (eventName: string, callback: Function) => {
    const callbacks = eventMap.get(eventName) || [];
    callbacks.push(callback);
    eventMap.set(eventName, callbacks);
};
```

### breadcrumb
面包屑，监控用户行为路径

比如： 进入首页 -> 点击二级页面跳转 -> 点击按钮


### BlankScreenDetector

白屏监控, 基于检查页面基本元素是否存在，来判断是否白屏

比如html、body等

### performance

使用Performance API

### 事件类型：

```tsx
/**
 * 重写的事件类型
 */
export enum eventType{
// 网络请求
  XHR = 'xhr',
  FETCH = 'fetch',

//  调试信息收集（CONSOLE）
  CONSOLE = 'console', 

// 页面信息收集（DOM），通过事件委托或重写 addEventListener 实现
  DOM = 'dom',

// 监控history.pushState、replaceState 等等，监控页面路由变化
  HISTORY = 'history',

// 监控错误，捕获未被 try-catch 捕获的 JavaScript 错误， 通过window.onerror 或 ErrorEvent 监听实现
  ERROR = 'error',
// 监听url哈希变化， 通过window.onhashchange 事件监听
  HASHCHANGE = 'hashchange',
// 监控未被处理的Promise拒绝，通过window.onunhandledrejection 事件监听
  UNHANDLEDREJECTION = 'unhandledrejection',
// 监控Vue框架的错误，通过处理机制监听
  VUE = 'Vue',
  }
```

