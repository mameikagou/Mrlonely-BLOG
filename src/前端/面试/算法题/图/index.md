<https://leetcode.cn/problems/course-schedule/submissions/582258991/>

```ts
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // 统计所有节点的入度：查看有哪些节点指向它；
    // 统计所有节点的依赖关系；

    // 把所有没有依赖的节点放入队列；

    // 然后从该节点开始查询，一边查询，一边把新产生的符合条件的节点放进去；

    const ingree = new Array(numCourses).fill(0);
    const amap: number[][] = Array.from({ length: numCourses }, () => []);

    for (let i = 0; i < prerequisites.length; i++) {
        amap[prerequisites[i][0]].push(prerequisites[i][1]);
        ingree[prerequisites[i][1]]++;
    }

    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
        if (ingree[i] === 0) {
            queue.push(i);
        }
    }

    let count: number = 0;

    while (queue.length !== 0) {
        count++;
        const node = queue.shift() as number;

        for (let i = 0; i < amap[node].length; i++) {
            ingree[amap[node][i]]--;
            if (ingree[amap[node][i]] === 0) {
                queue.push(amap[node][i]);
            }
        }
    }
    return count === numCourses;
}
```
