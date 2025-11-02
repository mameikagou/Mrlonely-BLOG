


function add(num){

    let currentSum = num;

    function innerAdd(nextNum) {
        currentSum += nextNum;
        return innerAdd;
    }

    innerAdd.cacl = function(){
        return currentSum;
    }

    return innerAdd;
}

// --- 测试 ---
const result3 = add(1)(2).cacl();
console.log(result3); // 输出: 3

const result6 = add(1)(2)(3).cacl();
console.log(result6); // 输出: 6

// 还可以这样
const add10 = add(10);
const result25 = add10(5)(5)(5).cacl();
console.log(result25); // 输出: 25