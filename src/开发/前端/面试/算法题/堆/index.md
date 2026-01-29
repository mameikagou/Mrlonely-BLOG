# 2336.无限集中的最小数字

<https://leetcode.cn/problems/smallest-number-in-infinite-set/description/>

```md
现有一个包含所有正整数的集合 [1, 2, 3, 4, 5, ...] 。

实现 SmallestInfiniteSet 类：

SmallestInfiniteSet() 初始化 SmallestInfiniteSet 对象以包含 所有 正整数。
int popSmallest() 移除 并返回该无限集中的最小整数。
void addBack(int num) 如果正整数 num 不 存在于无限集中，则将一个 num 添加 到该无限集中。
 

示例：

输入
["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
[[], [2], [], [], [], [1], [], [], []]
输出
[null, null, 1, 2, 3, null, 1, 4, 5]

解释
SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
smallestInfiniteSet.addBack(2);    // 2 已经在集合中，所以不做任何变更。
smallestInfiniteSet.popSmallest(); // 返回 1 ，因为 1 是最小的整数，并将其从集合中移除。
smallestInfiniteSet.popSmallest(); // 返回 2 ，并将其从集合中移除。
smallestInfiniteSet.popSmallest(); // 返回 3 ，并将其从集合中移除。
smallestInfiniteSet.addBack(1);    // 将 1 添加到该集合中。
smallestInfiniteSet.popSmallest(); // 返回 1 ，因为 1 在上一步中被添加到集合中，
                                   // 且 1 是最小的整数，并将其从集合中移除。
smallestInfiniteSet.popSmallest(); // 返回 4 ，并将其从集合中移除。
smallestInfiniteSet.popSmallest(); // 返回 5 ，并将其从集合中移除。
 

提示：

1 <= num <= 1000
最多调用 popSmallest 和 addBack 方法 共计 1000 次
```

```md
维护一个数据
thres表示最小的数，表示所有大于thres的数都在类中；

set表示比thres小的数的集合

pq, MinPriorityQueue，表示插入的数

两种操作：
1，删除最小的数
set非空时，删除set中最小的数，否则删除thres，并且将thres+1

2，添加正整数
判断它小于thres时并且不在set当中
```

```ts
class SmallestInfiniteSet {
    private thres: number;
    private set: Set<number>;
    private pq: typeof MinPriorityQueue;

    constructor() {
        this.thres = 1
        this.set = new Set()
        this.pq = new MinPriorityQueue();
    }

    popSmallest(): number {
        let ans = 0
        if(this.set.size===0){
            ans = this.thres
            this.thres++
            return ans
        }
        ans = this.pq.dequeue().element
        this.set.delete(ans)
        return ans
    }

    addBack(num: number): void {
        if(!this.set.has(num) && num < this.thres){
            this.set.add(num)
            this.pq.enqueue(num)
        }
    }
}

/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * var obj = new SmallestInfiniteSet()
 * var param_1 = obj.popSmallest()
 * obj.addBack(num)
 */
```