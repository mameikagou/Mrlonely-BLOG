#
# @lc app=leetcode.cn id=1283 lang=python3
# @lcpr version=30204
#
# [1283] 使结果不超过阈值的最小除数
#


# @lcpr-template-start

# @lcpr-template-end
# @lc code=start
class Solution:
    def smallestDivisor(self, nums: List[int], threshold: int) -> int:
        left = 1
        right = max(nums)
        while left <= right:
            mid = left + (right-left)//2
            totalSum = sum(math.ceil(x/mid) for x in nums)
            if totalSum <= threshold:
                right = mid - 1
            else:
                left = mid + 1
        return left
# @lc code=end



#
# @lcpr case=start
# [1,2,5,9]\n6\n
# @lcpr case=end

# @lcpr case=start
# [2,3,5,7,11]\n11\n
# @lcpr case=end

# @lcpr case=start
# [19]\n5\n
# @lcpr case=end

#

