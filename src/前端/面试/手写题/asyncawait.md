/**
 * 一个优雅的 async/await 实现。
 * 它的核心是一个接收 Generator 函数的转换器，
 * 返回一个能够自动执行该 Generator 的新函数。
 *
 * @param {Function} generatorFunc - 一个 Generator 函数 (例如 function* myGen() { ... })
 * @returns {Function} - 一个新的函数，其行为与 async 函数一致，返回一个 Promise。
 */
function asyncToGenerator(generatorFunc) {
  // 返回一个新的函数，这个函数就是我们模拟的 async 函数。
  return function(...args) {
    // 1. 调用原始的 generator 函数，获取一个 generator 对象（迭代器）。
    //    使用 apply 来确保正确的 this 指向和参数传递。
    const gen = generatorFunc.apply(this, args);

    // 2. 返回一个 Promise，这是 async 函数的标配。
    return new Promise((resolve, reject) => {
      
      /**
       * 内部的“执行器”函数，负责驱动 generator 的执行。
       * @param {String} key - 'next' 或 'throw'，决定是正常执行还是抛出异常。
       * @param {*} arg - 传递给 generator 的上一步的结果或错误。
       */
      function step(key, arg) {
        let generatorResult;

        // 3. 执行 generator，并捕获可能发生的同步错误。
        try {
          generatorResult = gen[key](arg); // 相当于 gen.next(arg) 或 gen.throw(arg)
        } catch (error) {
          // 如果 generator 内部出错，直接 reject 整个 Promise。
          return reject(error);
        }

        // 从执行结果中解构出 value 和 done。
        const { value, done } = generatorResult;

        if (done) {
          // 4. 如果 generator 执行完毕 (done is true)，
          //    用最终的返回值 resolve 整个 Promise。
          return resolve(value);
        } else {
          // 5. 如果 generator 还未执行完毕，
          //    value 就是 yield 后面跟着的值（通常是一个 Promise）。
          //    我们用 Promise.resolve() 包装它，以兼容所有类型的值。
          return Promise.resolve(value).then(
            // 6. 当 Promise 成功时，将结果作为参数，继续下一步的执行。
            (res) => {
              step('next', res);
            },
            // 7. 当 Promise 失败时，将错误“抛”回 generator 内部，
            //    这样 generator 中的 try...catch 就可以捕获到。
            (err) => {
              step('throw', err);
            }
          );
        }
      }

      // 8. 启动执行器，开始第一步。
      step('next');
    });
  };
}

// 模拟一个异步 API
function sleep(ms, data) {
  return new Promise(resolve => setTimeout(() => resolve(data), ms));
}

// 使用 generator 函数来定义我们的异步流程
const myAsyncProcess = asyncToGenerator(function* (startValue) {
  console.log('开始执行，初始值:', startValue);
  
  try {
    const result1 = yield sleep(1000, '结果1');
    console.log('第一步完成:', result1);

    const result2 = yield sleep(1500, '结果2');
    console.log('第二步完成:', result2);
    
    // 模拟一个失败的 Promise
    // yield Promise.reject('出错了！');

    return '全部执行成功！';
  } catch (e) {
    console.error('在 Generator 内部捕获到错误:', e);
    return '执行失败';
  }
});

// 调用我们“创建”的 async 函数
myAsyncProcess('Hello').then(finalResult => {
  console.log('Promise 的最终结果:', finalResult);
});

// --- 控制台输出 ---
// 开始执行，初始值: Hello
// (等待 1 秒)
// 第一步完成: 结果1
// (等待 1.5 秒)
// 第二步完成: 结果2
// Promise 的最终结果: 全部执行成功！