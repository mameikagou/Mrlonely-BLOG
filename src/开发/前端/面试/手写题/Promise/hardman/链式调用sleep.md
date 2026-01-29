
<https://blog.51cto.com/u_15808854/9014473>
实现一个类，其实例可以链式调用，他有一个sleep方法，可以sleep一段时间后再后续调用
```js
const boy = new PlayBoy('Tom') boy.sayHi().sleep(1000).play('王者').sleep(2000).play('跳一跳') 
// 输出 
// 大家好我是Tom 
// 1s 之后 
// 我在玩王者 
// 2s 之后
// 我在玩跳一跳
```