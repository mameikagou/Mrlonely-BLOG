



## 服务端渲染SSR

react-dom/server
```js
// 服务端代码
import { renderToString } from 'react-dom/server';

// 将 React 组件渲染成 HTML 字符串
const html = renderToString(<App />);
```

只渲染页面，不添加交互和API；

客户端水合(Hydration) 过程就是给渲染出的模版添加交互的过程；
其中包括：保持原本的dom结构，添加事件处理，应用浏览器api

```js
// 客户端水合
hydrateRoot(document.getElementById('root'), 
  <button onClick={() => alert('clicked')}>
    Click me
  </button>
);
```

