

##### 事件循环

[事件循环](前端/基础系列/image2.png)

就维护一道宏任务队列和微任务队列就行。

await的行为是把它后面的东西都放到微任务队列中去，resolver之后的then也同理；

script start
async1 start
async2
promise1
script end
async1 end
primise2
setTimeout


##### 事件循环和raf，raf在浏览器渲染的哪个阶段？以及这东西跟raf的区别是？

raf不属于任何一个阶段，在所有阶段之前执行。 60hz，16ms。

每一帧的执行阶段：
    - 处理输入事件：如 click, scroll, wheel 等。
    - 执行定时器：检查并执行到期的 setTimeout 或 setInterval 回调（作为宏任务）。
    - 开始一帧的渲染：
        - raf回调
        - 样式计算（Style）
        - 布局（Layout）
        - 绘制（Paint）
        - 合成（Composite）

10.   追问：requestAnimationFrame是否了解？执行时机是什么？微任务队列清空后还有空闲会干什么？一帧时间会执行几次宏任务和微任务？
    - 在一帧的空闲时间里会去执行requestIdleCallback
    - 一帧时间会执行几次宏任务和微任务？
        - 微任务无限，宏任务可能1次可能0次