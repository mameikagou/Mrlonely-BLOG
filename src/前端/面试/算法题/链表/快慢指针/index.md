
环形链表2：
<https://leetcode.cn/problems/linked-list-cycle-ii/>


其实没太看懂原理，是一个数学推断；
这里记一下就行；
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