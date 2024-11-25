
# 进制转换

## 概念
数码：数码是指在某个数制中使用的基本符号。

二进制（Binary）：数码只有两个，分别是 0 和 1。
十进制（Decimal）：数码有十个，分别是 0 到 9。

基数：
二进制的0和1，十进制的0到9；

如16进制：数码是0-9、A-F，基数是16。

位权：
数码”1“在不同位置表示的值，二进制的2的i次方


## 十进制转二进制
除2取余法

```ts
function decimalToBinary(decimal:number):string{
    let binary = "";
    while(decimal > 0){
        binary = (decimal%2) + binary;
        decimal = Math.floor(decimal/2);
    }
    return binary;
}

console.log(decimalToBinary(13)); //1101
```

## 二转十六

```ts
function binaryToHex(binary: string) {

    // 2 to 10 to 16
    while(binary.length%4!==0){
        // 往前补0;
        binary = '0' + binary;
    }

    const binaryToHexMap: { [key: string]: string } = {
        '0000': '0', '0001': '1', '0010': '2', '0011': '3',
        '0100': '4', '0101': '5', '0110': '6', '0111': '7',
        '1000': '8', '1001': '9', '1010': 'A', '1011': 'B',
        '1100': 'C', '1101': 'D', '1110': 'E', '1111': 'F'
    };
    let hex = '';
    for(let i=0;i<binary.length;i+=4){
        const fourbits = binary.substring(i,i+4);
        hex += binaryToHexMap[fourbits];
    }
    return hex;
}

console.log(binaryToHex('11010110')); // 输出: D6
console.log(binaryToHex('11111111')); // 输出: 
```

## 机器数、补码

- 机器数（Machine Number）
机器数是计算机内部使用的**二进制数**，用于表示和处理数据，机器数可以是有符号数或无符号数。

- 补码（Two's Complement）
正数的补码：正数的补码与其原码相同。
负数的补码：负数的补码是将其绝对值的二进制表示取反（即每个位取反），然后加1。

通常，补码表示法中，最高位（最左边的一位）是符号位：0 表示正数，1 表示负数

- 真值（True Value）
真值的表示方式与机器数和补码不同，它是人类理解和使用的数值。

举例：

正数的补码：

- 5 的二进制表示是 00000101，其补码也是 00000101。
负数的补码：

- -5 的绝对值是 5，其二进制表示是 00000101。
取反得到 11111010。
加1得到 11111011，这就是 -5 的补码。

- 真值：

00000101 的真值是 5。
11111011 的真值是 -5。
-+