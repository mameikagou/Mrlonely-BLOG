### JSX JSX 最终会被编译成什么？

- React 17之前，转换成React.createElement函数调用
    - 然后转化成React对象，进行虚拟dom的diff，然后高效更新页面。
- React 17之后，跟babel结合，不再需要在顶层声明React