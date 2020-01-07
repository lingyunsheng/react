// 链表
// 节点 链表
class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

// 链表
class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }
    // 添加元素
    append(element) {
        const node = new Node(element)
        let current = null
        if (this.head === null) {
            this.head=node
        } else {
            current=this.head
            while(current.next) {
                current=current.next
            }
            current.next=node
        }
        this.length++
    }
    // 插入元素
    insert(position,element) {
        // 利用定位去查找元素 并添加
        if(position >0 && position<this.length) {
            const node = new Node(element)
            let current=this.head
            let previous = null
            let index=0
            if (position===0) {
                this.head = node
            } else {
                while(index++ < position) {
                    previous=current
                    current=current.next
                }
                node.next=current
                previous.next=node
            }
            this.length++
            return true

        }
        return false
    }
    remove(position,element) {
        
        // 检查越界值
        if(position>-1 && position<this.length) {
            const node = new Node(element)
            let current=this.head
            let previous = null
            let index=0
            if(position===0) {
                this.head=current.next
            } else {
                while(index++ < position) {
                    previous=current
                    current=current.next
                }
                previous.next=current.next
            }
            this.length--
            return current.element
        }
    }
    findIndex(element) {
        let current = this.head
        let index=-1
        while(current) {
            if(element===current.element) {
                return index+1
            }
            index++
            current=current.next
        }
        return -1
    }
    isEmpty() {
        return !this.length
    }
    size() {
        return this.length
    }
}

let linkedList = new LinkedList()
linkedList.append(9)
linkedList.append(10)
console.log(linkedList)
linkedList.insert(1,4)
console.log(linkedList)
linkedList.remove(1)
console.log(linkedList)
console.log(linkedList.findIndex(10))