

class EventEmitter {
    events;
    constructor(){
        this.events = new Map();
    }

    on(eventName,callback){
        if(!this.events.has(eventName)){
            this.events.set(eventName,[]);
        }
        this.events.get(eventName).push(callback);
    }

    off(eventName, callback){
        if(!this.events.has(eventName)){
            return;
        }
        const newCallBacks = this.events.get(eventName).filter(cb => cb !== callback);

        this.events.set(eventName, newCallBacks);
    }

    emit(eventName, ...args){
        if(!this.events.has(eventName)){
            return;
        }
        const callbacks = this.events.get(eventName);

        [...callbacks].map(callback => {
            callback(...args);
        })
    }
}

// --- 测试用例 ---

console.log("--- 初始化 EventEmitter ---");
const emitter = new EventEmitter();

// 测试 1: 基本的 on 和 emit 功能
console.log("\n--- 测试 1: 基本功能 ---");
const cb1 = (name) => console.log(`测试 1: Hello, ${name}!`);
emitter.on('greet', cb1);
emitter.emit('greet', 'World'); // 预期输出: "测试 1: Hello, World!"

// 测试 2: emit 传递多个参数
console.log("\n--- 测试 2: 传递多个参数 ---");
const cb2 = (a, b) => console.log(`测试 2: a + b = ${a + b}`);
emitter.on('calculate', cb2);
emitter.emit('calculate', 5, 10); // 预期输出: "测试 2: a + b = 15"

// 测试 3: 为同一个事件注册多个监听器
console.log("\n--- 测试 3: 多个监听器 ---");
const cb3_1 = () => console.log('测试 3: 监听器 A 被调用');
const cb3_2 = () => console.log('测试 3: 监听器 B 被调用');
emitter.on('multi', cb3_1);
emitter.on('multi', cb3_2);
emitter.emit('multi');
// 预期输出:
// 测试 3: 监听器 A 被调用
// 测试 3: 监听器 B 被调用

// 测试 4: 使用 off 解除事件监听
console.log("\n--- 测试 4: 解除监听 ---");
emitter.off('multi', cb3_1);
console.log("在解除监听器 A 后再次触发 multi 事件:");
emitter.emit('multi'); // 预期输出: "测试 3: 监听器 B 被调用"

// 测试 5: 触发一个不存在的事件
console.log("\n--- 测试 5: 触发不存在的事件 ---");
emitter.emit('nonexistent-event', 'some-data');
console.log("测试 5: (如果没有输出，说明测试通过)");

// 测试 6: 解除一个不存在的监听器
console.log("\n--- 测试 6: 解除不存在的监听器 ---");
const nonExistentCb = () => {};
emitter.off('greet', nonExistentCb);
emitter.emit('greet', 'Again'); // 预期输出: "测试 1: Hello, Again!"

// 测试 7: 监听器在执行过程中解除自身
console.log("\n--- 测试 7: 监听器解除自身 (once 的模拟) ---");
let selfRemoveCount = 0;
const cb7 = () => {
    selfRemoveCount++;
    console.log(`测试 7: 我是 cb7，我被调用了 ${selfRemoveCount} 次。现在我要解除自己。`);
    emitter.off('self-remove', cb7);
};
emitter.on('self-remove', cb7);
console.log("第一次触发 'self-remove':");
emitter.emit('self-remove'); // 预期输出 cb7 的 log
console.log("第二次触发 'self-remove':");
emitter.emit('self-remove'); // 预期无 cb7 的 log
console.log(`测试 7: cb7 总共被调用了 ${selfRemoveCount} 次。`); // 预期: 1 次



// 要支持once, group, priority
// group是个对象，存的是 {唯一标识符：监听器}
// priorty是个数字，代表优先级，需要在emit的时候进行排序即可。
// listener = {callback, priority, once, group}
// once是on的特例，在emit的时候，使用off对callback进行移除即可。
// off(eventName, callback)，off是根据callback来移除对应的listener，先在events里面移除，然后要移除对应group的listener。
// emit(eventName, ...args)
// events和groups里面存的都是listener, 每次更新的时候，都要
// on(eventName, callback, option ={priority, once, group})
class EventEmitter2 {

}



