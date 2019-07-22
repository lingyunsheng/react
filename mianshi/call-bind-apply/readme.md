### call
接收的是参数列表 this.call(args,...arr)

call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

fun.call(thisArg, arg1, arg2, ...)
thisArg 在 fun 函数运行时指定的 this 值*。*需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数在非严格模式下运行，则指定为 null 和 undefined的 this 值会自动指向全局对象（浏览器中就是 window 对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。（ps:严格模式下 我们对函数的的调用必须严格的写出被调用的函数的对象）；
arg1, arg2, ... 指定的参数列表



### apply

从MDN 文档 apply我们可以了解到:
apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。


func.apply(thisArg, [argsArray])


thisArg：可选的。在 func 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。


argsArray：可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或  undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。 浏览器兼容性 请参阅本文底部内容。

### bind
call与apply改变this的指向时，会直接触发函数;而bind会创建一个新的函数，在调用时设置this关键字为提供的值，使用bind时，会优先使用bind绑定的几个值； 如下：


### instanceof typeof
我们使用 typeof 来判断基本数据类型是 ok 的，不过需要注意当用 typeof 来判断 null 类型时的问题，如果想要判断一个对象的具体类型可以考虑用 instanceof，但是 instanceof 也可能判断不准确，比如一个数组，他可以被 instanceof 判断为 Object。所以我们要想比较准确的判断对象实例的类型时，可以采取 Object.prototype.toString.call 方法。

let s = new String('abc')
typeof s === 'object'
s instanceof String

判断是否是函数

左边变量的原型链 .prototype = 右边的原型链 .__proto__

右边变量的原型存在于左边变量的原型链上