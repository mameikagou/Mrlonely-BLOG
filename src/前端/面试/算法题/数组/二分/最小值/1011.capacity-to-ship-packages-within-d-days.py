#
# @lc app=leetcode.cn id=1011 lang=python3
# @lcpr version=30204
#
# [1011] 在 D 天内送达包裹的能力
#


# @lcpr-template-start

# @lcpr-template-end
# @lc code=start
class Solution:
    def canShip(self, weights,capacity,days):
        cur_load = 0
        need_days = 1
        for weight in weights:
            if weight > capacity:
                return False
            if cur_load + weight > capacity:
                need_days+=1
                cur_load = weight
            else:
                cur_load += weight 
        return need_days <= days
    def shipWithinDays(self, weights: List[int], days: int) -> int:
        left = max(weights)-1
        right = sum(weights)+1
        while left+1 < right:
            mid = left + (right-left)//2
            if self.canShip(weights,mid,days):
                right = mid
            else:
                left = mid
        return right


# @lc code=end



#
# @lcpr case=start
# [1,2,3,4,5,6,7,8,9,10]\n5\n
# @lcpr case=end

# @lcpr case=start
# [3,2,2,4,1,4]\n3\n
# @lcpr case=end

# @lcpr case=start
# [1,2,3,1,1]\n4\n
# @lcpr case=end

#

