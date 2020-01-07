function minNumberInRotateArray(rotateArray)
{
    // write code here
    if(!rotateArray) return 0;
    let mid
    let low=0
    let high = rotateArray.length-1
    while(low<high) {
          mid=(low+high)>>1
        if(rotateArray[mid]>rotateArray[high]) {
            low = mid+1
        } else if(rotateArray[mid]===rotateArray[high]) {
            high=high-1
        } else {
            high = mid
        }
    
    return rotateArray[low]
    }
}
let str1 = [3,4,5,1,2]
console.log(minNumberInRotateArray(str1))