
reduce的几个特性：

- 回调函数中第一个 Index 是多少？
- 数组为稀疏数组如何处理？

先来复习一下reduce:
第三个参数，传了初始值，就从index0的元素开始遍历，不传就从index1的元素开始遍历

```js
let arr = [1,1,23,4];

arr,reduce((accumulator,  currentValue)=>{

},0)

```

```js

Array.prototype.myReduce = function(callback, initValue){
    
    let startIndex = initValue === undefined ? 1 : 0;
    let accumulator = initValue === undefined ? this[0] : initValue;

    for(let i=0;i<this.length;i++){
        if(this.hasOwnProprety(i)){
            accumulator = callback(accumulator, this[i],i,this);
        }
    }
    return accumulator;
}

```