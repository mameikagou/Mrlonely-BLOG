

使用callback.call绑定新的内容即可

```js
Array.prototype.map = function(callback, thisArg){
  // map跟forEach的值的区别就是要存一下返回值。
  
  // 校验
  if(typeof callback!== 'function'){
    throw Error('')
  }

  let res = [];

  for(let i=0;i<this.length;i++){
    if(i in this){
      const value = callback.call(thisArg, this[i],i,this);
      res[i] = value;
    }
    
  }
  return res;
}

let arr = [0,1,2]

console.log(arr.mymap(item=>item+1))
```


```js
Array.prototype.forEach = function(callback, thisArg){
  // map跟forEach的值的区别就是要存一下返回值。

  for(let i=0;i<this.length;i++){
    // i是判断属性是否存在其中的。
    if(i in this){
      callback(thisArg, this[i], i, this);
    }
  }

}
```

map、forEach、filter、some、every
都是一样的