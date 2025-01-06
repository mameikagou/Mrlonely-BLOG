
const quickSort = (arr, left=0, right=arr.length-1) =>{
    if(left<right){
        const p = partition(arr,left,right)
        quickSort(arr, left, p-1)
        quickSort(arr, p+1,right)
    }
    return arr
}

const partition = (arr,left,right)=>{
    const pivot = arr[right]
    let i = left -1 //界外

    for(let j=left;j<right;j++){
        if(arr[j]<pivot){
            i++
            [arr[i],arr[j]] = [arr[j],arr[i]]
        }
    }

    [arr[i+1],arr[right]] = [arr[right],arr[i+1]]
    return i+1
}

console.log(quickSort([10, 7, 8, 9, 1, 5]))