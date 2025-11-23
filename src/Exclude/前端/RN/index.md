
前端H5与客户端Native交互原理 - JSBridge
<https://mp.weixin.qq.com/s?__biz=MzI3OTE3ODk4MQ==&mid=2247487727&idx=1&sn=3e19ba5866173117d2bacb997e5789f5&chksm=eb4aeb65dc3d6273a3c4508cd2c46b9dae1e1a664ce58091d44c403d99b742841cfe00ad25d3&cur_album_id=2126792242496405506&scene=189#wechat_redirect>

1. 编译时和运行时

传统RN是运行时解释执行：

```
JS代码 -> JS引擎解释执行 -> Bridge -> 原生组件
```

```
编译后的优化代码 -> 直接执行 -> 原生组件
```

在编译时进行分析
- 静态分析确定依赖关系
- 分包加载，区分基础包和业务包


2. 预编译优化：

- tree-shaking：消除未使用的代码； 精简代码逻辑，代码混淆，消除死代码
- 资源优化：图片压缩、懒加载、按需加载； 样式文件合并压缩；
- 静态分析依赖


3. webview能力，桥能力，框架能力

webview：就原生应用的中加载浏览器的组件

桥JS bridge：JS和原生之间的桥梁，负责JS和原生之间的通信


### Others：

1. rpx：小程序特有的虚拟单位，根据屏幕宽度进行自适应；

rem，根据根元素的font-size进行自适应；


## native层
native层指的是某平台特定的代码实现，负责将js暴露给底层api，通过js来控制底层的原生api；

比如，ios的native代码使用swift编写，安卓使用Java或者kotlin


#### 问题：
- 知道RN的底层原理吗
    - React分包架构，Reactdom是浏览器，native包就是原生
    - 新老架构：https://juejin.cn/post/7095271631689351175
        - Bridge：
            - 维护三套树
                - Shadow thread影子线程，将来自js的ui布局，用一个叫yoga的引擎，换算成native可以理解和运行的代码；
                - js线程。
                - 原生线程，都是通过Brideg的方式进行异步通信。
                    - 而且它还是批处理的，有延迟。
                - 每次传输都要序列化和反序列化，都有延迟。
                - 需要在多个线程中维护 UI 的不同表示（JS 中的组件树、Shadow Thread 中的布局树、Native Thread 中的原生视图。
        - JSI (JavaScript Interface) - “直接调用模型”
            - 轻量级的同步的c++接口，JS 可以像调用一个本地 JS 对象一样，直接调用一个 C++ 对象的方法。
            - 到底做了什么？
                - 允许c++向js运行时挂载一个对象，这个对象的读取和方法调用都会同步触发c++层的对应函数，这就省去了bridge层的异步和序列化开销？
- 能说一下JSBridge具体做了什么吗
    - 就是一个双向通信的桥梁，运行js和原生互相调用。
    - 实现方式：
        - URLSchema拦截，就是前端发起一个特殊的URL请求，使用app预先定好的协议，调用的时候会拦截请求，转换成函数调用原生方法。
        - 全局对象注入：Native在webview中注入一个全局对象，在其中挂载原生方法，就可以像普通js一样调用。
    - Native调用JS：
- 知道hydration吗
能讲一下前端工程化吗

##### 追问
- Yoga 布局引擎是什么？它为什么能让 RN 实现跨平台的 Flexbox 布局？
- 既然 Bridge 是异步的，那如果 JS 需要同步地从 Native 获取一个值（比如设备宽度），这个过程是如何实现的？
- JSI 是如何做到让 JS 直接调用 C++ 方法的？这和传统的 Bridge 有什么本质区别？
- 在新的架构下，React 18 的并发特性（Concurrent Features）是如何与 RN 结合的？


- URL Scheme 拦截和全局对象注入这两种方式各有什么优缺点？
- 如果一个 JSBridge 调用是异步的（比如扫码需要时间），如何设计一个回调机制，让 Native 在完成操作后能准确地通知到 JS？
- 设计 JSBridge 时需要考虑哪些安全问题？如何防止一个恶意的网页随意调用你的 App 的所有原生能力？

