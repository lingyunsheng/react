function linkList(x) {
    this.val=x
    this.head=null
}
function replaceLinkList(arr) {
    let arr=[]
    let current=head
    if(!head) {
        return []
    }
    while(current) {
        arr.unshift(current.val)
        current.next=current
    }
    return arr

}
