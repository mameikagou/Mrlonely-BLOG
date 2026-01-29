### cluster

用途：增加容错设计；
可以帮你充分利用 CPU 多核特性，通过创建多个子进程（Worker）来处理任务，从而提升并发能力和可靠性

```ts
const http = require("http");
// 加载拿到 cluster 模块
const cluster = require("cluster");
// 通过 os 模块拿到当前计算机上的 cpu
const cpus = require("os").cpus();

// cluster 能拿到当前是否是 master 模式
if (cluster.isMaster) {
  // master 下，对每个 cpu 都 fork 一个进程
  // 相当于是把 cpu 个数都吃满，充分利用多核优势
  for (let i = 0; i < cpus.length; i++) {
    cluster.fork();
  }
} else {
  // 如果不是 master 模式，则每个子进程都会启动这个服务
  // 相当于有多少个 cpu，fork 了多少个进程，这里就会有多少个服务器
  http
    .Server((req, res) => {
      for (var i = 0; i < 1000000; i++) {}
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("经过一个耗时操作，这是返回的一段文本\n");
    })
    .listen(5000, () => console.log("服务启动了"));
}
```

再加上进程管理：
创建了多个子进程，也就是 child process，我们管它叫 worker，这些 worker 会共享同一个服务器端口，也就是 server port，而能做到这一点离不开主进程的调度，也就是 master process

master process 负责创建和管理 worker process，worker process 负责处理请求；

```ts
// 通过 if else 区分下主进程和子进程各自的启动逻辑
if (cluster.isMaster) masterProcess();
else childProcess();

function masterProcess() {
  for (let i = 0; i < 2; i++) {
    cluster.fork();
  }
  // 进程创建成功 则触发 online 事件
  cluster.on("online", (worker) => {
    console.log("子进程 " + worker.process.pid + " 创建成功");
  });

  // 进程退出 则触发 exit 事件
  cluster.on("exit", (worker, code, signal) => {
    console.log(`子进程 ${worker.process.pid} 退出`);
  });
}

function childProcess() {
  console.log(`子进程开始 ${process.pid} 开始启动服务器...`);

  http
    .Server((req, res) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      console.log("来自子进程 id 为 " + cluster.worker.id + " 的响应");
      res.end("Hello Juejin!");
      process.exit(1);
    })
    .listen(5000, () => {
      console.log("子进程 " + process.pid + " 已成功监听 5000 端口");
    });
}
```



#### 错误处理：
子进程报错之后：

```js
const cluster = require('cluster')
const http = require('http')

if (cluster.isMaster) masterProcess()
else childProcess()

function masterProcess() {
  cluster.fork();

  cluster.on('exit',(worker, code, signal) => {
    console.log(`子进程 ${worker.process.pid} 退出`);
    // 重新 fork 一个新的进程
    cluster.fork();
  });
}

function childProcess () {
  http.Server((req, res) => {
    console.log('子进程 ' + cluster.worker.id + ' 在响应')
    throw new Error({})
    res.end('Hello Juejin!')
  }).listen(5000, () => {
    console.log('子进程 ' + process.pid + ' 监听中')
  })
}
```

### pm2 & pm2 plus

pm2 是一个进程管理工具，能让你轻松地管理 Node.js 应用程序的进程，提供了负载均衡、监控、日志管理等功能；

两个点：进程管理，负载均衡；

他自带原生 Cluster 模块，根据cpu核心数创建子进程，实现负载均衡， 如`pm2 start app.js -i num`； num就是最大进程数的意思；

pm2 plus 是 pm2 的一个增强版，提供了更多的监控和管理功能，比如实时监控、日志分析、性能分析等；

pm2专门为node设计，而systemd则属于linux系统级别的服务管理工具；

常用命令：
- `pm2 stop 1` 杀进程
- `pm2 reload app` 

一般都是 docker 镜像内安装 pm2 来跑 node；

