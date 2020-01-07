
// 右边变量的原型存在于左边变量的原型链上
function instanceOf(left, right) {
    let left_vaule = left.__proto__
    let right_value = right.prototype
    while(true) {
        if (left_vaule === null) {
            return false
        }
        if ( left_vaule === right_value) {
            return true
        }
        left_vaule=left_vaule.__proto__
    }
}
let s = new String('abc')
instanceOf(s)