
## 动态分区式内存分配算法：
动态分区式内存分配算法是指在操作系统中，用于管理内存空间的一种方法。它允许内存空间被划分成多个分区，并且可以根据程序的需要动态地分配和回收这些分区。这种算法可以减少内存碎片，并提高内存的利用率。
### 低地址：
在计算机内存中，低地址通常指的是较小的内存地址值。
A. 首次适应算法（First Fit）：
首次适应算法在分配内存时，从内存的起始位置（低地址）开始查找，找到第一个足够大的空闲分区进行分配。这种算法倾向于优先使用低地址部分的空闲区
。

B. 循环首次适应算法（Next Fit）：
循环首次适应算法是首次适应算法的变种，它不是每次都从头开始查找，而是从上次找到的空闲分区的下一个分区开始查找
。

C. 最佳适应算法（Best Fit）：
最佳适应算法在分配内存时，总是选择能满足要求且最小的空闲分区进行分配，这种算法并不特别倾向于使用低地址部分的空闲区
。

D. 最坏适应算法（Worst Fit）：
最坏适应算法在分配内存时，总是选择最大的空闲分区进行分配，这种算法倾向于使用高地址部分的大空闲区
。

## B. 地址映射（Address Mapping）：

地址映射是指将一个地址空间中的地址转换到另一个地址空间的过程。在多道程序环境中，这通常指的是将虚拟地址（用户程序的相对地址）映射到物理地址。这是操作系统内存管理单元（MMU）的主要功能之一。

## C. 地址重定位（Address Relocation）：

地址重定位是指在程序装入内存时，将程序中的相对地址转换为实际的物理地址的过程。这通常涉及到基址（base address）和偏移量（offset）的计算，以确保程序能够正确地访问内存。

## D. 地址重映射（Address Remapping）：

地址重映射通常指的是在程序运行过程中，动态地改变地址映射的过程。这可能发生在页面置换、内存保护或内存共享等场景中。

## 快表
是一种特殊的缓存机制，用于存储最近或频繁访问的页表项；
它的主要作用是加速虚拟地址到物理地址的转换过程；

### 页表和页表项
它们用于将虚拟地址（逻辑地址）转换为物理地址。

页表是操作系统用来管理虚拟内存的一个数据结构，它包含了许多页表项。页表将虚拟地址空间划分为多个固定大小的页，每个页都通过一个页表项映射到物理内存中的一个帧（物理内存块）。页表的作用是：

### A. 寄存器（Register）：
寄存器是CPU内部的高速存储单元，用于存储指令、数据和地址等信息。它们是CPU中最快的存储资源，但并不是用来存储页表项的。
### C. 联想存储器（Associative Memory）：
联想存储器是一种存储器，其访问方式类似于哈希表，可以根据关键字（如虚拟地址）直接访问存储位置。快表就是一种联想存储器，因为它能够快速地根据虚拟地址找到对应的物理地址。




## 装入
在操作系统中，装入（loading）是指将程序从辅助存储器（如硬盘）加载到主存储器（RAM）的过程；

### 绝对装入
其中程序在编译时就确定了所有的地址

### 相对装入（Relative Loading）：
相对装入方式允许程序在内存中的不同位置运行，但通常需要在编译时确定程序的相对地址。
这种方式提供了一定的灵活性，但仍然不适用于多道程序环境，因为它不支持程序的动态加载和卸载。

### C. 重定位装入（Relocation Loading）：
重定位装入方式允许程序在装入内存时动态地确定其地址。这种方式适用于多道程序环境，因为它允许程序在内存中的不同位置运行，并且可以与其他程序共享内存空间。

重定位装入通常涉及到基址和偏移量的计算，以确保程序能够正确地访问内存。

### D. 动态运行时装入（Dynamic Runtime Loading）：
动态运行时装入方式是指程序在运行时动态地加载到内存中。
这种方式适用于需要动态链接库或模块的程序，可以在程序运行时根据需要加载或卸载特定的代码和数据。这种装入方式通常与多道程序环境一起使用，以提高内存利用率和程序的灵活性。

#### 单道程序环境（Single-Program Environment）：
在单道程序环境中，操作系统一次只能执行一个程序。这意味着在任何给定时间，只有一个程序被加载到内存中并执行。

#### 多道程序环境（Multi-Program Environment）：
在多道程序环境中，操作系统可以同时管理多个程序，这些程序可以并发执行。这意味着多个程序可以被加载到内存中，操作系统根据一定的调度策略决定哪个程序获得CPU时间。