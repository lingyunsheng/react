const binaryInsertSort = arr => {
    let len = arr.length
    if(len<1) return;
    let i,j,high,low,mid,current
    for(let i=1;i<len;i++) {
        low=0
        high=i-1
        current=arr[i]
        while(low<=high) {
            mid=(low+high)>>1
            if(arr[i]>arr[mid]){
                low = mid+1
            } else {
                high=mid-1
            }
        }
        for(j=i;j>low;j--) {
            arr[j]=arr[j-1]
        }
        arr[low]=current
    }
  
    return arr
}
console.log(binaryInsertSort([3,4,1,2]))