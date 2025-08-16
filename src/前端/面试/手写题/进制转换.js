

// - 微信：输入一个十进制数，转换成n进制的数（n小于16）

// 除基取余法
const decimalToBaseN = (num,n) => {
    if(n<2||n>16){
        return "Invaild Input"
    }
    // 处理0
    if(num === 0){
        return '0';
    }

    // 处理负数
    const isNegative = num < 0;
    if(isNegative){
        num = -num;
    }
    // 要做映射
    const mapp = '0123456789ABCDEF';
    let result = '';

    while(num>0){
        const remainder = num % n;
        result = mapp[remainder] + result;
        num = Math.floor(num / n);
    }

    return isNegative ? '-'+result : result;
}

// --- 测试用例 ---
console.log(`十进制 13 转换为 2 进制: ${decimalToBaseN(13, 2)}`);     // 输出: 1101
console.log(`十进制 255 转换为 16 进制: ${decimalToBaseN(255, 16)}`);  // 输出: FF
console.log(`十进制 100 转换为 8 进制: ${decimalToBaseN(100, 8)}`);     // 输出: 144
console.log(`十进制 -13 转换为 2 进制: ${decimalToBaseN(-13, 2)}`);    // 输出: -1101
console.log(`十进制 0 转换为 5 进制: ${decimalToBaseN(0, 5)}`);       // 输出: 0