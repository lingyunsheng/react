// 将要改变this指向的方法挂到目标this上执行并返回
Function.prototype.myapply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('no function')
    }
    context = context || window
    context.fn = this
    let result
    if (arguments[1]) {
      result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn()
    return result
}