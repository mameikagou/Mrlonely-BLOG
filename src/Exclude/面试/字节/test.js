setTimeout(() => {
	console.log(1);
}, 0);
Promise.resolve()
	.then(() => {
		console.log(2);
	})
	.then(() => {
		console.log(3);
	});
new Promise((resolve) => {
	console.log(4);
    // 即使有耗时循环，JS线程也不会被中断（事件循环被阻塞直到同步代码执行完毕）
	for (let i = 0; i < 10000; i++) {
		if (i === 9999) {
			resolve();
		}
	}
	console.log(5);
}).then(() => {
	console.log(6);
});
console.log(7);

// 宏任务1：
// 宏任务队列：()=>1, 
// 微任务队列：()=>2(3等待2返回才会加入), ()=>6
// 输出：4 5 7 (顺序上下文， 最初的宏任务)

// 微任务1
// 宏任务队列：()=>1
// 微任务队列：()=>3(输出2的时候加入),
// 输出：2，6

// 也是微任务1，上文中新加了一个
// 宏任务队列：()=>1
// 输出：3

// 宏任务2
// 输出1