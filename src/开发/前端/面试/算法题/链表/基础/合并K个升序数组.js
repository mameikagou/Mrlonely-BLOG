
// 合并K个升序数组

const arrays = [[1, 4, 5], [1, 3, 4], [2, 6]];

const mergeKArrays = (arr) =>{
    return arr.flat().sort((a,b)=>a-b);
}

console.log(mergeKArrays(arrays));

const mergeTwoArrays = (arr1,arr2) => {
    const len1 = arr1.length;
    const len2 = arr2.length;
    
    let res = [];
    let i=0;
    let j=0;
    while(i<len1&&j<len2){
        if(arr1[i]<arr2[j]){
            res.push(arr1[i]);
            i++;
        }else{
            res.push(arr2[j]);
            j++;
        }
    }
    while(i<len1){
        res.push(arr1[i]);
        i++;
    }
    while(j<len2){
        res.push(arr2[j]);
        j++;
    }
    return res;
}

const twoArr = [[3,7,8],[2,5,8,9]];

const mergeKArrays2 = (arrays) =>{
    if(!arrays.length || arrays.length===0){
        return [];
    }

    const merge = (start, end) => {
        if(start===end) return arrays[start];
        const mid = (start,end)>>1

        let left = merge(start,mid);
        let right = merge(mid+1, end);

        return mergeTwoArrays(left,right);
    }

    
    return merge(0, arrays.length-1);
}

console.log(mergeKArrays2(arrays));