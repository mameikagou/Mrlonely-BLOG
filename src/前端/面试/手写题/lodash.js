// get方法

// 不处理 'a[0].b.c'的情况

const get1 = (object2, path, defaultValue) => {
    const pathArray = Array.isArray(path) ? path : path.split(".");

    // typeof的返回值永远是一个字符串
    return pathArray.reduce(
        (obj, key) =>
            (obj && typeof obj[key] !== 'undefined') ? obj[key] : defaultValue,
        object2
    );
};

const get2 = (object, path, defaultValue = 'default') => {
    const pathArray = Array.isArray(path) ? path : path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);

    const result = pathArray.reduce((obj,key)=>{
        return obj?.[key]
    },object);

    return result === undefined ? defaultValue : result;
};


// 示例用法：
const obj = {
    a: {
        b: {
            c: 10
        }
    }
};

console.log(get1(obj, 'a.b.c')); // 输出 10
console.log(get1(obj, ['a', 'b', 'c'])); // 输出 10
console.log(get1(obj, 'a.b.x', 'default')); // 输出 'default'，因为路径 'a.b.x' 不存在
console.log(get1(obj, 'a.b.c.x', 'default')); // 输出 'default'，因为路径 'a.b.c.x' 不存在

const object2 = { "a": [{ "b": { "c": 3 } }] };

console.log('-------', get2(object2, 'a[0].b.c'));
console.log('-------', get2(object2, ['a', '0', 'b', 'c']));
console.log("-------", get2(object2, ["a", "b", "c"], 'default'));
console.log("-------", get2(object2, "a.b.c", "default"));
