#### Object.create 和 new

```js
const objectCreate=(proto)=>{
    function func(){}

    func.prototype = proto;
    // new的作用，就是基于构造函数的prototype，构造新对象。
    return new func();
}
```

#### 不用 new 实现 Object.create

```js
const objectCreate2 = (proto) => {
    // 1. 创建一个普通的空对象
    const obj = {};

    // 2. 手动将新对象的原型链接到传入的 proto 对象
    obj.__proto__ = proto;

    // 3. 返回这个新创建的对象
    return obj;
};

const objCreate = (proto) => {
  const obj = {};
  obj.__proto__ = proto;
  return obj;
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

```js
const new3 = (constructor, ...args) => {
    
    // 创建新对象：首先，在内存中创建一个全新的、空的对象。
    const obj = {};

    // 新对象原型链接到构造函数的prototype
    obj.__proto__ = constructor.prototype;

    // 绑定构造函数的this到这个上下文对象上
    const result = constructor.apply(obj,args);

    // 如果构造函数返回了对象，就用这个返回的。否则用第一步创建的对象。
    return (result instanceof Object) ? result : obj;
}
```



```js
const new = (constructor, ...args) => {
    const obj = {};

    obj.__proto__ = constructor.prototype;

    const result = constructor.apply(obj.args)
    
    return (result instanceof Object) ? result : obj;
}
```


##### 讲讲原型的机制？

- prototype (显式原型),当你访问一个属性，找不到的时候，会去它的原型链上找，直到找到了该属性或者到达了终点：Object.prototype 的原型是 null。
- __proto__ (隐式原型) / [[Prototype]]：一般通过__proto__指向构造函数的prototype。`obj.__proto__ = constructor.prototype`

##### 如果两个对象想共用一些方法，怎么做？

1, 通过原型：放在prototype上，然后new：
```js
function Player(name) {
  this.name = name;
}
// 将共用方法 attack 定义在原型上
Player.prototype.attack = function() {
  console.log(`${this.name} attacks!`);
};

const player1 = new Player('Mage');
const player2 = new Player('Warrior');

player1.attack(); // Mage attacks!
player2.attack(); // Warrior attacks!
console.log(player1.attack === player2.attack); // true，表明是同一个函数
```

2, 通过class
```js
class Player {
  constructor(name) {
    this.name = name;
  }
  // 方法直接定义在类中，实际上就是放在了 Player.prototype 上
  attack() {
    console.log(`${this.name} attacks!`);
  }
}
const player1 = new Player('Mage');
const player2 = new Player('Warrior');
player1.attack();
```

3, Object.create

```js
const playerMethods = {
  attack: function() {
    console.log(`${this.name} attacks!`);
  }
};

const player1 = Object.create(playerMethods);
player1.name = 'Mage';

const player2 = Object.create(playerMethods);
player2.name = 'Warrior';

player1.attack();
```
##### js 数据类型底层根据什么划分

- 基于存储方式和行为特性
    - 原始类型：String, Number, Boolean, Null, Undefined, Symbol, BigInt。
        - 存储方式：存储在Stack栈当中
        - 按值访问
        - 不可变：实际都是新建字符串，然后再把值指向它；
    - 引用类型 (Reference Types) / 对象类型：Object (以及其所有子类型，如 Array, Function, Date, RegExp 等)。
        - 存储方式：存储在Heap堆中
        - 堆是一块更大但非连续的内存区域，用于存储大小不固定、可以动态增长的数据。变量本身在栈中只存储一个指向堆中对象的内存地址（引用）。


instanceof只能判断对象类型：

终极方式是：`Object.prototype.toString.call()`