
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

```ts
function subsets(nums: number[]): number[][] {
    const len = nums.length;
    if(!len) return []
    const res:number[][] = [];
    const path:number[] = [];

    const dfs = (i:number)=>{

        if(i===len){ // 到达叶子节点的时候直接推入答案；
            res.push([...path]);
            return;
        }

        // 分支1: 不选当前元素nums[i]
        dfs(i+1);

        // 分支2: 选当前元素nums[i]
        path.push(nums[i]);
        dfs(i+1);
        path.pop(); // 回溯，撤销选择；递归前如何，递归后也如何；
    }
    dfs(0);
    return res;
};
```

<!-- TODO：子集的第二种模版 -->
bilibili:<https://www.bilibili.com/video/BV1mG4y1A7Gu/?vd_source=9529002c63d8eefaf57e87e2c8193594&spm_id_from=333.788.videopod.sections>

#### 排列型回溯

(46.全排列)<https://leetcode.cn/problems/permutations/description/>

- 当前操作？ 从nums中枚举要填入的数字
- 子问题？ 构造排列 >= i , 剩余部分为未选的 
- 下一个子问题？ 考虑i+1，s中除去该元素的部分

```ts
// ts中不方便直接删除一个元素，所以用一个数组来做标记
function permute(nums: number[]): number[][] {
    const len = nums.length;
    const res: number[][] = [];
    const path:number[] = [];
    const used: boolean[] = new Array(len).fill(false);

    const dfs = (i:number) =>{
        if(i===len){
            res.push([...path])
        }
        for(let j=0;j<len;j++){
            if(used[j]) continue;
            path[i] = nums[j];
            used[j] = true;

            dfs(i+1);
            // 回溯
            used[j] = false;
        }
    }
    return res;
}

```