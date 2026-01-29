

Array.prototype.reduce2 = function(callback,initialValue) {

    let acc = initialValue === undefined ? this[0] : initialValue;
    let startIndex = initialValue === undefined ? 1:0;

    for(let i=startIndex;i<this.length;i++){
        acc = callback(acc,this[i],i,this)
    }
     // 这里没有实现处理空值的情况 比如这种：[0,,01,2]
    return acc;
}


const res = [30,40,50].reduce2((acc,cur)=>acc+cur,100);

console.log(res);