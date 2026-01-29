
### forEach相关题

```js
Array.prototype.forEach = function(array, callback){
    for(let index=0;index<this.length;i++){
        callback(array[index], index, array)
    }
}
```

#### 题目1：跳出forEach
```js
function foo(arr) {
  arr.forEach((item, index) => {
    if (index === 1) {
      // 👉️ 跳出 forEach
    }
    console.log(item);
  });
}
foo([1, 2, 3]);

```

用trycatch


#### 题目2：异步输出
要求，要隔1s、2s、3s依次输出。
```js
const foo = (n) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(n);
    }, 1000);
  });
};

const test = (nums) => {
  nums.forEach(async (n) => {
    let num = await foo(n);
    console.log(num);
  });
};

test([1, 2, 3]);

// 输出结果
// 1
// 2
// 3

```
##### 踩坑：这里如果用map，也是会同时启动所有的定时器。其实只需要把await放到它内部就可以了。
##### 解法一：
用for of

这里