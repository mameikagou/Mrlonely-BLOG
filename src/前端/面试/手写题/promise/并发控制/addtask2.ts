export class taskTime {

    private count: number = 0;
    private taskQueue: (() => Promise<void>)[] = [];

    constructor(private maxCount: number) {
    }

    enqueue(task: () => Promise<void>) {
        this.taskQueue.push(task);
        this.run();
    }

    async run() {
        if (this.count >= this.maxCount || this.taskQueue.length === 0) return;
        this.count++;
        const task = this.taskQueue.shift();
        if (task) await task();
        this.count--;
        this.run(); // 递归
    }
}

// 测试代码

// 测试用例1：基本功能测试
function testBasicFunctionality() {
    console.log('=== 测试用例1：基本功能测试 ===');
    const queue = new taskTime(2);

    for (let i = 0; i < 5; i++) {
        queue.enqueue(async () => {
            console.log(`任务${i} 开始执行`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`任务${i} 执行完成`);
        });
    }
}

// 测试用例2：不同任务执行时间
function testDifferentTaskDurations() {
    console.log('=== 测试用例2：不同任务执行时间 ===');
    const queue = new taskTime(3);

    // 添加不同执行时间的任务
    const durations = [3000, 1000, 2000, 500, 1500];

    for (let i = 0; i < durations.length; i++) {
        const duration = durations[i];
        queue.enqueue(async () => {
            console.log(`任务${i} (${duration}ms) 开始执行`);
            const startTime = Date.now();
            await new Promise(resolve => setTimeout(resolve, duration));
            const endTime = Date.now();
            console.log(`任务${i} (${duration}ms) 执行完成，实际耗时: ${endTime - startTime}ms`);
        });
    }
}

// 测试用例3：任务抛出错误的情况
function testTaskWithError() {
    console.log('=== 测试用例3：任务抛出错误的情况 ===');
    const queue = new taskTime(2);

    // 添加一个会抛出错误的任务
    queue.enqueue(async () => {
        try {
            console.log('错误任务开始执行');
            await new Promise(resolve => setTimeout(resolve, 500));
            throw new Error('任务执行出错');
        } catch (err) {
            console.error('捕获到错误:', err.message);
        }
    });

    // 添加正常任务
    for (let i = 0; i < 3; i++) {
        queue.enqueue(async () => {
            console.log(`正常任务${i} 开始执行`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`正常任务${i} 执行完成`);
        });
    }
}

// 运行测试
console.log('开始测试 taskTime 类...');

// 按顺序执行测试用例，确保一个测试完成后再开始下一个
setTimeout(() => {
    testBasicFunctionality();

    setTimeout(() => {
        testDifferentTaskDurations();

        setTimeout(() => {
            testTaskWithError();
        }, 8000); // 等待第二个测试完成

    }, 6000); // 等待第一个测试完成

}, 1000); 