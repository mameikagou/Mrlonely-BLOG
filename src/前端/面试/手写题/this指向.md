方法	执行时机	this 指向	参数传递方式
call()	立即执行	第一个参数	后续参数逐个传入，用逗号隔开 (fn.call(this, arg1, arg2))
apply()	立即执行	第一个参数	第二个参数是一个数组 (fn.apply(this, [arg1, arg2]))
bind()	返回新函数	第一个参数	后续参数逐个传入（可预设参数），返回一个绑定好的新函数

区别就是call的参数是逐个传入的，apply用的都是数组，bind返回一个新函数，可以预设参数。

设计的结果就是，this直接指向外层函数，跟使用箭头函数的结果等价。


```js
outerMethod: function() {
  console.log('外部方法的 this:', this.name); // this 是 myObject

  const innerArrowFunction = () => {
    // 这里的 this 就是 outerMethod 的 this
    console.log('箭头函数的 this:', this.name); 
  };
  
  innerArrowFunction();
}
// 输出: 箭头函数的 this: 外部对象
```

对于普通函数，this 的指向只取决于其“直接调用者”，如果不存在直接调用者，this 就会退回到全局对象或 undefined。它不会从定义它的外层函数那里“继承” this。