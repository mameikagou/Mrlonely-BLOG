
#### Object.create 和 new

```js
const objectCreate=(proto)=>{
    function func(){}

    func.prototype = proto;
    // new的作用，就是基于构造函数的prototype，构造新对象。
    return new func();
}
```

#### new的时候会发生什么？

新创建的对象的__proto__会指向构造函数的prototype

obj.__proto__ = MyFunction.prototype

创建、链接、绑定this到新对象、判断返回值

```js

const new2 = (constructor, ...args) => {
    // 第 1 步 和 第 2 步：创建一个新对象，并链接好原型
    const obj = Object.create(constructor.prototype);

    // 第3步：绑定this，执行构造函数
    const result = constructor.apply(obj, args);

    // 第4步：判断返回值
    return typeof result === 'object' ? result : obj;
}
```