
环形链表2：
<https://leetcode.cn/problems/linked-list-cycle-ii/>


快慢指针的方式：
```ts
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function detectCycle(head: ListNode | null): ListNode | null {
    
    let fast = head;
    let slow = head;

    while(fast&&fast.next){
        fast = fast.next.next;
        slow = slow.next;

        if(fast===slow){
            while(slow!==head){
                head = head.next;
                slow = slow.next;
            }
            return slow
        }
    }
    return null
};
```

或者set直接秒了：
```ts
function detectCycle(head: ListNode | null): ListNode | null {
    
    let visited = new Set();
    let cur = head;
    while(cur){
        if(visited.has(cur)){
            return cur
        }
        visited.add(cur);
        cur = cur.next;
    }
    return null;
};
```