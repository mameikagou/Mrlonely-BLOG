

题目求什么，就二分什么。

标准开区间写法：
```python
def binary_search(condition):
    left = min_possible - 1  # 确保答案在区间右侧
    right = max_possible + 1  # 确保答案在区间左侧
    
    while left + 1 < right:
        mid = left + (right - left) // 2
        if condition(mid):
            right = mid  # 收缩右边界
        else:
            left = mid   # 收缩左边界
    return right  # 返回第一个满足条件的值
```

以开区间二分为例：

- 求最小：check(mid) == true 时更新 right = mid，反之更新 left = mid，最后返回 right。
- 求最大：check(mid) == true 时更新 left = mid，反之更新 right = mid，最后返回 left。
- 对于开区间写法，简单来说 check(mid) == true 时更新的是谁，最后就返回谁。相比其他二分写法，开区间写法不需要思考加一减一等细节，推荐使用开区间写二分

```md
给你一个整数数组 citations ，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数，citations 已经按照 非降序排列 。计算并返回该研究者的 h 指数。

h 指数的定义：h 代表“高引用次数”（high citations），一名科研人员的 h 指数是指他（她）的 （n 篇论文中）至少 有 h 篇论文分别被引用了至少 h 次。

请你设计并实现对数时间复杂度的算法解决此问题。

 

示例 1：

输入：citations = [0,1,3,5,6]
输出：3
解释：给定数组表示研究者总共有 5 篇论文，每篇论文相应的被引用了 0, 1, 3, 5, 6 次。
     由于研究者有3篇论文每篇 至少 被引用了 3 次，其余两篇论文每篇被引用 不多于 3 次，所以她的 h 指数是 3 。
```

```python
class Solution:
    def isH(self, citations, h) -> bool:
        # 判断是否存在h篇论文的引用次数 >= h
        count = 0
        for cit in citations:
            if cit >= h:
                count +=1
        return count >= h
    def hIndex(self, citations: List[int]) -> int:
        if not citations:
            return 0
        left = 0
        right = len(citations)+1
        # 找最小的一个true，返回left
        while left +1 < right:
            mid = left + (right-left)//2
            if self.isH(citations,mid):
                left = mid # 更新left，找更大的。
            else:
                right = mid
        return left # 在求最大的题目中， check(mid) == true 时更新的是谁，最后就返回谁。
```

300. 最长递增子序列 <https://leetcode.cn/problems/longest-increasing-subsequence/description/>

二分+贪心写法

二分查找模板是 while(left + 1 < right)。这个模板在循环结束后：
left 指向的是 小于 num 的最后一个元素。
right 指向的是 大于或等于 num 的第一个元素。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if (!nums || nums.length === 0) {
        return 0; // 返回整数 0，而不是 null
    }

    const tail = [];
    for(const num of nums){ // 很巧妙，是在nums的子数组当中找
        
        let left =-1,right=tail.length+1;
        
        while(left+1<right){
            const mid = (left+right)>>1
            if(tail[mid]<num){
                left=mid; // 结束后的left：小于num的最后一个元素的索引
            }else{
                right=mid; // 结束后的right：大于等于num的第一个元素的索引；
            }
        }
        
        if(left === tail.length){
            tail.push(num)
        }else{
            tail[right] = num;  // 所以这样替换之后，值会更小；
        }
    }
    return tail.length;
};
```