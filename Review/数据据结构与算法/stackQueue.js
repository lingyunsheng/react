let stack1=[1,2,3,4],stack2=[5,6,7,8]
// 当stack1不为空的时候 stack2 为空 stack1.pop出栈 stack2.push入栈 将stack1的元素放到stack2中 stack2出栈
// 当stack1为空 stack2为空 返回 null
//当stack1为空 stack2不为空 stack2出栈
//当stack1不为空 stack2不为空 
function push(node)
{
    // write code here
    stack1.push(node)
}
function pop()
{
    // write code here
    if(stack2.length === 0) {
        if(stack1.length === 0) {
            return null
        } else {
            let len = stack1.length
            for(let i=0; i<len; i++) {
                stack2.push(stack1.pop())
            }
            return stack2.pop()
        }
    } else {
        return stack2.pop()
    }
}