

const merge = (left, right) => {

    let resultArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while(leftIndex < left.length && rightIndex < right.length){
        if(left[leftIndex] < right[rightIndex]){
            resultArray.push(left[leftIndex]);
            leftIndex++;
        }else{
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

const mergeSort = (arr) => {
    if(arr.length <= 1){
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

console.log(mergeSort([4, 2, 7, 1, 3, 6, 5]))












const merge2 = (leftArr, rightArr) =>{

    let leftIndex = 0;
    let rightIndex = 0;
    let result = [];

    while(leftIndex < leftArr.length && rightIndex < rightArr.length){
        if(leftArr[leftIndex] < rightArr[rightIndex]){
            result.push(leftArr[leftIndex]);
            leftIndex++;
        }else{
            result.push(rightArr[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(leftArr.slice(leftIndex),rightArr.slice(rightIndex));
}

const mergeSort2 = (arr) => {
    if(arr.length <= 1){
        return arr
    }

    const mid = arr.length >> 1;
    const left = arr.slice(0,mid);
    const right = arr.slice(mid);

    return merge2(mergeSort2(left), mergeSort2(right));
}


console.log(mergeSort2([4, 2, 7, 1, 3, 6, 5]))