



## 链表

先问自己两个问题
- 什么时候要使用dummy节点？
- 什么时候while循环的终止条件是`while(cur != null)`？什么时候是`while(cur != null && cur.next != null)`？

答：要更改头节点的时候用dummy节点; 

while(cur != null)的场景：
单纯的遍历操作
需要访问节点的值
需要遍历到最后一个节点

while(cur != null && cur.next != null)的场景：
- 需要处理相邻节点关系
- 需要修改节点的连接关系
- 需要跳过或处理成对的节点

例题：
[24.两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/description/)

![alt text](./image/image.png)

这题就涉及需要处理相邻节点关系，并且要更改头结点，所以既要使用dummy节点，又要使用while(cur != null && cur.next != null)；
题解如下:
```ts
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    if(!head||!head.next) return head

    let dummy = new ListNode(0)
    dummy.next = head
    let cur = head // 当前待交换的节点，以样例图为例，cur = 1
    let pre = dummy // 待交换的前一个节点，以样例图为例，pre = 0
    while(cur&&cur.next){
        
        let nxt = cur.next.next // 保存节点， nxt = 3

        pre.next = cur.next // pre.next指向下一层的前一个节点，也就是节点2
        cur.next.next = cur // cur.next表示节点2，cur.next.next表示节点2的指向，其指向节点1
        cur.next = nxt // 节点2指向下一层的节点3
        
        pre = cur  // 先移动pre指针
        cur = nxt // 再移动cur指针
    }
    return dummy.next
};
```