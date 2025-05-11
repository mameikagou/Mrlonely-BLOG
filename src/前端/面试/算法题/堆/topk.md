

#### 优化阶段

- 全局排序
- 冒泡排序、简单选择排序
- 大根堆

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
		for j:=0; j<leng-i-1; j++ { // 不用比较最后一个元素，所以-1
            if nums[j] > nums[j+1] {
                nums[j], nums[j+1] = nums[j+1],nums[j]
            }
		}
	}
    return nums[leng-k:]
}

func select_find_max(nums []int, k int) []int {
    	leng := len(nums)
    if (k == 0 && leng == 0) || k > leng{
        return []int{} 
    }
	for i := range k {
        max := i
		for j:=i+1; j<leng; j++ { // j<leng，表示可以取到最后一个元素，j<leng-1，表示可以取到倒数第二个元素
            if nums[j] > nums[max] {
                max = j;
            }
		}
        if (max!=i){
            nums[i], nums[max] = nums[max],nums[i]
        }
	}
    return nums[:k]
}
```

#### 大根堆（小顶堆） 堆排序

叶子节点：在数组中，[len(nums)/2, len(nums)-1] 这些下标的节点都是叶子节点（没有孩子）。
非叶子节点：[0, len(nums)/2 - 1] 这些下标的节点才有孩子，才需要进行堆化调整。


```go
func buildHeap(nums []int){
    
    var heap []int;
    copy(heap, nums);

    for i:=len(nums)/2-1;i>=0;i--{
        minHeapify(nums, i)
    }
    return heap
}
func minHeapify(nums []int, i int){
    smallest := i
    left := 2*i + 1
    right := 2*i + 2

    if left < len(nums) && nums[left] < nums[smallest]{
        smallest = left;
    }

    if right < len(nums) && nums[right] < nums[smallest]{
        smallest = right;
    }

    if smallest != i {
        nums[i], nums[smallest] = nums[smallest], nums[i]
        minHeapify(nums, smallest)
    }
}
```