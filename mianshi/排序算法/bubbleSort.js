const bubbleSort = arr => {
    const len = arr.length
    const temp = []
    if(len<=1) return ;
    for(let i=0;i<len-1;i++) {
        let hasChange = false
        for(let j=0;j<len-i+1;j++) {
            if(arr[j]>arr[j+1]) {
              const  temp=arr[j+1]
                arr[j+1]=arr[j]
                arr[j]=temp
                hasChange=true
                console.log('arr:',arr)
            }
        }
        if(!hasChange) break;
    }
    return arr
}
console.log(bubbleSort([3,4,1,2]))
// 3 4 1 2
// 3 4 1 2
// 3 1 4 2
// 3 1 2 4
// 1 3 2 4
// 1 2 3 4
// 时间复杂度 平均O(n^2) 最好O(n)