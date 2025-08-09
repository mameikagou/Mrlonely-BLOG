
// 数组扁平化

const flatten = (arr, depth=Infinity) =>{
    let i =0;
    while(arr.some(item=>i<depth&&Array.isArray(item))){
        i++;
        arr = [].concat(...arr)
    }
    return arr
}

const arr3 = [1, 2, [3, 4, [5, 6]]];

console.log(flatten(arr3, 1))

const flatten2 = (arr, depth=1) => {

    let result = [];

    const flatten2 = (arr, depth) =>{

        for(const i of arr){
            if(depth>0&&Array.isArray(i)){
                flatten2(i,depth-1);
            }else{
                result.push(i);
            }
        }
    }
    flatten2(arr,depth);

    return result;
}

console.log(flatten2(arr3, 1))