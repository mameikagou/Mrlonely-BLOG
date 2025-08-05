

const partition = (arr, left=0, right = arr.length-1) => {

    let pivot = arr[right];
    let i = left-1;

    for(let j=left;j<right;j++){
        if(arr[j]>pivot){
            i++;
            [arr[j],arr[i]] = [arr[i],arr[j]];
        }
    }
    [arr[i+1],arr[right]] = [arr[right],arr[i+1]]

    return i+1;
}

const findKthLargest = (arr,k,left=0,right=arr.length-1)=>{
    if(arr.length<=1){
        return arr;
    }
    const pivot = partition(arr,left,right);
    const rank = pivot - left + 1;
    if(rank === k ){
        return arr[pivot]
    }
    else if(rank > k){ // 目的是，找第k大的人。pivot是第rank大的元素。
        return findKthLargest(arr ,k ,left ,pivot-1)
    }else{ // 如果k更多，那就去另一边找。
        return findKthLargest(arr ,k-rank ,pivot+1 ,right)
    }
}




// --- 测试用例 ---

console.log("--- 查找第k小元素 ---");

// --- 测试用例更新 ---
// 因为算法会修改原数组，为了保证测试独立性，传入数组的副本
console.log("--- 查找第k大元素 ---");

// 1. 基本情况
let arr1 = [3, 2, 1, 5, 6, 4]; // 排序后: [6, 5, 4, 3, 2, 1]
let k1 = 2;
console.log(`数组 [${arr1}] 中第 ${k1} 大的元素是:`, findKthLargest([...arr1], k1)); // 应该输出 5

// 2. 数组有重复元素
let arr2 = [3, 2, 3, 1, 2, 4, 5, 5, 6]; // 排序后: [6, 5, 5, 4, 3, 3, 2, 2, 1]
let k2 = 4;
console.log(`数组 [${arr2}] 中第 ${k2} 大的元素是:`, findKthLargest([...arr2], k2)); // 应该输出 4

// 3. 查找最大的元素
let arr3 = [5, 2, 4, 1, 3]; // 排序后: [5, 4, 3, 2, 1]
let k3 = 1;
console.log(`数组 [${arr3}] 中第 ${k3} 大的元素是:`, findKthLargest([...arr3], k3)); // 应该输出 5

// 4. 查找最小的元素 (即第 n 大)
let arr4 = [5, 2, 4, 1, 3];
let k4 = arr4.length;
console.log(`数组 [${arr4}] 中第 ${k4} 大的元素是:`, findKthLargest([...arr4], k4)); // 应该输出 1



/**
 * 寻找数组中第k小的元素 (k是1-indexed)
 * 使用快速选择算法，通过迭代实现以避免递归过深。
 * @param {number[]} input_arr - 输入数组。该函数会创建副本，不会修改原数组。
 * @param {number} k - 需要寻找的第k小的位置。
 * @returns {number | null} - 返回第k小的元素，如果k无效则返回null。
 */
const findKthSmallest = (input_arr, k) => {
    // 复制数组，避免修改调用者传入的原数组
    const arr = [...input_arr];
    
    // 校验k的有效性
    if (k <= 0 || k > arr.length) {
        console.error("k值无效，必须在 1 到数组长度之间。");
        return null;
    }

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        // 核心：在 [left, right] 区间内做 partition。
        // 必须显式传递 left 和 right，否则 partition 会使用默认值在整个数组上执行。
        const pivotIndex = partition(arr, left, right);
        
        // pivotIndex 是从0开始的。`pivotIndex - left + 1` 代表了 pivot 是当前子数组中的第几个元素。
        const countInPartition = pivotIndex - left + 1;

        if (countInPartition === k) {
            // pivot 正是我们要找的第 k 个元素
            return arr[pivotIndex];
        } else if (countInPartition > k) {
            // 第k小的元素在左边分区
            right = pivotIndex - 1;
        } else {
            // 第k小的元素在右边分区
            // 我们需要在右边分区找第 (k - countInPartition) 小的元素
            left = pivotIndex + 1;
            k = k - countInPartition;
        }
    }
    return null; // 理论上对于有效的k不会执行到这里
}




// 寻找最大的K个

const findKLargestArgs = (nums, k) => {

    const arr = nums.slice();
    if(k>=arr.length){
        return arr.sort((a,b)=>b-a);
    }
    let left = 0;
    let right = arr.length - 1;

    let targetIndex = k-1;

    while(left <= right){

        const pivotIndex = partition(arr, left,right);

        if(targetIndex === pivotIndex){
            return;
        } else if(pivotIndex>targetIndex){
            // 目标数在左边分区
            right = pivotIndex-1;
        }else{
            left = pivotIndex+1;
        }


    }

    return arr.slice(0,k);
}

// 递归的版本

const findKLargestArgs2 = (nums, k) => {

    const arr = nums.slice();
    if(k>=arr.length){
        return arr.sort((a,b)=>b-a);
    }
    let left = 0;
    let right = arr.length - 1;

    let targetIndex = k-1;
    const select = (left, right) =>{
        if(left>right) return;

        const pivotIndex = partition(arr, left, right);

        if(pivotIndex===targetIndex){
            return;
        }else if(pivotIndex>targetIndex){
            select(left, pivotIndex-1);
        }else{
            select(pivotIndex+1,right);
        }

    }

    select(0, arr.length-1);
    return arr.slice(0,k);
}