

## 自我介绍

惯例的开局讲实习经历，聊实习，聊项目，吧啦吧啦；

反正就一直听我讲我的前端经历；

## 八股

1. SSE（Server-Sent Events）和 WebSocket 的区别以及优缺点

2. 在AI项目中，SSE如何实现的ai的那种“打字机”的效果

就一个token一个token传呗

3. tcp协议用了哪些手段来保证可靠性的？

- 三次握手，四次挥手
- 序列号
- 拥塞控制
- 滑动窗口
- 超时重传


4. react在代码层面的优化

- memo，useCallback，useMemo
- jotai
- suspense，lazy
- 短路返回
- etc，别的不知道了

5. memo为什么能优化：

- diff算法的浅比较啊

6. （简历里面的）讲讲双token刷新机制

为什么用jwt token，它跟cookie以及session的区别

新旧token的刷新机制，以及分别是做什么的？

（这里其实是在问服务端，确实寄了，不会）

7. node进程挂了，服务不可用，要如何处理

（完全不会）

8. SSR，（快速吟唱，这个太熟了）相关的

为什么服务端组件不能存localStorage？

这里扯了一点React原生的服务端组件，然后扯到next上面了，然后扯水合；

9. 实习经历，讲CICD，照着讲就是了

10. topK的问题
然后问我堆的结构，时间复杂度，要插入一个元素的话，怎么插

11. 算法题，临时出的，有点类似于wxg的文件树

```js
// 给定一个具有父子层级关系的数组，数组中每项都有字符串类型id和数组 children字段(如下定义)，
// 要求实现一个process方法，对其进行处理，
// 给每一项都增加parentId和path字段，
// 其中parentId表示其父元素id，path为一个数组，
// 包含了从根节点到当前节点的路径

let arr = [
	{
		id: "1",
		children: [
			{
				id: "1-1",
				children: [
					{
						id: "1-1-1",
					},
				],
			},
		],
	},
	{
		id: "2",
		children: [
			{
				id: "2-1",
				children: [
					{
						id: "2-1-1",
					},
				],
			},
		],
	},
];
```