

// console.log 本质是一个函数

// 任何一个函数的原型都指向function的原型

console.log.__proto__ === Function.prototype // true

// 每个函数的原型都是Function.prototype，每个函数都有一个call方法

console.log.call.call === Function.prototype.call // true

// fn.apply(obj, [1,2]) 的含义是: obj.fn([1,2])

// ((a)=>a).call(1,2)

// call 的参数是对象依次放入，apply的参数是数组
const r = console.log.call.call.call.call.apply((a)=>a, [1,2])

console.log(r) // 2


