// 任何对象都有原型链 function
// call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

// fun.call(thisArg, arg1, arg2, ...)
// thisArg 在 fun 函数运行时指定的 this 值*。*需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，
// 如果这个函数在非严格模式下运行，则指定为 null 和 undefined的 this 值会自动指向全局对象（浏览器中就是 window 对象），
// 同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。（ps:严格模式下 我们对函数的的调用必须严格的写出被调用的函数的对象）
// arg1, arg2, ... 指定的参数列表

// 改变this的指向 指定到目标对象
Function.prototype.mycall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('no Function')
    }
    context = context || window
    context.fn = this
    let arg = [...arguments].slice(1)
    let result = context.fn(...arg)
    delete context.fn
    return result
}