// function Hardman(name){
    
//     const queue = [`Hi, I am ${name}`];

//     const obj = {
//         learn(name){
//             queue.push(`Learn ${name}`);
//             return obj;
//         },
//         rest(n){
//             queue.push(n,`Rest for ${n}s`);
//             return obj;
//         },
//         restFirst(n){
//             queue.unshift(n, `Rest for ${n}s`);
//             return obj;
//         },
//         run: async()=>{
//             for(const item of queue){
//                 if(typeof item === 'string'){
//                     console.log('item');
//                 }else{
//                     await new Promise((res)=> setTimeout(res, item*1000));
//                 }
//             }
//         }
//     }
//     setTimeout(obj.run,0);
//     return obj;
// }


// console.log('=== 测试1：基本功能 ===');
// Hardman('John');

// console.log('\n=== 测试2：学习功能 ===');
// Hardman('Alice').learn('JavaScript').learn('React');

// console.log('\n=== 测试3：休息功能 ===');
// Hardman('Bob').learn('Vue').rest(2).learn('Node.js');

// console.log('\n=== 测试4：restFirst 功能 ===');
// Hardman('Charlie').learn('HTML').rest(1).restFirst(2).learn('CSS');

// console.log('\n=== 测试5：复杂链式调用 ===');
// Hardman('David')
//     .learn('TypeScript')
//     .rest(1)
//     .learn('Docker')
//     .restFirst(2)
//     .learn('Kubernetes');




class Hardman2 {
    
    queue = []
    constructor(name){
        this.queue = [`Hi, I am ${name}`];
        setTimeout(()=>this.run(), 0) // 箭头函数解决this指向问题。继承外部作用域，而不是window对象
    }

    learn(s){
        this.queue.push(`Learn ${s}`);
        return this;
    }

    rest(n){
        this.queue.push(n,`Rest for ${n} s`);
        return this;
    }

    restFirst(n){
        this.queue.unshift(n,`Rest for ${n} s`);
        return this;
    }

    async run (){
        for(const item of this.queue){
            if(typeof item === 'string'){
                console.log(item);
            }else{
                await new Promise((res)=>setTimeout(res, item*1000));
            }
        }
        return this;
    }
}

// 测试用例
// console.log('=== Class 版本测试1：基本功能 ===');
// new Hardman2('John');

// console.log('\n=== Class 版本测试2：学习功能 ===');
// new Hardman2('Alice').learn('JavaScript').learn('React');

// console.log('\n=== Class 版本测试3：休息功能 ===');
// new Hardman2('Bob').learn('Vue').rest(2).learn('Node.js');

console.log('\n=== Class 版本测试4：restFirst 功能 ===');
new Hardman2('Charlie').learn('HTML').rest(1).restFirst(2).learn('CSS');
