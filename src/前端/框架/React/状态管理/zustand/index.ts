
/**
 * 一个api，这里的先声明出来替代。作用是方便订阅外部存储，通过 selector 和 equalityFn 实现按需更新，避免无效渲染；同时有ssr支持。
 * @param subscribe 订阅函数：api.subscribe。
 * @param getClientState 获取客户端状态：api.getState。
 * @param getServerState 获取服务端状态：api.getState。
 * @param selector 计算最终状态：传入的 selector。
 * @param equalityFn 判断状态变化前后是否一致函数：equalityFn。
 * @returns 返回slice的值
 */
function useSyncExternalStoreWithSelector(subscribe, getClientState, getServerState,selector ,equalityFn) {
    throw new Error("Function not implemented.");
}
/**
 * 判断是否是函数
 * 应该又更严谨的实现，这里先简单判断一下typeof
 * @param value 
 * @returns 
 */
function isFunction(value) {
    return typeof value === 'function';
}

function notObject(value) {
    return typeof value !== 'object' || value === null;
}

type GetState<T> = () => T
// 整体更新，部分更新，函数式更新
type SetState<T> = (
    partial: T | Partial<T> | ((state:T)=>T | Partial<T>)
) => void;

// 获取它参数的第一个类型
type Subscribe = Parameters<typeof useSyncExternalStoreWithSelector>[0]

type StoreApi<T> = {
    setState: SetState<T>
    getState: GetState<T>
    subscribe: Subscribe
}
// 传的createState是一个箭头函数，返回值是状态本身
// increase: () => set(state => ({ bears: state.bears + 1 })), // 使用注入的set
type StateCreator<T> = (setState: SetState<T>) => T;



const createStore = <T>(createState: StateCreator<T>) => {
    const listeners = new Set<() => void>();
    let state;
    let getState = () => state;
    /**
     * 有三种可能的传入：完整的状态，部分的状态，函数
     * @param partial 
     */
    let setState: SetState<T> = (partial) => {
        const nextState = isFunction(partial) ? (partial as (state: T)=>T )(state) : partial;

        // 如果状态变化了，就进行合并整合（object.assign）或者替换
        if(!Object.is(state, nextState)){
            state = notObject(nextState) ? nextState : Object.assign({}, state, nextState);
        }
        // 通知所有订阅者
        listeners.forEach((listener)=>listener());
    };
    const subscribe: Subscribe = (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    const api: StoreApi<T> = {getState, setState, subscribe};
    state = createState(setState); // 闭包初始化为调用结果
    return api;
}

// 核心订阅逻辑
// selector 从全局store提取所需的数据片段。
// { count: 0, user: { name: 'Alice' } }
// const userNameSelector = (state) => state.user.name;
const useStore = <State, StateSlice>(api, selector, equalityFn) => {
    const slice = useSyncExternalStoreWithSelector(
        api.subscribe,
        api.getState,
        api.getState,
        selector,
        equalityFn,
    );
    return slice;
};

// create工厂函数
export const create = (createState) =>{
    const api = createStore(createState); // 拿到store，以及其方法

    // 绑定create和useStore，接收selector
    const useBoundStore = (selector, equalityFn) =>{
        useStore(api, selector, equalityFn)
    }

    return useBoundStore;
}

const shallow = <T extends object>(objA: T, objB: T) => {

    if(Object.is(objA, objB)){
        return true;
    }

    if(notObject(objA) || notObject(objB)){
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if(keysA.length !== keysB.length){
        return false;
    }
    
    for(let i=0; i<keysA.length; i++){
        const key = keysA[i];
        // 检查B中是否存在keysA中的key
        if(!Object.prototype.hasOwnProperty.call(objB, key) || !Object.is(objA[key], objB[key])){
            return false;
        }
    }

    return true;
}