#
# @lc app=leetcode.cn id=275 lang=python3
# @lcpr version=30204
#
# [275] H 指数 II
#


# @lcpr-template-start

# @lcpr-template-end
# @lc code=start
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
# @lc code=end



#
# @lcpr case=start
# [0,1,3,5,6]\n
# @lcpr case=end

# @lcpr case=start
# [1,2,100]\n
# @lcpr case=end

#

