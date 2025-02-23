

const flatten = (arr) =>{
    while(arr.some(item=>Array.isArray(item))){
        arr = [].concat(...arr)
    }
    return arr
}

const arr3 = [1, 2, [3, 4, [5, 6]]];

console.log(flatten(arr3))