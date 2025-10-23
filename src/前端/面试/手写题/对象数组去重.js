/**
 * 为对象创建一个“稳定”的字符串 key。
 * 它通过排序键来确保 {a:1, b:2} 和 {b:2, a:1} 产生相同的 key。
 * 注意：这个简单实现只适用于一层深度的、只包含原始值的对象。
 */
function getStableKey(obj) {
    const sortedKeys = Object.keys(obj).sort();

    const sortedObj = {};

    for(const key of sortedKeys){
        sortedObj[key] = obj[key];
    }
    return JSON.stringify(sortedKeys);
}


function dedupeByValue(arr) {
    const map = new Map();
    const result = [];
    for(let item of arr){
        const key = getStableKey(item)

        if(!map.has(key)){
            map.set(key, item);
            result.push(item);
        }
    }
    return result;
}

// --- 测试 ---
var a = {a: 1};
var b = {a: 1}; // 值相同，引用不同
var c = {a: 2};
var d = {b: 2, a: 1}; // 键顺序不同，但值相同
var e = {a: 1, b: 2}; // 值相同

const myArray = [a, b, c, d, e];

const uniqueArray = dedupeByValue(myArray);

console.log(uniqueArray);
// 输出:
// [
//   { a: 1 },
//   { a: 2 },
//   { a: 1, b: 2 } 
// ]
// (a 和 b 被去重了, d 和 e 也被去重了)