

React Portal 中的事件冒泡，会沿着 React 组件树向上进行，而不是真实 DOM 树。

React 通过维护自己的合成事件系统和组件树结构，屏蔽了底层 DOM 的物理结构差异，保证了开发者心智模型的统一。


#### 面试官视角追问：


- 既然你了解事件冒泡会沿着 React 组件树，那么如果我在 <body> 上用 addEventListener 监听一个原生点击事件，Portal 里的点击会触发它吗？触发顺序是怎样的？（提示：这涉及到 React 合成事件和原生事件的执行顺序）

    - 这里只用react17之后的情况，在react17之前，React的事件是绑定在document上，这种设计容易出现
        - 在react17之后，事件绑定在react的根节点上，这种设计更适合portal以及微前端的场景。
        - `e.stopPropagation()`会阻止所有的事件冒泡。
        - 在react17之后，会挂在React的根节点上。

    - 它在react组件树上冒泡，所以会触发。
        - React的根节点监听器是一个队列，只是把更新推入了队列里面。
        - 执行顺序依然是先执行原生事件，再执行React的合成事件。
        - 


你提到了 react-markdown 的原理。如果让你自己实现一个简化版的 MarkdownRenderer，你会如何设计 Token 到组件的映射关系？如何处理嵌套的 Markdown 语法，比如 **加粗的链接？