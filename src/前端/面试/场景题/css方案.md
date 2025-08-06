

- 使用post-css，将ps转化为rem；


固定转一定圈数，然后根据后端返回的结果，映射一下转的剩余角度。

will-change: transform, opacity;

“SSR 是如何影响你的 CSS 加载策略的？有没有遇到过样式闪烁（FOUC）的问题？”

- 就是先加载html资源，再请求css就会出现这个。style标签嵌进去就不会。