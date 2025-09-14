

手撕：单括号匹配（O（1）空间复杂度），多括号匹配，多括号匹配并返回最近一个不匹配的index

##### 单括号
```js
const fun1 = (arr)=>{
    if(!arr) return false;
    const len = arr.length;
    let count = 0;
    for(let i=0;i<len;i++){
        if(arr[i] === '('){
            count++;
        }else if(arr[i] === ')'){
            count--;
        }

        if(count < 0) return false;
    }

    return count === 0 ? true : false;
}
```