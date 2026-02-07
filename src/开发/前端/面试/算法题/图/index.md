<https://leetcode.cn/problems/course-schedule/submissions/582258991/>

```ts
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // 统计所有节点的入度：查看有哪些节点指向它；
    // 统计所有节点的依赖关系；

    // 把所有没有依赖的节点放入队列；

    // 然后从该节点开始查询，一边查询，一边把新产生的符合条件的节点放进去；

    const ingree = new Array(numCourses).fill(0);
    // amap[i] 代表课程 i 的所有后继课程（依赖于课程 i 的课程）;
    // amap[i][j] 表示依赖于i的第j个课程编号;
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


200.岛屿数量：<https://leetcode.cn/problems/number-of-islands/description/?envType=study-plan-v2&envId=top-100-liked>

模板如下：

```js
function numIslands(grid: string[][]): number {
    
    let count = 0;
    for(let i=0;i<grid.length;i++){
        for(let j=0;j<grid[0].length;j++){
            if(grid[i][j]==='1'){
                count++;
                turntowater(grid,i,j);
            }
        }
    }

    return count;
};

const turntowater = (grid,i,j) => {
    if(i<0 || j<0 || i>=grid.length || j>=grid[0].length || grid[i][j] !== '1'){
        return;
    }

    grid[i][j] = '2' // 标记走过了。

    turntowater(grid, i+1, j);
    turntowater(grid, i, j+1);
    turntowater(grid, i-1, j);
    turntowater(grid, i, j-1);

    return ;
}
```


相似题目：
- https://leetcode.cn/problems/max-area-of-island/

#### 层序遍历版
994. 腐烂的橘子 <https://leetcode.cn/problems/rotting-oranges>

```js
var orangesRotting = function(grid) {
    
    // 加个队列，层序遍历。

    let queue = [];
    let freshCount = 0;
    let minutes = 0;

    // 保存矩阵的行和列
    const rows = grid.length;
    const cols = grid[0].length;

    // 统计新鲜和腐烂的橘子。1是腐烂，2 是新鲜。
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if(grid[i][j] === 1){
                freshCount++;
            }
            if(grid[i][j] === 2){
                queue.push([i,j]);
            }
        }
    }
    // 没有新鲜的，所以腐烂时间是 0。
    if(freshCount===0) return 0;

    // 引擎层的大循环
    while(freshCount > 0 && queue.length >0){
        // 快照队列
        const size = queue.length;

        // 这里算的是每分钟发生的事
        // 遍历腐烂橘子的队列。
        for(let i=0;i<size;i++){

            const [r, c] = queue.shift(); // 取出一个橘子
            
            const directions = [[0,1],[1,0],[-1,0],[0,-1]]
            //  然后算他的影响
            for(const [dr,dc] of directions){
                const newr = r+dr;
                const newc = c+dc;

                if(newr <0 || newr>=rows || newc<0|| newc>=cols || grid[newr][newc] !== 1){
                    continue;
                }
                grid[newr][newc] = 2;
                freshCount--;

                // 同时层序遍历，算新内容的影响。
                queue.push([newr,newc]);
            }

        }
        // 每个队列是每分钟发生的事。
        minutes++;
    }

    return freshCount === 0 ? minutes : -1;
};
```