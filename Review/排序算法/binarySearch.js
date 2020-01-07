const binarySearch = (arr, key) => {
    let len = arr.length
    let low=0
    let high=arr.length-1

    while(low<=high) {
        mid = (low+high)>>1
        if(key === arr[mid]) {
            return mid
        } else if(key>arr[mid]) {
            low = mid+1
        } else if(key<arr[mid]) {
            high=mid-1
        } else {
            return -1
        }
    }
    return arr
}
let arr = [1,2,3,4,5,6,9]
console.log(binarySearch(arr,5))