

### 浏览器和Node环境有什么区别？

- 本质是执行环境不同，所以不同环境的API也不一样。
    - 比如document对象，window对象这些在node中都没有
    - node中主要是IO操作相关的，比如说操作系统os、路径模块path、进程管理process等等
- cjs和esm
    - 浏览器原生支持esm
    - node还是在从cjs往esm过渡