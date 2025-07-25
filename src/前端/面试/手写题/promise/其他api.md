
```js
1. Promise.race
返回第一个完成（成功或失败）的 Promise：
jsApplyCancelconst PromiseRace = (promises) => {
  return new Promise((resolve, reject) => {
    const arr = Array.from(promises);
    
    // 空数组的话永远不会 resolve 或 reject
    if (arr.length === 0) {
      return; // 保持 pending 状态
    }
    
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i])
        .then(resolve)  // 第一个成功就 resolve
        .catch(reject); // 第一个失败就 reject
    }
  });
};

// TypeScript 版本
function PromiseRace<T>(promises: Promise<T>[]): Promise<T> {
  return new Promise((resolve, reject) => {
    const arr = Array.from(promises);
    
    if (arr.length === 0) {
      return;
    }
    
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i])
        .then(resolve)
        .catch(reject);
    }
  });
}
收起...
2. Promise.allSettled
等待所有 Promise 完成，无论成功失败都返回结果：
jsApplyCancelconst PromiseAllSettled = (promises) => {
  return new Promise((resolve) => {
    const arr = Array.from(promises);
    const len = arr.length;
    
    if (len === 0) {
      resolve([]);
      return;
    }
    
    let count = 0;
    const results = [];
    
    for (let i = 0; i < len; i++) {
      Promise.resolve(arr[i])
        .then((value) => {
          results[i] = { 
            status: 'fulfilled', 
            value: value 
          };
          
          if (++count === len) {
            resolve(results);
          }
        })
        .catch((reason) => {
          results[i] = { 
            status: 'rejected', 
            reason: reason 
          };
          
          if (++count === len) {
            resolve(results);
          }
        });
    }
  });
};

// TypeScript 版本
type SettledResult<T> = 
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: any };

function PromiseAllSettled<T>(
  promises: Promise<T>[]
): Promise<SettledResult<T>[]> {
  return new Promise((resolve) => {
    const arr = Array.from(promises);
    const len = arr.length;
    
    if (len === 0) {
      resolve([]);
      return;
    }
    
    let count = 0;
    const results: SettledResult<T>[] = [];
    
    for (let i = 0; i < len; i++) {
      Promise.resolve(arr[i])
        .then((value) => {
          results[i] = { status: 'fulfilled', value };
          if (++count === len) resolve(results);
        })
        .catch((reason) => {
          results[i] = { status: 'rejected', reason };
          if (++count === len) resolve(results);
        });
    }
  });
}
展开...
3. Promise.any
返回第一个成功的 Promise，所有都失败才 reject：
jsApplyCancelconst PromiseAny = (promises) => {
  return new Promise((resolve, reject) => {
    const arr = Array.from(promises);
    const len = arr.length;
    
    if (len === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }
    
    let rejectionCount = 0;
    const errors = [];
    
    for (let i = 0; i < len; i++) {
      Promise.resolve(arr[i])
        .then(resolve) // 任意一个成功就直接 resolve
        .catch((error) => {
          errors[i] = error;
          
          if (++rejectionCount === len) {
            // 所有都失败才 reject
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    }
  });
};

// TypeScript 版本
function PromiseAny<T>(promises: Promise<T>[]): Promise<T> {
  return new Promise((resolve, reject) => {
    const arr = Array.from(promises);
    const len = arr.length;
    
    if (len === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }
    
    let rejectionCount = 0;
    const errors: any[] = [];
    
    for (let i = 0; i < len; i++) {
      Promise.resolve(arr[i])
        .then(resolve)
        .catch((error) => {
          errors[i] = error;
          if (++rejectionCount === len) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    }
  });
}
收起...
4. Promise.resolve
将值转换为 resolved 的 Promise：
jsApplyCancelconst PromiseResolve = (value) => {
  // 如果已经是 Promise，直接返回
  if (value && typeof value.then === 'function') {
    return value;
  }
  
  // 如果是 thenable 对象
  if (value && typeof value === 'object' && typeof value.then === 'function') {
    return new Promise((resolve, reject) => {
      value.then(resolve, reject);
    });
  }
  
  // 普通值直接 resolve
  return new Promise((resolve) => {
    resolve(value);
  });
};

// TypeScript 版本
function PromiseResolve<T>(value: T | PromiseLike<T>): Promise<T> {
  if (value && typeof (value as any).then === 'function') {
    return Promise.resolve(value);
  }
  
  return new Promise((resolve) => {
    resolve(value as T);
  });
}
展开...
5. Promise.reject
创建一个 rejected 的 Promise：
jsApplyCancelconst PromiseReject = (reason) => {
  return new Promise((_, reject) => {
    reject(reason);
  });
};

// TypeScript 版本
function PromiseReject<T = never>(reason?: any): Promise<T> {
  return new Promise((_, reject) => {
    reject(reason);
  });
}
展开...
6. Promise.prototype.finally
无论成功失败都会执行的回调：
jsApplyCancelconst addFinally = (PromisePrototype) => {
  PromisePrototype.finally = function(callback) {
    return this.then(
      (value) => {
        return Promise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return Promise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  };
};

// 使用方法
addFinally(Promise.prototype);

// TypeScript 接口扩展
declare global {
  interface Promise<T> {
    finally(onfinally?: (() => void) | null): Promise<T>;
  }
}
展开...
完整测试用例
jsApplyCancel// Promise.race 测试
console.log('=== Promise.race 测试 ===');
const raceTest = [
  new Promise(resolve => setTimeout(() => resolve('fast'), 100)),
  new Promise(resolve => setTimeout(() => resolve('slow'), 500))
];

PromiseRace(raceTest).then(console.log); // 输出: 'fast'

// Promise.allSettled 测试
console.log('=== Promise.allSettled 测试 ===');
const settledTest = [
  Promise.resolve(1),
  Promise.reject('error'),
  Promise.resolve(3)
];

PromiseAllSettled(settledTest).then(console.log);
// 输出: [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: 'error' },
//   { status: 'fulfilled', value: 3 }
// ]

// Promise.any 测试
console.log('=== Promise.any 测试 ===');
const anyTest1 = [
  Promise.reject('error1'),
  Promise.resolve('success'),
  Promise.reject('error2')
];

PromiseAny(anyTest1).then(console.log); // 输出: 'success'

const anyTest2 = [
  Promise.reject('error1'),
  Promise.reject('error2'),
  Promise.reject('error3')
];

PromiseAny(anyTest2).catch(console.error); // 输出: AggregateError

// Promise.resolve 测试
console.log('=== Promise.resolve 测试 ===');
PromiseResolve(42).then(console.log); // 输出: 42
PromiseResolve(Promise.resolve('hello')).then(console.log); // 输出: 'hello'

// Promise.reject 测试
console.log('=== Promise.reject 测试 ===');
PromiseReject('something wrong').catch(console.error); // 输出: something wrong
展开...
核心区别总结
API成功条件失败条件特点Promise.all全部成功任意失败快速失败，保序返回Promise.race第一个完成第一个失败竞速模式Promise.allSettled总是成功从不失败容错模式，返回状态Promise.any任意成功全部失败容错模式，第一个成功Promise.resolve立即成功-值转 PromisePromise.reject-立即失败创建失败 Promise
这些实现帮你深入理解 Promise 的并发控制和状态管理机制！每个 API 都有其特定的使用场景。
```