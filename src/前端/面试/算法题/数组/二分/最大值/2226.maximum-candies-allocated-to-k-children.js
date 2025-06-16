/*
 * @lc app=leetcode.cn id=2226 lang=javascript
 * @lcpr version=30204
 *
 * [2226] 每个小孩最多能分到多少糖果
 */


// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * @param {number[]} candies
 * @param {number} k
 * @return {number}
 */
var maximumCandies = function(candies, k) {
    let left = 0
    let right = Math.max(...candies) + 1
    const canAllocate = (candies, pile, k) =>{
        let count =0 ;
        for(const val of candies){
            count += Math.floor(val/pile)
        }
        return count >= k
    }
    while(left + 1 < right) {
        const mid = left + Math.floor((right - left) / 2);
        if(canAllocate(candies, mid, k)) {
            left = mid;
        } else {
            right = mid;
        }
    }
    return left;
};
// @lc code=end



/*
// @lcpr case=start
// [5,8,6]\n3\n
// @lcpr case=end

// @lcpr case=start
// [2,5]\n11\n
// @lcpr case=end

 */

