
```js
class EventEmitter {
    events;
    groups; // 新增：用于管理分组

    constructor() {
        this.events = new Map();
        this.groups = new Map(); // 新增
    }

    /**
     * 注册事件监听器
     * @param {string} eventName - 事件名称
     * @param {Function} callback - 回调函数
     * @param {object} [options] - 配置项
     * @param {number} [options.priority=0] - 优先级，数字越大，越先执行
     * @param {boolean} [options.once=false] - 是否只执行一次
     * @param {any} [options.group] - 所属分组
     */
    on(eventName, callback, options = {}) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }

        const { priority = 0, once = false, group } = options;

        const listener = { callback, priority, once, group };

        // 1. 添加到事件列表
        this.events.get(eventName).push(listener);

        // 2. 如果有分组，添加到分组列表
        if (group) {
            if (!this.groups.has(group)) {
                this.groups.set(group, []);
            }
            this.groups.get(group).push(listener);
        }
    }

    once(eventName, callback, options = {}) {
        // once 本质上是 on 的一个特例，直接复用 on 方法
        this.on(eventName, callback, { ...options, once: true });
    }

    off(eventName, callback) {
        if (!this.events.has(eventName)) {
            return;
        }

        // 从事件列表中移除
        const listeners = this.events.get(eventName);
        const newListeners = listeners.filter(listener => listener.callback !== callback);

        // 如果数组长度变化，说明有监听器被移除，需要同步更新 groups
        if (newListeners.length !== listeners.length) {
            this.events.set(eventName, newListeners);

            // 从分组中移除（这是一个性能开销点，但为了数据一致性是必要的）
            const removedListeners = listeners.filter(listener => listener.callback === callback);
            for (const removed of removedListeners) {
                if (removed.group && this.groups.has(removed.group)) {
                    const groupListeners = this.groups.get(removed.group);
                    const newGroupListeners = groupListeners.filter(l => l !== removed);
                    this.groups.set(removed.group, newGroupListeners);
                }
            }
        }
    }

    /**
     * 移除一个分组的所有监听器
     * @param {any} groupName - 分组名称
     */
    offGroup(groupName) {
        if (!this.groups.has(groupName)) {
            return;
        }

        const listenersInGroup = this.groups.get(groupName);

        // 遍历分组中的每一个监听器，从它们各自所属的事件列表中移除
        for (const listener of listenersInGroup) {
            this.events.forEach((eventListeners) => {
                const index = eventListeners.indexOf(listener);
                if (index > -1) {
                    eventListeners.splice(index, 1);
                }
            });
        }

        // 最后，删除整个分组
        this.groups.delete(groupName);
    }

    emit(eventName, ...args) {
        if (!this.events.has(eventName)) {
            return;
        }

        const listeners = this.events.get(eventName);

        // 1. 关键：基于副本进行排序和遍历，防止在执行中修改数组导致的问题
        const sortedListeners = [...listeners].sort((a, b) => b.priority - a.priority);

        for (const listener of sortedListeners) {
            listener.callback(...args);

            // 2. 如果是 once 监听器，执行后立即移除
            if (listener.once) {
                this.off(eventName, listener.callback);
            }
        }
    }
}

// --- 进阶版测试用例 ---

console.log("--- 初始化 EventEmitter (进阶版) ---");
const emitter = new EventEmitter();
const scene1 = 'scene1';

// 测试 priority: p2 > p1 > p0(默认)
console.log("\n--- 测试 Priority ---");
emitter.on('test-priority', () => console.log('优先级 0 执行'), { priority: 0 });
emitter.on('test-priority', () => console.log('优先级 2 执行'), { priority: 2 });
emitter.on('test-priority', () => console.log('优先级 1 执行'), { priority: 1 });
emitter.emit('test-priority');
// 预期输出:
// 优先级 2 执行
// 优先级 1 执行
// 优先级 0 执行

// 测试 once
console.log("\n--- 测试 Once ---");
emitter.once('test-once', () => console.log('我只执行一次'));
console.log("第一次触发 'test-once':");
emitter.emit('test-once'); // 预期输出: "我只执行一次"
console.log("第二次触发 'test-once':");
emitter.emit('test-once'); // 预期无输出

// 测试 group
console.log("\n--- 测试 Group ---");
emitter.on('eventA', () => console.log('A-1 来自场景1'), { group: scene1 });
emitter.on('eventA', () => console.log('A-2 来自其他场景'));
emitter.on('eventB', () => console.log('B-1 来自场景1'), { group: scene1 });

console.log("触发所有事件:");
emitter.emit('eventA'); // 预期输出 A-1 和 A-2
emitter.emit('eventB'); // 预期输出 B-1

console.log("\n移除 'scene1' 分组的所有监听器...");
emitter.offGroup(scene1);

console.log("再次触发所有事件:");
emitter.emit('eventA'); // 预期只输出 A-2
emitter.emit('eventB'); // 预期无输出
```