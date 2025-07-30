
## 字节常考题 并发控制

说白了就是写一个类，其中有两个方法，一个add一个run，run当中取出task，并运行，同时检查一下是否达到并发上限；

```js

class superTask {
    max
    tasks
    
    constructor(max){
        this.max = max;
        this.tasks = [];
    }

    add(task){
        return new Promise((resolve, reject)=>{
            this.tasks.push({
                resolve,
                reject,
                task
            })
            this.run() // 每次都调用一下
        })
    }

    run(){
        while( this.tasks.length >0 && this.tasks.length < this.max ){
            const { resolve, reject, task } = this.tasks.shift();
            Promise.resolve(task).then(resolve, reject);
        }
    }
}

```

应用层 -> 表示层(加解密) -> 会话层(Session) -> 传输层(TCP/UDP) -> 网络层(IP) -> 数据链路层(MAC，数据帧) -> 物理层(网线)
