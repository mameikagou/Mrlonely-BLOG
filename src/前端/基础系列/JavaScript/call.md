

# 类数组对象的call方法

```sh
functionName.call(thisArg, arg1, arg2, ...)
```

call 方法: 该方法用于调用一个函数，并且可以显式地指定 this 值和参数。
call 方法的第一个参数是 thisArg，即函数运行时 this 的值。后续参数是传递给函数的参数。


在这个例子中，call 方法将 arguments 对象转换为数组，并对每个元素加 1。

例子1: 
```js
function example(a,b,c,d){
    let args = Array.prototype.map.call(arguments,(item)=>item+1);
    console.log(args);
}

example(1, 2, 3, 4); // 2,3,4,5
```

在这个例子中，call 方法将 greet 函数的 this 值设置为 person 对象，并传递了两个参数 'Hello' 和 '!'。输出结果为 Hello, Alice!。

例子2: 
```js
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Alice' };

greet.call(person, 'Hello', '!');
```