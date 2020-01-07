// 定义一个栈类
class stack {
    constructor() {
        this.items=[]
    }
     // 入栈 往栈添加元素
     push(element) {
         this.items.push(element)
     }
    //  出栈 移除元素
    pop(element) {
        this.items.pop(element)
    }
    // 栈的末位
    get peek() {
       return this.items[this.items.length-1] 
    }
    // 栈的大小
    get size() {
        return this.items.length
    }
    // 栈是否未空
    get isEmpty() {
        return !(this.items.length)
    }
    clear() {
        this.items=[]
    }
    // 打印栈的元素
    print() {
        console.log(this.items.toString())
    }
}
// new 一个实例化 栈
let stack1 = new stack()
console.log(stack1.isEmpty);
stack1.push(5)
stack1.push(8)
console.log(stack1.peek)
stack1.push(11)
console.log(stack1.size)
stack1.print()


