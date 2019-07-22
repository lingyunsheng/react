// 两个栈 实现一个队列
class Stack {
    constructor() {
        this.items = []
    }
    push(Element) {
        this.items.push(Element)
    }
    pop(Element) {
        this.items.pop(Element)
    }
    get isEmpty() {
        return !this.items.length
    }
    // 栈的最后一个元素 末尾
    get peek() {
        return this.items[this.items.length - 1]
    }
    get size() {
        return this.items.length
    }
    clear() {
        this.items = []
    }
    print() {
        console.log(this.items.toString())
    }
}
// 第一个栈 
let stack1 = new Stack()
let stack2 = new Stack()
stack1.push(1)
stack1.push(2)
stack1.push(3)
stack1.push(4)
stack2.print(5)
stack2.push(6)
stack2.push(7)
stack2.push(8)
console.log(stack1.peek)
console.log(stack1.isEmpty)
console.log(stack2.isEmpty)
function queue(items) {
    // 两个栈都为空
    if (stack1.isEmpty === true && stack2.isEmpty === true) {
        return false;
    }
    //   栈2不为空 栈2 出栈
    if (stack2.isEmpty === false) {
        stack2.pop()
    }
    else {
        while (stack1.size > 0) {
            stack2.push(stack1.peek)
            stack1.pop()
        }
        stack2.pop()
    }
}
// 合并成队列
queue(stack2)