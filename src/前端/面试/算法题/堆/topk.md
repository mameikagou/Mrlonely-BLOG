

#### 优化阶段

- 全局排序
- 冒泡排序
- 使用堆来优化

##### 冒泡排序

冒泡选出最大的k个元素，这样做，会超时；
```js
func findKthLargest(nums []int, k int) int {

	var ans []int
    ans = bubble_find_max(nums,k)
    return ans[0]
}

func bubble_find_max(nums []int, k int) []int {
	leng := len(nums)
    if (k == 0 && leng == 0) || k > leng{
        return []int{} 
    }
	for i := range k {
		for j:=0; j<leng-i-1; j++ {
            if nums[j] > nums[j+1] {
                nums[j], nums[j+1] = nums[j+1],nums[j]
            }
		}
	}
    return nums[leng-k:]
}
```