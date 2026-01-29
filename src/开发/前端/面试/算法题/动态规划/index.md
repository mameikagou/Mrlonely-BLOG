### 三步法

每个dp都要思考的：

- dp含义是什么？
- dp[0] dp[1]等等内容的结果是什么？
- 状态方程如何推导
- 递归顺序是什么？从哪到哪？

- 记忆化搜索
  - 递归+缓存
  - 从上到下，从n到n-1
- DP迭代
  - for循环+dp数组
  - 从下到上，先算出dp[0]然后dp[1]

题目：假设你正在爬一个 n 阶的楼梯。你每次可以向上爬 1 阶、2 阶 或者 4
阶。请问，爬到楼顶（第 n
阶）一共有多少种不同的方法？（注意：不同的攀爬顺序被视为不同的方法。例如，1+2 和
2+1 是两种不同的方法。）

```js
// top-to-down
let memo = new Map();
const solve = (n) => {
  if (n === 0) return 1;
  if (n < 0) return 0;

  if (memo.has(n)) return memo.get(n);

  const result = solve(i - 1) + solve(i - 2) + solve(i - 4);
  memo.set(n, result);
  return result;
};

// bottom-to-top
const func2 = (n) => {
  // 初始化
  let dp = new Array(n + 1).fill(0);
  // basecase
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 3;
  for (let i = 4; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 4];
  }

  return dp[n];
};
```
