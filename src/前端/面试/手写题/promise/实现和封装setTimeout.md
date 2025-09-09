
手写一个promise封装一个setTimeout
简单封装一下即可：

```js
const delay = (ms) => {
    return new Promise((resolve, reject)=>{
        setTimeout(resolve,ms)
    })
} 
```

在浏览器环境下，可以使用raf封装一个setTimeout，这东西跟浏览器的刷新频率相同，75HZ。
```js

const mySetTimeout = (callback, delay) => {
    let now = performance.now()
    let frameId;
    
    // 会自动传递
    const loop = (curTime)=>{
        if(curTime - now >= delay){
            callback();
        }else{
            frame = requestAnimationFrame(loop);
        }
    }

    frameId = requestAnimationFrame(loop);

    return {id: frameId};
} 

const myClearTimeout = (timeoutObject) => {
    cancelAnimationFrame(timeoutObject.id);
}
```