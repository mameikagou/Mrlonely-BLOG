
// 说白了就是控制上线，只有符合的才会加
// 每次新增都会把当前队列里的任务运行完
class superTask {
    constructor() {
        this.max = 2;
        this.taskList = [];
        
    }

    add(task) {
       return new Promise((resolve, reject)=>{
        this.taskList.push({
            task,
            resolve,
            reject
        });
        this.run();
       })
    }

    run() {
        while (this.taskList.length > 0 && this.taskList.length <= this.max) {
             const {task, resolve, reject} = this.taskList.shift();
             Promise.resolve(task()).then(resolve, reject);
    }
    }}