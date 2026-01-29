
// 假设你正在爬一个 n 阶的楼梯。你每次可以向上爬 1 阶、2 阶 或者 4 阶。请问，爬到楼顶（第 n 阶）一共有多少种不同的方法？
// （注意：不同的攀爬顺序被视为不同的方法。例如，1+2 和 2+1 是两种不同的方法。）


// 从下往上跑, 排列的。1+2 和 2+1是两种方法。
function climbStairs(n) {
    if(!n) return 0;    

    const steps = [1,2,4];

    //  外层遍历容量
    for(let i=0;i<n;i++){
        // 内层遍历步长
        for(let step of steps){
            if(i>=step){
                dp[i] += dp[i-step];
            }
        }
    }

    return dp[i];
}