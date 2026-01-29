
const merge = (leftArray, rightArray) => {
    const leftLen = leftArray.length;
    const rightLen = rightArray.length;
    let leftIndex = 0;
    let rightIndex = 0;
    let resultArray = [];
    while(leftIndex<leftLen && rightIndex<rightLen){

        if(leftArray[leftIndex] < rightArray[rightIndex]){
            resultArray.push(leftArray[leftIndex]);
            leftIndex++;
        }else{
            resultArray.push(rightArray[rightIndex]);
            rightIndex++;
        }
    }

    return resultArray.concat(leftArray.slice(leftIndex)).concat(rightArray.slice(rightIndex));
}


const mergeSort = (arr) => {
    if(arr.length <= 1){
        return arr;
    }
    const middle = Math.min(arr.length/2);
    let leftArr = arr.slice(0, middle);
    let rightArr = arr.slice(middle);
    
    return merge(mergeSort(leftArr), mergeSort(rightArr));
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