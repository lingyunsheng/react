// new 的实现原理
// 左边的原型 等于 右边的原型链
function mynew(fun) {
       // 创建一个新对象且将其隐式原型指向构造函数原型
    return function() {
        let obj ={
            __proto__:fun.prototype
        }
        fun.call(obj,...arguments)
        return obj
    }
}
function Person(name,age) {
    this.name = name
    this.age=age
}
let obj1 = mynew(Person)('杨幂',18)
console.log(obj1)