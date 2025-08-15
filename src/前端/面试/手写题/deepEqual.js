const deepEqual = (obj1, obj2, cache=new WeakMap()) => {
    // 只比较引用的地址和普通类型
    if(obj1 === obj2){
        return true;
    }


    // 处理null或者不是对象的情况
    if(obj1===null || typeof obj1 !== 'object' || obj2===null || typeof obj2 !== 'object'){
        return false;
    }
    // 处理缓存
    if(cache.get(obj1) === obj2 || cache.get(obj2) === obj1){
        return true;
    }
    cache.set(obj1,obj2);
    cache.set(obj2,obj1);

    // 处理数组
    if(Array.isArray(obj1) && Array.isArray(obj2)){
        // 先比较长度，然后逐个递归比较，这里数组的东西可能比较杂;
        if(obj1.length !== obj2.length) return false;
        
        for(let i=0;i<obj1.length;i++){
            if(!deepEqual(obj1[i],obj2[i],cache)){
                return false;
            }
        }
        return true;
    }
    // 前端已经必然不可能同时是数组了，如果这里有一个数组，那么必然不相等；
    if(Array.isArray(obj1) || Array.isArray(obj2)) return false;

    // 处理对象本身
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if(keys1.length !== keys2.length){
        return false;
    }

    for(const key of keys1){
        if(!keys2.includes(key) || !deepEqual(obj1[key], obj2[key], cache)){
            return false;
        }
    }
    return true;
}

// --- 测试用例 ---
const objA = { a: 1, b: { c: 2 } };
const objB = { a: 1, b: { c: 2 } };
const objC = { a: 1, b: { c: 3 } };

console.log('objA vs objB:', deepEqual(objA, objB)); // true

console.log('objA vs objC:', deepEqual(objA, objC)); // false

// 循环引用测试
const circularA = {};
circularA.self = circularA;
const circularB = {};
circularB.self = circularB;

console.log('circularA vs circularB:', deepEqual(circularA, circularB)); // true