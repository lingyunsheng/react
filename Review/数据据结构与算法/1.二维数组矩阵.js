function getNum(target, array) {
      return array.some(arr=>arr.some(e=>e===target))
}
let tar=2
let arr=[1, 2, 4, 6][2, 6, 8, 10][2, 4, 8, 10][4, 10, 12, 16]
console.log(getNum(tar, arr    ))