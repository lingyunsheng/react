class queue {
    constructor(items) {
        this.items=items || []
    }
    // 入队
    enqueue(element) {
        this.items.push(element)
    }
    // 出队
    dequeue(element) {
        this.items.shift(element)
    }
    // 队的第一个元素
    front () {
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
        this.items=[]
    }
    print() {
        console.log(this.items.toString())
    }
}
let queue1 = new queue()
console.log(queue1.isEmpty);
queue1.enqueue(1)
queue1.enqueue(2)
queue1.enqueue(3)
console.log(queue1.front())
console.log(queue1.size)
// queue1.dequeue()
// queue1.dequeue()
// queue1.dequeue()
queue1.print()
