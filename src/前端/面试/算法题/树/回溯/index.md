
### 回溯三问

- 当前操作？
- 子问题？
- 下一个子问题？

#### 子集型回溯
(17. 电话号码的字母组合)<https://leetcode.cn/problems/letter-combinations-of-a-phone-number/discussion/>

这题类似下面的全排列；

回溯有”增量“构造答案的过程，通常用递归实现；

子集型： 每个元素都可以”选“或者“不选”；

```ts
function letterCombinations(digits: string): string[] {
    const len = digits.length;
    if(!len) return [];

    const mapping = ['','',"abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"];

    const res:string[] = [];

    const path:string[] = [];


    const dfs = (i:number) =>{
        if(i===len){
            res.push(path.join(""));
            return;
        }
        const list = mapping[Number.parseInt(digits[i])].split('')
        for(const c of list){

            // 这里是每一层都必选；选了的特征是，先加path再dfs；（相对于下面的“子集”来说）
            path[i] = c;
            dfs(i+1)
        }

    }
    dfs(0);
    return res;
};
```

(78.子集)<https://leetcode.cn/problems/subsets/description/>

- 当前操作？ 枚举第i个数，选或者不选； 
- 子问题？从下标>=i的数字中构造子集
- 下一个子问题？ 从下标>=i+1的数字中构造子集

为什么“求子集”的循环需要 startIndex？
目标：避免产生重复的组合，并确保每个元素只被考虑一次。
在求子集 [1, 2, 3] 时，当我们选择了 1 之后，我们的“选择列表”就只应该剩下 [2, 3]。我们永远不应该回头再去选择 1，也不应该在选择了 2 之后再回头去选择 1，否则就会产生 {2, 1} 这样的重复组合。
startIndex 参数就是实现这个“永不回头”机制的关键。

```ts
function subsets(nums: number[]): number[][] {
  const result = []; // 存放所有子集
  const path = [];   // 存放当前路径（一个子集）

  // 定义回溯函数
  // startIndex: 本轮选择的起始位置
  function backtrack(startIndex) {
    // 1. 将当前路径的拷贝加入结果集
    //    这里需要拷贝一份，因为 path 是引用类型，后续会变化
    result.push([...path]);

    // 如果起始索引已经越界，就没得选了，递归终止
    if (startIndex >= nums.length) {
      return;
    }

    // 2. 遍历选择列表
    for (let i = startIndex; i < nums.length; i++) {
      // 做选择
      path.push(nums[i]);
      // 递归进入下一层决策
      backtrack(i + 1);
      // 撤销选择（回溯）
      path.pop();
    }
  }

  // 从索引 0 开始启动回溯
  backtrack(0);
  return result;
};
```

<!-- TODO：子集的第二种模版 -->
bilibili:<https://www.bilibili.com/video/BV1mG4y1A7Gu/?vd_source=9529002c63d8eefaf57e87e2c8193594&spm_id_from=333.788.videopod.sections>

#### 排列型回溯

(46.全排列)<https://leetcode.cn/problems/permutations/description/>

- 当前操作？ 从nums中枚举要填入的数字
- 子问题？ 构造排列 >= i , 剩余部分为未选的 
- 下一个子问题？ 考虑i+1，s中除去该元素的部分

目标：在排列的每一个位置上，我们都有机会选择任何一个“尚未被使用”的元素。
在求全排列 [1, 2, 3] 时，当我们为排列的第一个位置选择元素时，我们可以选 1、2 或 3。当我们选定了第一个位置（比如是 2）之后，为第二个位置选择元素时，我们的选择列表是剩下的 [1, 3]。
这意味着，在递归的每一层，我们都需要扫描整个原始数组，来寻找那个“还没有被用过”的元素。

```js
// ts中不方便直接删除一个元素，所以用一个数组来做标记
var permute = function(nums) {
    
    let result = [];
    let path = [];
    let used = new Array(nums.length).fill(false);

    const dfs = (startIndex) =>{
        if(path.length===nums.length) result.push([...path]);

        for(let i = 0;i<nums.length;i++){
            if(used[i]) continue;
            path.push(nums[i]);
            used[i] = true;

            dfs(i+1);
            path.pop();
            used[i] = false;
        }
    }
    dfs(0)
    return result;
};
```


原地更改的做法
```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    
    let result = [];
    
    const dfs = (j) => {
        if(j === nums.length){
            result.push(nums.slice());
            return;
        }

        for(let i=j;i<nums.length;i++){
            [nums[j],nums[i]] = [nums[i],nums[j]];
            dfs(j+1);
            [nums[j],nums[i]] = [nums[i],nums[j]];
        }
    }
    dfs(0);
    return result;
};
```


#### 组合
<https://leetcode.cn/problems/combinations/description/>

当找到一个符合条件的解之后，是否需要立即 return，取决于“继续沿着当前路径往下走，还有没有可能找到更多的、不同的、符合条件的解？

显然，组合这里不用。
```js
var combine = function(n, k) {
    // 不能回头且限制长度为2
    let result = [];
    let path = [];
    let count = 0;
    const dfs = (startIndex) => {
        if(count===k){
            result.push(path.slice());
            return;  // 组合不必递归到底，所以提前返回
        }
        for(let i=startIndex;i<n+1;i++){
            path.push(i);
            count++;
            dfs(i+1);
            count--;
            path.pop();
        }
    }
    dfs(1);
    return result;
};
```