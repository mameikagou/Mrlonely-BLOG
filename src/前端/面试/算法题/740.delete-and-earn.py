#
# @lc app=leetcode.cn id=740 lang=python3
# @lcpr version=30204
#
# [740] 删除并获得点数
#


# @lcpr-template-start

# @lcpr-template-end
# @lc code=start
class Solution:
    def rob(self,nums)->int:
        prev2=prev1 = 0
        for i in nums:
            prev2,prev1 = prev1,max(prev1,i+prev2)
        return prev1
    def deleteAndEarn(self, nums: List[int]) -> int:
        n = len(nums)
        cnt = [0] * (max(nums)+1)
        for i in nums:
            cnt[i]+=i
        if n==1:
            return nums[0]
        return self.rob(cnt)
           
# @lc code=end



#
# @lcpr case=start
# [3,4,2]\n
# @lcpr case=end

# @lcpr case=start
# [2,2,3,3,3,4]\n
# @lcpr case=end

#

