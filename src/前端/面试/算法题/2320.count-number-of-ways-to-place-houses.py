#
# @lc app=leetcode.cn id=2320 lang=python3
# @lcpr version=30204
#
# [2320] 统计放置房子的方式数
#


# @lcpr-template-start

# @lcpr-template-end
# @lc code=start
class Solution:
    def countHousePlacements(self, n: int) -> int:
        
        mod = 10**9+7
        if n == 0:
            return 0
        dp = [0] * (10**4+1)
        dp[0] = 1
        dp[1] = 2

        for i in range(2,10**4+1):
            dp[i] = (dp[i-1] + dp[i-2]) % mod
        
        res = (dp[n]%mod)**2

        return res % mod

# @lc code=end



#
# @lcpr case=start
# 1\n
# @lcpr case=end

# @lcpr case=start
# 1000\n
# @lcpr case=end

#

