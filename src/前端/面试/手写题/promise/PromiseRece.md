


```js

const PromiseRace = (arr) => {
    const tasks = Array.from(arr);
    return new Promise((resolve, reject)=>{

        for(const task of tasks){
            Promise.resolve(task).then((item)=>{
                resolve(item);
            }).catch((e)=>{
                reject(e);
            })
        }
    })
}
```