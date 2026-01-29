// 说白了就是控制上线，只有符合的才会加
// 每次新增都会把当前队列里的任务运行完

class SuperTasks2{
  tasks
  maxCount
  runningCount
  constructor(maxCount = 2){
    this.maxCount = maxCount;
    this.tasks = [];
    this.runningCount = 0;
  }

  add(task){
    return new Promise((resolve, reject)=>{
      this.tasks.push({
        task,
        resolve,
        reject
      })
      this.run();
    })
  }

  run(){
    while( this.runningCount<this.maxCount && this.tasks.length>0 ){
      const {task, resolve, reject} = this.tasks.shift();
      this.runningCount++;

      Promise.resolve(task()).then(resolve,reject).finally(()=>{
        this.runningCount--;
        this.run();
      })
    }
  }
}

class SuperTasks{
  tasks
  maxCount
  runningCount
  constructor(maxCount=2){
    this.maxCount = maxCount;
    this.tasks = [];
    this.runningCount =0;
  }

  add(task){
    return new Promise((resolve, reject)=>{
      this.tasks.push({
        task,
        resolve,
        reject
      })
      this.run();
    })
  }

  run(){
    while(this.runningCount<this.maxCount && this.tasks.length>0){
      const {resolve, reject, task} = this.tasks.shift();
      this.runningCount++;

      Promise.resolve(task()).then(resolve,reject).finally(()=>{
        this.runningCount--;
        this.run();
      })
    }
  }
}

const timeout = (time, id) => new Promise(resolve => {
  console.log(`[任务 ${id}] 开始，预计耗时 ${time}ms.`);
  setTimeout(() => {
    console.log(`[任务 ${id}] ✅ 完成.`);
    resolve(id);
  }, time);
});


const superTask = new SuperTasks(2);

const addTask = (time, id) => {
  superTask
    .add(() => timeout(time, id))
    .then(resultId => {
      console.log(`[任务 ${resultId}] 👉 返回结果.`);
    });
};


addTask(10000,1) // 10000ms后输出：任务1完成
addTask(5000,2) // 5000ms后输出：任务2完成
addTask(3000,3) // 8000ms后输出：任务3完成
addTask(4000,4) // 12000ms后输出：任务4完成
addTask(5000,5) // 15000ms后输出：任务5完成