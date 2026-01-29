
## 词法作用域（lexical scoping）
基于函数定义的位置，而不是调用时候的位置；

## 箭头函数的this
捕获定义时候的上下文作为自己的上下文，这就称作“词法作用域”;

所以在全局作用域中的定义的箭头函数会指向全局对象，也就是window或者global；

- 作为对象被调用，普通函数的this指向调用它的对象，箭头函数的this指向定义时候的对象

普通函数：
```js
const obj = {
  method: function() {
    console.log(this === obj); // true
  }
};

obj.method(); // this 指向 obj
```

箭头函数：
```js
const obj = {
  method: () => {
    console.log(this === obj); // false，在箭头函数中，this 指向函数定义时的上下文，通常是全局对象（window 或 global）
  }
};

obj.method(); // this 不指向 obj
```

- 函数作为构造函数被调用时，指向新创建的对象；箭头函数不能作为构造函数被调用，使用new会报错；
```js
function Constructor() {
  this.value = 'constructed';
}

const instance = new Constructor();
console.log(instance.value); // 'constructed'，this 指向新创建的对象 instance
```

- 函数作为普通函数被调用, 二者相同，指向全局对象；
```js
function normalFunction() {
  console.log(this === window); // true，在浏览器环境中，this 指向全局对象 window
}

normalFunction();

const arrowFunction = () => {
  console.log(this === window); // true，尽管箭头函数中的 this 指向定义时的上下文，但在这个例子中，它仍然是全局对象 window
};

arrowFunction();
```