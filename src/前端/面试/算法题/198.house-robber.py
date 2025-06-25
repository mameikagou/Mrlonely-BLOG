#
# @lc app=leetcode.cn id=198 lang=python3
# @lcpr version=30204
#
# [198] 打家劫舍
#


# @lcpr-template-start

# @lcpr-template-end
# @lc code=start
class Solution:
    def rob(self, nums: List[int]) -> int:
        if not nums:
            return 0
        n = len(nums)
        if n==1:
            return nums[0]
        prev2,prev1 = nums[0],max(nums[0],nums[1])

        for i in range(2,n):
            curr = max(prev1,prev2+nums[i])
            prev2,prev1 = prev1,curr
        return prev1
# @lc code=end



#
# @lcpr case=start
# [1,2,3,1]\n
# @lcpr case=end

# @lcpr case=start
# [2,7,9,3,1]\n
# @lcpr case=end

#

# @lcpr case=start
# [0]\n
# @lcpr case=end

#

# @lcpr case=start
# [1,3,1]\n
# @lcpr case=end

#