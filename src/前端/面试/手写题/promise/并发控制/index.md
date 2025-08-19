## 字节常考题 并发控制

说白了就是写一个类，其中有两个方法，一个add一个run，run当中取出task，并运行，同时检查一下是否达到并发上限；

```js
class superTask {
    max
    tasks
    runningCount
    constructor(max){
        this.max = max;
        this.tasks = [];
        this.runningCount = 0;
    }

    add(task){
        return new Promise((resolve,reject)=>{
            this.tasks.push({
                resolve,reject,task;
            })
        })
        this.run();
    }

    run(){
        while(this.tasks.length>0 && this.runningCount < max){
            const {resolve, reject, task} = this.tasks.shift();
            this.runningCount++;
            Promise.resolve(task).then(resolve,reject).finally(()=>{
                this.runningCount--;
                this.run();
            })
        }
    }
}
```

```js
class superTask {
    max;
    tasks;
    runningCount;
    constructor(max) {
        this.max = max;
        this.tasks = [];
        this.runningCount = 0;
    }

    add(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push({
                resolve,
                reject,
                task,
            });
            this.run(); // 每次都调用一下
        });
    }

    run() {
        while (this.tasks.length > 0 && this.runningCount < this.max) {
            const { resolve, reject, task } = this.tasks.shift();
            this.runningCount++;
            Promise.resolve(task).then(resolve, reject).finally(() => {
                this.runningCount--;
                this.run();
            });
        }
    }
}
```
