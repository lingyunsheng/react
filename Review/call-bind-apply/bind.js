
// call与apply改变this的指向时，会直接触发函数;而bind会创建一个新的函数，在调用时设置this关键字为提供的值，使用bind时，会优先使用bind绑定的几个值； 如下：
Function.prototype.mybind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('not function')
    }
    let _this = this
    let arg = [...arguments].splice(1)
    // 返回的是一个函数 call
    return function F() {
        if (this instanceof F) {
            // new 一个新的实例对象
            return new _this(...arg,...arguments)
        }
        else {
            return _this.apply(context,arg.concat(...arguments))
        }
    }

}