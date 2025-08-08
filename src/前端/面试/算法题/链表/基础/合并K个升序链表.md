### [23. 合并K个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)

这道题可以使用分治的思想来解决。不断地将链表数组对半分，直到每个子数组只包含一个或零个链表，然后再两两合并。

这本质上是一个归并排序的过程。

```typescript
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

const mergeTwoLists=(list1: ListNode | null, list2: ListNode | null): ListNode | null=>{
    if(!list1 || !list2) return list1 ?? list2 ?? null
    
    let dummy = new ListNode(0);
    let cur = dummy;
    
    while(list1 && list2){
        if(list1.val < list2.val){
            cur.next = list1;
            list1 = list1.next;
        }else{
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next;
    }

    cur.next = list1 || list2;

    return dummy.next;
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    const len = lists.length;
    if (len === 0) {
        return null;
    }
    
    const dfs = (i:number, j:number): ListNode | null => {
        const m = j - i;
        if(m === 0) return null;
        if(m === 1) return lists[i];
        
        const mid = i + Math.floor(m / 2);
        const left = dfs(i, mid);
        const right = dfs(mid, j);
        return mergeTwoLists(left, right);
    }

    return dfs(0, len);
}; 

```
###  合并K个升序数组