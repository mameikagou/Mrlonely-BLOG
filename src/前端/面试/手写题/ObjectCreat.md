
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
    // 第 1 步 和 第 2 步：创建一个新对象，并新对象的原型链接到构造函数的prototype
    const obj = Object.create(constructor.prototype);// Object.create传入的是proto

    // 第3步：绑定constructor的this到obj上，并执行。就是把构造函数的内容，加到空对象obj上。
    const result = constructor.apply(obj, args);

    // 第4步：判断返回值，new的特性，构造函数有return就返回return，没有return就返回新创建的对象。
    return typeof result === 'object' ? result : obj;
}
```

new（ `new Constructor()` ） 和 Object.create一体两面，

Object.create传的是proto，new传的是constructor

new Constructor()是创建一个构造函数的实例、Object.create(proto)创建的是一个空对象。