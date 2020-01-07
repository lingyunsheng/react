const quickSort = arr => {
    let len = arr.length
    if(len<=1) {
        return arr
    }
    mid=Math.floor(len/2)
    //取基准点的值，splice(index,1) 则返回的是含有被删除的元素的数组。
    val = arr.splice(mid, 1)
    midVal = val[0]
    let left = []
    let right = []
    for(let i=0;i<len;i++) {
        if(arr[i]<midVal) {
            left.push(arr[i])
        }else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(midVal,quickSort(right))
}
console.log(quickSort([5,4,3,2,1]))