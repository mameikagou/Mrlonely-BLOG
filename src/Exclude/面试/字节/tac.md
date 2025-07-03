

拷打项目
实习项目
Vue响应式原理
Vue父子组件的生命周期
手撕：实现Vue的Event类，实现它的on、emit、once、off接口
其实就是实现一个全局事件总线EventBus  

事件循环
代码输出题：
``` js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
async1()
setTimeout(() => {console.log('settimeout')})
new Promise((resolve) => {
  console.log('promise')
}).then(res => {
  console.log('promise then')
})
console.log('script end')
```

页面打开的流程
主流的浏览器引擎都有哪些
解析html时遇到script脚本会怎么处理
script标签中带defer或async属性一般会在什么情况下使用
script标签中不用defer或async，想不阻塞DOM的解析该怎么做
http2与http1的区别
怎么做页面性能优化
事件冒泡和事件捕获
事件委托能够解决什么问题
从哪方面去学习的前端知识
未来的规划
为什么选前端，不考虑其他方向
反问