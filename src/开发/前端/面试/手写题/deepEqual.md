


### 对象判等 deepEqual 深比较

- "==="，只有字面量相等，或者对象指向的地址相同的时候才相等
- 判断非对象或者为null的情况，都是false
- 要处理循环引用的情况，用map或者set来存
- 处理数组，先比较长度，然后一个一个依次递归比较；
    - 注意typeof Array的结果也是Object，应该用Object.isArray再次判断
    - 处理一个是数组一个不是数组的情况
- 用Object.keys获取所有属性，然后依次遍历、递归obj[key]比较即可

- for in 还会遍历原型链上的东西,还要使用hasOwnProperty。

