

- useLayoutEffect 阻塞渲染，阻塞的是浏览器渲染流程中的哪一个环节?
    - 首先说明React流程跟浏览器流程的关系，React流程都在浏览器之前。
    - useLayoutEffect 通过在“DOM更新完成”和“浏览器绘制”之间