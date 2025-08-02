



const deepClone = (obj, hash = new WeakMap()) =>{
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    
    if(obj === null || typeof obj !== 'object' ){ // typeof null 是 undefined
        return obj;
    }
    if(hash.has(obj)) return hash.get(obj);
    let newObj = new obj.constructor();
    hash.set(obj,newObj)
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            newObj[key] = deepClone(obj[key], hash);
        }
    }
    return newObj;
}
// 1. 创建一个包含各种类型的复杂源对象
const source = {
    // 基础类型
    name: 'source',
    age: 30,
    isStudent: false,
    undef: undefined,
    nul: null,
    sym: Symbol('sym'),

    // 引用类型
    hobbies: ['coding', 'reading', { sport: 'basketball' }],
    address: {
        city: 'New York',
        zip: 10001
    },
    
    // 特殊对象
    reg: new RegExp('\\w+'),
    date: new Date(),
    
    // 函数 (通常不克隆或按原样引用)
    sayHello: function() { console.log('hello'); },

    // 原型链上的属性
    __proto__: { inheritedProp: 'I am inherited' }
};

// 2. 添加循环引用
source.circular = source;


// 3. 执行深拷贝
const cloned = deepClone(source);


console.log('--- 开始验证深拷贝结果 ---');

// 定义一个简单的测试函数
const test = (description, pass) => {
    const status = pass ? '✅ PASS' : '❌ FAIL';
    console.log(`${status}: ${description}`);
};

// 基础验证
test('新对象应该与源对象不是同一个引用', cloned !== source);
test('string 原始类型', cloned.name === source.name);
test('number 原始类型', cloned.age === source.age);
test('null 原始类型', cloned.nul === null);
test('symbol 原始类型', cloned.sym === source.sym);

// 嵌套对象验证
test('嵌套对象应该是新对象', cloned.address !== source.address);
test('嵌套对象的属性值', cloned.address.city === source.address.city);

// 数组验证
test('数组应该是新对象', cloned.hobbies !== source.hobbies);
test('数组中的原始类型', cloned.hobbies[0] === source.hobbies[0]);
test('数组中的对象应该是新对象', cloned.hobbies[2] !== source.hobbies[2]);
test('数组中对象的属性值', cloned.hobbies[2].sport === source.hobbies[2].sport);

// 特殊对象验证
test('Date 对象', cloned.date !== source.date && cloned.date.getTime() === source.date.getTime());
test('RegExp 对象', cloned.reg !== source.reg && cloned.reg.source === source.reg.source);

// 循环引用验证
test('循环引用的对象应该是新对象', cloned.circular !== source.circular);
test('循环引用应该指向克隆后的对象本身', cloned.circular === cloned);

// 函数验证
test('函数应该被直接引用', cloned.sayHello === source.sayHello);

// 原型链属性验证
test('不应拷贝原型链上的属性', cloned.inheritedProp === undefined);


console.log('--- 所有测试用例执行完毕 ---');