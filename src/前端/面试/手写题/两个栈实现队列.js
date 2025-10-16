


class QueueWithTwoStacks {
    constructor() {
        this.inStack = [];   // 负责入队
        this.outStack = [];  // 负责出队
    }

    enqueue(element) {
        this.inStack.push(element);
    }

    dequeue() {
        if(this.isEmpty()){
            throw new Error("Queue is empty");
        }

        if(this.outStack.length === 0){
            while(this.inStack.length > 0){
                this.outStack.push(this.inStack.pop());
            }
        }

        return this.outStack.pop();
    }

    isEmpty() {
        return this.inStack.length === 0 && this.outStack.length === 0;
    }
}