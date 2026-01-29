## 微前端

实习涉及了这个，想去研究下原理。



### 文档和基本知识

[京东微前端](https://github.com/jd-opensource/micro-app)

[如何设计实现微前端框架](https://www.yuque.com/zaotalk/posts/dfqyh7)


简单来说，微前端就是把多个web应用聚合在一起，提供统一的访问入口；

给用户的观感就是一个统一的应用，但是背后的实现上可能用到不同的技术栈；

#### 为什么用微前端？

随着业务的增加，各个系统会越来越庞大，从而出现一些问题
- 入口难以寻找。
- 过于庞大，难以维护，构建时间长。
- 技术栈不同（React函数组件类组件， vue2 vue3），代码难以复用。



#### 优点：
- 技术栈无关
- 独立性强
- 状态隔离
    - 要实现js和css的隔离 

#### 缺点：
- 子应用无法获取全局dom，割裂严重
- 应用之间通信困难
- 路由状态难以维护，容易丢失
- 每个spa的白屏加载时间长


有多个方案:
- iframe嵌入url，通信和路由管理比较困难；
- npm




### ReactRouter

一段基于ReactRouter动态导入组件的方案；
```ts
export const AyncComponent: React.FC<{ hotReload?: number; } & RouteComponentProps> = ({ location, hotReload }) => {
    // 子工程资源是否加载完成
    const [ayncLoaded, setAyncLoaded] = useState(false);
    // 子工程url配置信息是否加载完成
    const [subAppMapInfoLoaded, setSubAppMapInfoLoaded] = useState(false);
    const [ayncComponent, setAyncComponent] = useState(null);
    const { pathname } = location;
    // 取路径中标识子工程前缀的部分, 例如 '/subapp/xxx/index' 其中xxx即路由唯一前缀
    const id = pathname.split('/')[2];
    useEffect(() => {
        // 如果没有子工程配置信息, 则请求
        if (!subAppMapInfoLoaded) {
            fetchSubappUrlPath(id).then((data) => {
                subAppMapInfo = data;
                setSubAppMapInfoLoaded(true);
            }).catch((url: any) => {
                // 失败处理
                goBackToIndex();
            });
            return;
        }
        const subappModule = (subAppMapInfo as any)[id];
        if (subappModule) {
            if (subappRoutes[id]) {
                // 如果已经加载过该子工程的模块，则不再加载，直接取缓存的routes
                setAyncLoaded(true);
                setAyncComponent(subappRoutes[id]);
                return;
            }
            // 如果能匹配上前缀则加载相应子工程模块
            // 如果请求成功，则触发JSONP钩子window.wmadSubapp
            currentPrefix = id;
            setAyncLoaded(false);
            const jsUrl = subappModule.js;
            loadAsyncSubapp(jsUrl)
                .then(() => {
                    // 加载子工程完成
                    setAyncComponent(subappRoutes[id]);
                    setAyncLoaded(true);
                })
                .catch((urlList) => {
                    // 如果加载失败
                    setAyncLoaded(false);
                    console.log('loading failed...'); 
                });
        } else {
            // 可以重定向到首页去
            goBackToIndex();
        }
    }, [id, subAppMapInfoLoaded, hotReload]);
    return ayncLoaded ? ayncComponent : null;
};
```

### 架构方案

- 构建时组合：子应用也是主应用的一部分，技术栈有些耦合， 并且打包发布比较慢；

- 运行时组合： 加载比较慢，会引入复杂度；

大多数情况下使用运行时；

### 渲染入口点的问题

- JS Entry（vite使用此入口点, 但是仍然会生成一个html文件）

但是有个问题是，主应用不能保证子应用使用某一容器的特定节点为唯一的标识符，比如这里的root
```js
   // src/main.js
   import { createApp } from 'vue';
   import App from './App.vue';

   createApp(App).mount('#app');
```

```html
<!-- 子应用 index.html -->
<script src="//unpkg/antd.min.js"></script>
<body>
  <main id="root"></main>
</body>
// 子应用入口
ReactDOM.render(<App/>, document.getElementById('root'))
```

- HTML Entry



### 解决方案 qiankun 以及 single-spa
qiankun通过动态加载和路由管理来实现微前端架构，路由切换的时候，它会加载或者卸载应用路由；

还解决了一些single-spa的问题，比如提供了css样式隔离以及js沙箱；

- 隔离css环境 ： shadowDOM隔离
- 隔离js环境：沙箱
- single-spa的缺口： 加载函数，js沙箱，css样式隔离


### 一些名词

#### 静态资源表

它是运行时资源加载的优化工具

指前端构建工具生成的JSON文件，记录所有静态资源，比如js和css等等，还有部署路径和依赖哈希等等
核心特点就是性能优化：
- 扫码源码，依赖追踪，资源去重，树摇（代码层面）
- 按需加载，合并请求（将多个小文件的http请求合并成一个），CDN加速（请求层面）
- 文件压缩，HTTP/2推送、缓存控制（通过url的哈希变化，实现缓存更新）（后面两个是什么东西？） （http层面）

其中url包含哈希用于缓存控制，dep包含依赖的其他文件；
```json
{
  "a.js": {
    "url": "/static/js/a.5f100fa.js",
    "dep": ["b.js", "a.css"]
  },
  "a.css": {
    "url": "/static/css/a.63cf374.css",
    "dep": ["button.css"]
  }
}
```

#### HTTP/2 推送


### 具体细节
proxySandbox流程

就是用一个fakeWindow，当你更改子应用的window对象的时候，都会更改到fakeWindow；

fakeWindow没有的属性，就会去window上找给你；

[图片](./image.png)