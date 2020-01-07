let queue1={},queue2={}
function enqueue(node) {
    queue1.push(node)
}
function dequeue() {
    if(queue2.length==0) {
        if(queue1.length == 0) {
            return null
        } else {
            let len = queue1.length
            for(let i=0; i<len; i++) {
                queue2.push(queue1.shift())
            }
            return queue2.shift()
        }
    } else {
        return queue2.shift()
    }
}