


### minSum系列

无关前缀和的前置题目：


121. 买卖股票的最佳时机
<https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/>


sum-minSum 表示minSum到当前sum的最大和

```js
// 维护一个最小值即可, 在用当前值去减最小值就行；

var maxProfit = function(prices) {

    const len = prices.length;

    let minSum = Number.POSITIVE_INFINITY;
    let max = 0;

    for(let i=0;i<len;i++){
        max = Math.max(max, prices[i]-minSum);
        minSum = Math.min(prices[i], minSum);
    }
    return max;
}
```


[53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/description/)

经典前缀和，得结合前面的内容才能看懂

```ts
function maxSubArray(nums: number[]): number {
    if(!nums.length) return 0
    let sum = 0;
    let max = -Infinity;
    let minSum = 0;
    let len = nums.length;

    for(let i=0;i<len;i++){
        sum += nums[i];
        // minSum叠加了到当前项目的最小前缀和；
        // sum-minSum就是指从minSum到当前sum的子数组和；它是连续的嘛;
        max = Math.max(max, sum-minSum);
        minSum = Math.min(sum, minSum); // 最小的前缀和，那么相减就是最大的；
    }
    return max;
};

```

本题的dp做法:dp保存 “到目前为止的”最大的子数组和;

也比较直接，是正数就加，不是就置为0；
```ts
function maxSubArray(nums: number[]): number {
    if(!nums.length) return 0
    let dp = []; // 这题因为有负数，所以不能提前赋值；直接设置为空就行；
    dp[0] = nums[0]; // 注意求的是值，不是个数，所以直接设置为第一个元素的大小就行；

    const len = nums.length;

    for(let i=1;i<len;i++){
        dp[i] = Math.max(dp[i-1], 0)+nums[i]
    }

    return Math.max(...dp)
}
```