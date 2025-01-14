
## 高级调度和低级调度

- 高级：从外存向内存调入作业
- 中级：存储器管理中的对换调度
- 低级：调度CPU上的进程

### 对换调度
其主要目的是在主存空间不足时，将暂时不需要运行的进程移到辅存中，以腾出主存空间给其他需要运行的进程；

### 作业：
作业通常包含需要执行的程序、所需的数据以及执行这些程序的控制信息。作业是操作系统进行资源分配和调度的基本单位。

- 批处理作业：
由批处理系统控制的作业，通常不需要用户的交互。
这些作业可以在后台运行，处理大量数据或执行复杂计算。
例如：数据处理、报表生成、批量文件转换等。

- 可变分区分配策略处理作业：
可变分区分配策略处理作业是指在操作系统中，根据作业的实际内存需求动态地分配内存空间的过程。
当一个作业（程序）需要运行时，操作系统会根据该作业的大小和当前内存的使用情况，从内存中划分出一块合适大小的区域分配给该作业。
作业执行结束后，所占的内存空间会被回收，以便其他作业使用。
这种策略有效地克服了固定分区方式中由于分区内部剩余内存空置造成浪费的问题，提高了内存空间的利用率

## 时间片轮转（Round Robin, RR）调度算法
分时系统使用这个算法：

每个进程都会分配一个时间片，该进程只被允许在这个时间片内运行；
- 时间片如果先用完，会停止进程
- 如果进程

### 什么是分时系统？
分时系统(Time Sharing System)是一种操作系统的工作方式，它允许多个用户同时使用计算机系统，每个用户都感觉自己在独占计算机资源。

### PCB (Process Control Block) 空白进程控制块

当需要创建新进程时，系统从空白PCB池中获取一个PCB
用于初始化新进程的各种信息
确保系统能够动态创建新的进程

## 多级反馈队列（Multilevel Feedback Queue）调度算法
顾名思义：
•「多级」表示有多个队列，每个队列优先级从高到低，同时优先级越高时间片越短。
•「反馈」表示如果有新的进程加入优先级高的队列时，立刻停止当前正在运行的进程，转而去运行优先
级高的队列；

### 批处理系统定义
批处理系统(Batch Processing System)是一种操作系统的工作方式，它将多个程序打包成一批，然后依次自动执行，无需人工干预。

# 死锁

条件：
- 互斥 （Mutual Exclusion）：一个资源只能被一个进程使用
- 请求和保持条件 (Hold and Wait)：请求新的不释放旧的
- 不剥夺条件 (No Preemption)：只能释放，不能抢占
- 环路条件 (Circular Wait)：多个进程形成一个循环等待的关系