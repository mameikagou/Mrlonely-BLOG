

const partition = (arr, left=0, right=arr.length-1)=> {
    const pivot = arr[right];
    let i = left-1;

    for(let j=left;j<right;j++){
        if(arr[j]<pivot){  // 这个是从小到大，反过来就是从大到小。
            i++;
            [arr[i],arr[j]] = [arr[j],arr[i]];
        }
    }
    [arr[i+1],arr[right]] = [arr[right],arr[i+1]];
    return i+1;
}

const quickSort = (arr, left=0, right=arr.length-1) => {

    if(left < right){
        const pivot = partition(arr,left,right);
        quickSort(arr,left,pivot-1); // 基准值的index不需要再排序
        quickSort(arr,pivot+1,right)
    }
    return arr;
}

console.log(quickSort([4, 2, 7, 1, 3, 6, 5]))


const quickSortEasy = (arr) => {
    if(arr.length <= 1){
        return arr;
    }

    let left = [];
    let right = [];
    let pivot = arr[0];
    for(let i=1;i<arr.length;i++){
        if(arr[i]<pivot){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }

    return [...quickSortEasy(left), pivot, ...quickSortEasy(right)];
}

console.log(quickSortEasy([4, 2, 7, 1, 3, 6, 5]))





const partition2 = (arr, left=0, right=arr.length-1) => {
    const pivot = arr[right];
    let i = left-1;

    for(let j=left;j<right;j++){
        if(arr[j]<pivot){
            i++;
            [arr[i],arr[j]] = [arr[j],arr[i]];
        }
    }
    [arr[i+1], arr[right]] = [arr[right], arr[i+1]]

    return i+1;
}

const quickSort2 = (arr, left=0,right=arr.length-1) => {

    if(left<right){
        const pivot = partition2(arr, left, right);
        quickSort2(arr, left, pivot-1);
        quickSort2(arr, pivot+1, right);
    }

    return arr;
}

console.log('quickSort2',quickSort2([4, 2, 7, 1, 3, 6, 5]))