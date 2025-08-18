const deepEqual = (obj1,obj2,cache=new WeakMap()) => {

    // 浅层比较，比较是否是基本类型
    if(obj1===obj2){
        return true;
    }

    // 一个是，一个不是对象、数组
    if(typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1===null || obj2===null){
        return false;
    }

    if(cache.get(obj1)===obj2 || cache.get(obj2) === obj1){
        return true;
    }
    cache.set(obj1, obj2);
    cache.set(obj2, obj1);

    // 处理构造函数、Date对象、RegExp对象
    if(obj1.constructor !== obj2.constructor){
        return false;
    }

    if(obj1 instanceof Date) {
        return obj1.getTime() === obj2.getTime();
    }

    if(obj1 instanceof RegExp) {
        return obj1.toString() === obj2.toString()
    }

    // 处理数组
    if(Array.isArray(obj1) && Array.isArray(obj2)){
        const len1 = obj1.length;
        const len2 = obj2.length;

        if(len1 !== len2){
            return false;
        }

        for(let i=0;i<len1;i++){
            if(!deepEqual(obj1[i], obj2[i], cache)){
                return false;
            }
        }
        return true;
    }
    // 一个是数组一个不是
    if(Array.isArray(obj1) || Array.isArray(obj2)){
        return false;
    }

    // 开始比较对象
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if(keys1.length !== keys2.length){
        return false;
    }

    for(const key of keys1){
        if(!obj2.hasOwnProperty(key) || !deepEqual(obj1[key], obj2[key], cache)){
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