class PriorityQueue {
    constructor(items) {
        this.items = items || []
    }
    // 入队
    enqueue(element,priority) {
        // 解构赋值
        const queueElement = {element,priority}
        // 如果队列为空 依次入队
        if(this.isEmpty) {
            this.items.push(queueElement)
        } else {
            const preIndex = this.items.findIndex(item=>queueElement.priority< this.items.priority)
            if (preIndex>-1) {
                this.items.splice(preIndex,0,queueElement)
            } else {
                this.items.push(queueElement)
            }
        }
    }
    // 出队
    dequeue(element) {
        this.items.shift(element)
    }
    // 队的第一个元素
    front() {
        return this.items[0]
    }
    // 队是否为空
    get isEmpty() {
        return !(this.items.length)
    }
    // 对长
    get size() {
        return this.items.length
    }
    clear() {
        this.items = []
    }
    print() {
        console.log(this.items)
    }
}
let PriorityQueue1 = new PriorityQueue()
console.log(PriorityQueue1.isEmpty);
PriorityQueue1.enqueue('1',3)
PriorityQueue1.enqueue('2',2)
PriorityQueue1.enqueue('3',1)
console.log(PriorityQueue1.front())
console.log(PriorityQueue1.size)
// queue1.dequeue()
// queue1.dequeue()
// queue1.dequeue()
PriorityQueue1.print()
