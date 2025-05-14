

const quickSort = (arr, left=0,right=arr.length-1) => {
    if(left<right){
        const pivot = partition(arr, left,right)
        quickSort(arr, left, pivot-1)
        quickSort(arr, pivot+1,right)
    }
    return arr
}

const partition = (arr, left, right) =>{
    const pivot = arr[right]
    let i = left-1

    for(let j=left;j<right;j++){
        // 如果当前元素小于基准值
        if(arr[j]<pivot){
            i++
            [arr[i],arr[j]] = [arr[j],arr[i]]
        }
    }

    [arr[i+1],arr[right]] = [arr[right],arr[i+1]]

    return i+1
}

console.log(quickSort([4, 2, 7, 1, 3, 6, 5]))