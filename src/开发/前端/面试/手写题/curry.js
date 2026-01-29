

const curry = (fn, ...args) => {

    const fnLen = fn.length;
    const argsLen = args.length;

    if(fnLen > argsLen){
        return (...moreArgs)=>{
            return curry(fn,...args, ...moreArgs)
        }
    }else{
        return fn(...args);
    }
}

function sumFn(a, b, c) {
    return a + b + c;
}

let sum = curry(sumFn);

console.log(sum(2)(3)(5)); // 输出: 10
console.log(sum(2, 3)(5)); // 输出: 10
