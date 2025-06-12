朋友的文章：<https://www.nowcoder.com/share/jump/9858602751596978359>

### 实习产出

##### 批量更新

原子依赖隔离：将高频参数（如 temperature）与低频参数（如 max_tokens）分离。

```ts
const temperatureAtom = atom(0.7);
const maxTokensAtom = atom(1024);
// 仅订阅 temperature 的组件会因该原子变更而更新
批量更新与防抖：使用 jotai/utils 的 debouncedAtom 合并连续操作。
```


```ts
import { debouncedAtom } from 'jotai/utils';
const debouncedTemperatureAtom = debouncedAtom(temperatureAtom, 300);
// 用户连续滑动滑块时，300ms 内仅触发一次模型参数更新
异步状态桥接：通过 atomWithObservable 对接 WebSocket 或 Worker 线程，避免主线程阻塞。
```

```ts
const modelParamsAtom = atomWithObservable((get) => {
  const temperature = get(debouncedTemperatureAtom);
  return fetchModelParamsViaWebSocket(temperature); // 非阻塞通信
});
```

- 用技术关键词强化专业性：

“基于 Jotai 原子化状态管理，实现大模型流式数据的细粒度更新，结合派生状态缓存与异步桥接，将渲染延迟降低 70%。”

- 突出业务价值：

“通过 Jotai 原子作用域隔离多会话窗口状态，支撑 10w+ 并发用户实时交互，内存占用减少 66%。”

- 量化性能提升：

“优化高频参数同步机制，使用防抖原子与批量更新，交互帧率从 12 FPS 提升至满帧 60 FPS。”




##### 数据处理
使用web worker预处理数据，清洗压缩类似的数据，将剩余数据转化成avl tree，从而优化echarts的 api xAxis.axisLabel.formatter 同步阻塞问题；将阻塞时间从3s优化到26ms；
在ECharts 的内部实现是取很多个点，然后取对应的值；


##### 修复bug：
<https://developer.aliyun.com/article/1485634>
一些典型问题：比如if-else判断漏一些可能性，比如老项目的回调地狱，
比如大量的lf-else导致逻辑难以阅读
比如，大量出现的一些状态码，0和1之类的，不知道含义，就用枚举属性以及可以直接阅读大写变量字符串来替换；

再比如null和undefined的使用，在一些地方混用了null和undefined，导致一些字段没传上去，或者一些字段多余传了；

使用幽灵依赖；
大量重复且意义相近难以阅读具体含义的命名，没有随着需求更新和代码更新一起更新的注释，导致代码难以阅读；
还有一些前后端同步开发导致的变量名不一致，一些地方拼错了字段；

混用命名导致了代码混乱
一堆没有写明具体含义的错误的抛出


