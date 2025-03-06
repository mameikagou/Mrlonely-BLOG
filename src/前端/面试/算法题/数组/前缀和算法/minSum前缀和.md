


### minSum系列

无关前缀和的前置题目：


121. 买卖股票的最佳时机
<https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/>


sum-minSum 表示minSum到当前sum的最大和

```js
// 维护一个最小值即可

var maxProfit = function(prices) {

    const len = prices.length;

    let minSum = Infinity;
    let max = 0;

    for(let i=0;i<len;i++){
        max = Math.max(max, prices[i]-minSum);
        minSum = Math.min(prices[i], minSum);
    }
    return max;
}
```


52. 最大子数组和

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

本题的dp做法:dp保存最大的子数组和;也比较直接，是正数就加，不是就置为0；
```ts
function maxSubArray(nums: number[]): number {
    if(!nums.length) return 0
    let dp = [];
    dp[0] = nums[0];

    const len = nums.length;

    for(let i=1;i<len;i++){
        dp[i] = Math.max(dp[i-1], 0)+nums[i]
    }

    return Math.max(...dp)
}
```