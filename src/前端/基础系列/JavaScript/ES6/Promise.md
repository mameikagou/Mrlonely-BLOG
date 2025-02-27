

## 基本特性
使用then来解决“地狱回调”问题

区别于事件，Promise除了pending之外，只有两种状态：

`fulfilled`和`reject`, 这两个都属于`resolve()`, 而且一旦改变了，就不会再次改变；

当Promise创建的时候会被立刻执行，无法中途取消；

Pending的时候，无法得知是刚刚开始还是即将完成；

## Promise.prototype.then()
这也意味着它是从原型继承，每一个Promise对象都有的方法；

前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。

## Promise.resolve()

如何实现resolve:
```ts
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

对拥有then方法的对象，直接执行它的then方法, 对没有then方法的对象，返回Promise包裹的实例

立即resolve的对象，是在本轮事件循环结束时执行，而不是下一轮开始时；

```ts
setTimeout(()=>{
    console.log('three');
},0)

Promise.resolve.then(()=>{
    consoloe.log("two")
})

console.log('one');
// one
// two
// three
```

## Promise.race()

将多个Promise实例包装成同一个，返回最先`resolve()`的那个

实现：
```ts
// forEach不支持await，不过也无所谓了

function PromiseRace(promises){
    return new Promise((resolve, reject)=>{
        promises.forEach((promise)=>{
            Promise.resolve(promise).then(resolve,reject) // 使用promise来兼容非Promise对象
        })
    })
}
```