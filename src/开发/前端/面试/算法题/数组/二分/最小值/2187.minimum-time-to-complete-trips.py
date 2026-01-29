#
# @lc app=leetcode.cn id=2187 lang=python3
# @lcpr version=30204
#
# [2187] 完成旅途的最少时间
#


# @lcpr-template-start

# @lcpr-template-end
# @lc code=start
class Solution:
    def minimumTime(self, time: List[int], totalTrips: int) -> int:
        left = 1
        right = min(time) * totalTrips

        while left <= right:
            mid = left + (right-left)//2
            sumTotal = sum((mid//x for x in time))
            if sumTotal >= totalTrips:
                right = mid - 1
            else:
                left = mid + 1
        return left
# @lc code=end



#
# @lcpr case=start
# [1,2,3]\n5\n
# @lcpr case=end

# @lcpr case=start
# [2]\n1\n
# @lcpr case=end

#

