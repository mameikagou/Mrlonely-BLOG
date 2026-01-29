

#### 二分

704：https://leetcode.cn/problems/binary-search/

红蓝染色法：
right（>=target）表示第一个符合条件的元素
left (< target) 表示不符合条件的最后一个元素

反正就记住left是最后一个，right是一个。 找头用 <，找尾用 <=。
求left的时候用nums[mid]<=target;
求right的时候用nums[mid]< target;


34.在排序数组中查找元素的第一个和最后一个位置: 
https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {

  let left = -1;
  let right = nums.length;

  while(left + 1 <right){
    const mid = left + ((right-left)>>1)

    if(nums[mid]<target){
        left = mid;
    }else{
        right = mid;
    }
  }  
  if(nums[right]!==target || right===nums.length){
    return -1
  }
  return right;
};



/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {


    const binarySearch = (isFirst) => {

        let left = -1;
        let right = nums.length;

        while( left+1 < right ){

            const mid = left + ((right-left)>>1);

            if(isFirst){ // 第一个符合条件的数用小于
                if(nums[mid]<target){
                    left = mid;
                }else{
                    right = mid;
                }
            }else{ // 最后一个符合条件用小于等于
                if(nums[mid]<=target){
                    left = mid
                }else{
                    right = mid;
                }
            }
        }

        if(isFirst) return right;
        return left;
    }

    const start = binarySearch(true);

    if(start===nums.length || nums[start]!==target){
        return [-1,-1];
    }

    const end = binarySearch(false);

    return [start,end];
};