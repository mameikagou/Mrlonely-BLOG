
// 手写订阅发布模式
class EventEmitter {
    events
    constructor(){
        this.events = new Map();
    }
    
    // 监听
    on(eventName, callback){
        if(!this.events.get(eventName)){
            this.events.set(eventName,[]);
        }
        this.events.get(eventName).push(callback);
    }

    // 触发所有回调，注意要避免被清除的,传入参数
    emit(eventName, ...args){
        const callbacks = this.events.get(eventName);
        if(!callbacks) return;

        [...callbacks].map(callback=>callback(args));
    }

    // 注销
    off(eventName, callback){
        const callbacks = this.events.get(eventName);
        if(!callbacks) return;

        const newCallbacks = callbacks.filter(cb => cb !== callback);

        this.events.set(eventName, newCallbacks);
    }
}