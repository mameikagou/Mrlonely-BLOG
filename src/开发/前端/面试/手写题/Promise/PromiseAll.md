# 手写 PromiseAll Promise.all

最直接的思路, 依次执行即可; 不能用 push, 因为返回的时间不好控制;

- 使用return new Promise的情况：
  - 聚合多任务，多个promise。
  - 外面包一层，手动控制resolve。
  - 

```js

const PromiseAll = (arr) => {
    const tasks = Array.from(arr);
    const len = arr.length;
    return new Promise((resolve, reject)=>{

        let count =0;
        let result = [];
        if(len === 0){
            resolve([]);
        }
        for(let i=0;i<len;i++){
            Promise.resolve(tasks[i]).then((item)=>{
                result[i]=item;
                count++;
                if(count === len){
                    resolve(result);
                }
            }).catch(e=>{
                reject(e);
            })
        }
    })
}
```



```js

const PromiseAll = (promises) => {
  const tasks = Array.from(promises);
  const len = tasks.length;

  return new Promise((resolve, reject)=>{

    let count = 0;
    let res = [];
    if(len===0) resolve([]);

    for(let i=0;i<len;i++){
      Promise.resolve(tasks[i]).then((val)=>{
        
        res[i] = val;
        count++;

        if(count===len){
          resolve(res);
        }
      }).catch((err)=>{
        reject(err); // 一票否决。
      })
    }

  })
}

```