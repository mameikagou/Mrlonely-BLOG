#
# @lc app=leetcode.cn id=213 lang=python3
# @lcpr version=30204
#
# [213] 打家劫舍 II
#


# @lcpr-template-start

# @lcpr-template-end
# @lc code=start
class Solution:
    def rob1(self, nums: List[int]) -> int:
        if not nums:
            return 0
        n = len(nums)
        if n==1:
            return nums[0]
        prev2,prev1 = nums[0],max(nums[0],nums[1])
        for i in range(2,n):
            curr = max(prev1,prev2+nums[i])
            prev2,prev1 = prev1, curr
        return prev1
    def rob(self, nums: List[int]) -> int:
        n = len(nums)
        if n==0:
            return 0
        if n==1:
            return nums[0]
        if n==2:
            return max(nums[1],nums[0])
        
        return max(self.rob1(nums[0:n-1]),self.rob1(nums[1:n]))
        
# @lc code=end



#
# @lcpr case=start
# [2,3,2]\n
# @lcpr case=end

# @lcpr case=start
# [1,2,3,1]\n
# @lcpr case=end

# @lcpr case=start
# [1,2,3]\n
# @lcpr case=end

#

