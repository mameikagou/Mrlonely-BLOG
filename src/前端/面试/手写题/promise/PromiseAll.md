# 手写 PromiseAll Promise.all

最直接的思路, 依次执行即可; 不能用 push, 因为返回的时间不好控制;


```js
const PromiseAll = (tasks) => {
  return new Promise((resolve, reject) => { //这样包裹是为了方便then
    const arr = Array.form(tasks);
    const len = arr.length;

    let res = [];
    let count = 0;

    for (let i = 0; i < len; i++) {
      Promise.resolve(arr[i])
        .then((item) => {
          res[i] = item;

          if (++count === len) {
            resolve(res); // 整体
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};
```

使用 Ts 的版本：

```ts
function PromiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  const arr = Array.from(promises);
  let count = 0;
  const res: T[] = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i])
        .then((item) => {
          res[i] = item;

          if (++count === arr.length) {
            resolve(res);
          }
        })
        .catch((e) => reject(e));
    }
  });
}
```

## 测试用例

```js
// 测试用例 1: 所有 Promise 都成功
let promises1 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

PromiseAll(promises1)
  .then((result) => {
    console.log(result); // 输出: [1, 2, 3]
  })
  .catch((error) => {
    console.error(error);
  });

// 测试用例 2: 一个 Promise 失败
let promises2 = [
  Promise.resolve(1),
  Promise.reject("error"),
  Promise.resolve(3),
];

PromiseAll(promises2)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error); // 输出: error
  });

// 测试用例 3: 空数组
let promises3 = [];

PromiseAll(promises3)
  .then((result) => {
    console.log(result); // 输出: []
  })
  .catch((error) => {
    console.error(error);
  });

// 测试用例 4: 混合值和 Promise
let promises4 = [1, Promise.resolve(2), 3];

PromiseAll(promises4)
  .then((result) => {
    console.log(result); // 输出: [1, 2, 3]
  })
  .catch((error) => {
    console.error(error);
  });
```



```js
const PromiseAll = (promises) => {

  let arr = Array.from(promises);

  const len = arr.length;

  let count = 0;

  let res = [];
   return new Promise((resolve, reject)=>{
    for(let i=0;i<arr.length;i++){

      Promise.resolve(arr[i]).then((item)=>{
        res[i] = item;
        if(++count === len){
          resolve()
        }
      }).catch(()=>reject())
    }
   })
}
```