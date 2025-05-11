package main

import "fmt"

func main(){

    nums := []int{3,2,1,5,6,4}
    quickSort(nums, 2)
    fmt.Println(nums)
}


func quickSort(nums []int, k int){

    var quickSort_ func(nums []int, left int, right int)
    
    quickSort_ = func(nums []int, left int, right int){
        if(left >= right){
            return;
        }
        pivot := partition(nums, left, right)
        quickSort_(nums, left, pivot-1)
        quickSort_(nums, pivot+1, right)
    }
    quickSort_(nums,0, len(nums)-1)
}

func partition(nums []int, left int, right int)int{

    pivot := nums[left];

    if(left<right){

        for(left<right && nums[right]>=pivot){ // 找到第一个小于它的值
            right--;
        }
        nums[left] = nums[right];

        for(left<right && nums[left]<=pivot){
            left++;
        }
        nums[right] = nums[left];
    }
    nums[left] = pivot;

    return left; // left存的是基准值
}