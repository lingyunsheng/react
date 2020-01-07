# module的使用

在ES之前模块的引入是主要通过CommomJS，`CommomJS` 的模块加载和ES6是不一样的的，首先`CommomJS` 输出的是一个值的拷贝，而ES6输出的是值的引用。

## 1.CommomJS

### 1.1模块加载

`CommomJS` 输出的是一个值的拷贝，也就是说一旦输出，模块内的变化就不会影响到这个值。

```javascript
// lib.js
var conuter = 3;
function inCounter() {
  conuter++:
}
module.exports = {
  conuter: conuter,
  inCounter: inCounter
}

//main.js
var inCounter = require('./lib').inCounter;
var counter = require('./lib').counter;

console.log(counter); //3
inCounter();
console.log(counter); //3
```

### 1.2循环加载

而在循环加载中，要谨记`CommomJS` 是在加载的时候已经执行，即脚本代码咋子require时就会全部执行。

一旦出现循环加载就只输出已经执行的部分，还没执行的部分不会输出

```javascript
// a.js
exports.done = false;
var b = require('./b.js');
console.log('在a.js中，b.done = %j'，b.done);
exports.done = true;
console.log('a.js 执行完毕');

// b.js
exports.done = false;
var a = require('./a.js');
console.log('在b.js中，a.done = %j'，a.done);
exports.done = true;
console.log('b.js 执行完毕');

// main.js
var a = require('./a.js');
var b = require('./b.js');
console.log('在main.js中，a.done=%j,b.done=%j', a.done, b.done);

// 在nodejs中的执行(node main.js)结果
在b.js中，a.done = false
b.js 执行完毕
在a.js中，b.done = false
a.js 执行完毕
在main.js中，a.done=true,b.done=true
```

## 2.ES6

### 2.1模块加载

ES6只会生成一个动态的只读引用，等到真的需要用到时，再到模块中取值。

```javascript
 // lib.js
exports let conuter = 3;
exports function inCounter() {  
  conuter++:
}


//main.js
import { counter,inCounter } form './lib';
console.log(counter); //3
inCounter();
console.log(counter); //4
```

### 2.2循环加载

ES6的加载变量是动态引入其所在的模块的，只要引入存在，代码就会执行。

```javascript
//even.js
import { odd } from './odd';
export var counter = 0;
export function even(n) {
  counter++；
  return n != 0 || odd(n - 1);
}

//odd.js
import { even } from './even';
export function odd(n) {
  return n != 0 && even(n - 1);
}

//node中执行
import * as m from './event.js';
m.even(10);   //true
m.counter;    //6 
```

上面的even(10)，even函数一共执行了6次，但是如果使用CommomJS这样子执行实惠报错的