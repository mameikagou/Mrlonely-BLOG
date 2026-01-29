
## 二叉树

想想这三个问题：

- 一般来说，DFS 的递归边界是空节点。在什么情况下，要额外把叶子节点作为递归边界？
- 在什么情况下，DFS 需要有返回值？什么情况下不需要有返回值？
- 在什么情况下，题目更适合用自顶向下的方法解决？什么情况下更适合用自底向上的方法解决？

"递"（递进，下沉）：想象你在下山。你从山顶出发，每往下走一步，你都带着从山顶传下来的信息（比如“目前为止看到的最高海拔”），并在当前位置做判断。

“递”的模版代码：
```py
class Solution:
    def goodNodes(self, root: Optional[TreeNode]) -> int:
        # 储存结果
        ans = 0
        def dfs(root,maxNum):
            # 通用的结束条件
            if root is None:
                return 
            # 每题单独定制的处理逻辑
            if root.val >= maxNum:
                nonlocal ans
                ans+=1
            maxNum = max(maxNum,root.val)

            # 通用的递归
            dfs(root.left,maxNum)
            dfs(root.right,maxNum)
        dfs(root,root.val)
        return ans
```
"归"的模版代码

"归"（回归，上浮）：想象你在爬山。你必须先让你的左右两个探路先锋分别探完左右两条路（递归到底），他们回来告诉你结果（return 值），你再根据他们的结果，结合你当前位置的情况，得出最终结论并向上报告。
```py
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        # Base Case: 递归的终点，直接返回结果
        if p is None or q is None:
            return p is q  
        
        # “归”的过程：要计算当前节点的结果，必须先等待左右子树的结果
        # Python的 `and` 是短路的，它会从左到右依次执行
        
        # 1. 检查当前节点的值
        current_level_same = (p.val == q.val)
        
        # 2. “递”：向下调用，去问左子树是否相同
        left_subtree_same = self.isSameTree(p.left, q.left)
        
        # 3. “递”：向下调用，去问右子树是否相同
        right_subtree_same = self.isSameTree(p.right, q.right)
        
        # 4. “归”：左右子树都返回结果了，现在结合当前层的结果，计算最终值并return
        return current_level_same and left_subtree_same and right_subtree_same
```