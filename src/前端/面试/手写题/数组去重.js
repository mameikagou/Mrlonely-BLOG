
// 数组去重（不用set和排序如何实现）

let arr =  [1,2,2,4,null,null,'3','abc',3,5,4,1,2,2,4,null,null,'3','abc',3,5,4] 
// [1, 2, 4, null, "3", "abc", 3, 5]

// 1. filter+indexOf
// 原理返回第一次出现的数
const RemoveDuplicates1 = (arr) => {
    return arr.filter((item,index)=>arr.indexOf(item) === index)
}

console.log("1",RemoveDuplicates1(arr));

// 2. 利用reduce的特性(它的callback的四个参数，累加值，当前值，当前值索引，整个数组)
const RemoveDuplicates2 = (arr) => {
    return arr.reduce((acc,cur)=>acc.includes(cur) ? acc : acc.concat(cur),[]);
}

console.log("2",RemoveDuplicates2(arr));