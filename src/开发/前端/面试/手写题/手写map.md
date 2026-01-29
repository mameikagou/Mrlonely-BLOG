

使用callback.call绑定新的内容即可

```ts
Array.prototype.mymap = function(callback, thisArg){

  if(typeof callback !== "function"){
      throw Error("callback is not a function")
  }

  let result = []
  for(let i=0;i<this.length;i++){
      // this指向调用时的对象
      if(this.hasOwnProperty(i)){
        // this[i] 是当前元素，i 是索引，this 是整个数组
          result.push(callback.call(thisArg,this[i],i,this)) 
      }
  }
  return result;
}

let arr = [0,1,2]

console.log(arr.mymap(item=>item+1))
```