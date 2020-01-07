# 实现一个 deepClone

实现深度克隆暂时我知道的有两种方式

###  第一种是利用JSON.stringify和JSON.parse进行克隆

操作很简单，但是坑多，只能操作简单的 [object String] 和 [object Boolean] ，函数、Date、RegExp正则对象都处理不了。而且在IE7以前是无法使用的需要额外引入json

```javascript
function deepClone(obj) {
  if (!obj) return false;
  return JSON.parse(JSON.parse(JSON.stringify(obj)));
}
```

###  递归克隆

```javascript

let isType = (obj, type) => {
    if (typeof obj !== 'object') {
        return false;
    }
    let typeString = Object.prototype.toString.call(obj);
    let flag;
    switch (type) {
        case 'Array': flag = typeString === '[object Array]';
                      break;
        case 'Date': flag = typeString === '[object Date]';
                     break;
        case 'RegExp': flag = typeString === '[object RegExp]';
                       break;
        case 'Buffer': flag = typeString === '[object Uint8Array]';
                       break;
        case 'Map': flag = typeString === '[object Map]';
                    break;
        case 'Set': flag = typeString === '[object Set]';
                    break;
        default: break;
    }
    return flag;
}
let getRegExp = re => {
  var flags = ''
  if (re.global) flags += 'g'
  if (re.ignoreCase) flags += 'i'
  if (re.multiline) flags += 'm'
  return flags
}
let clone = (parent) => {
    // 维护两个存储循环引用的数组
      const parents = [];
      const children = [];

      let _clone = (parent) => {
        if (parent == null) return null;
        if (typeof parent !== 'object') return parent;

        let child,proto;

        if (isType(parent, 'Array')) {
            // 对数组对象进行处理
            child = [];
        } else if (isType(parent, 'Date')) {
            // 对Date对象进行处理
            child = new Date(parent.getTime());
        } else if (isType(parent, 'RegExp')) {
            child = new RegExp(parent.source, getRegExp(parent));
        } else if (isType(parent, 'Buffer')) {
            // 对Buffer对象进行处理
            child = new Buffer(JSON.parse(JSON.stringify(parent)));
        } else if (isType(parent, 'Map')) {
            child = new Map(parent);
        } else if (isType(parent, 'Set')) {
            child = new Set(parent);
        } else {
            proto = Object.getPrototypeOf(parent);
            child = Object.create(parent, proto);
        }

        parents.push(parent);
        children.push(child);

        for (i in parent) {
          child[i] = _clone(parent[i]);
        }
        return child;
      }
      return _clone(parent);
}
```

看完上面的内容，深克隆的原理大致也清楚了，也会实现了，不过还是不够完整，比如 Promise 对象怎么去克隆，所以在生产环境中最好就用 lodash 的深克隆。其实深度克隆就是将里面的东西一样一样的复制过来，但是其中的存储地址需要修改为独立而不是共享。

# 浅clone

浅克隆是将栈内存中的引用复制给克隆对象，本质上原对象和克隆对象都指向堆内存中的同一地址，内容也是相同的。但是其中一个对象改变了，另一个对象的内容也跟着变化。

```javascript
const oldObj = {
  name: 'old-dad'
}

function shallowClone(obj) {
  	const newObj = {};
  	newObj = obj;
  	return newObj ;
}

var newObj = shallowClone(oldObj)
console.log(oldObj.name === newObj.name)  // true
oldObj.name = 'new-xxx'
console.log(newObj.name)  // new-xxx
```

# 手写promise

```javascript
function promiseOne(fn) {
    let state = 'pending',
        value = null,
        callbacks = [];

    this.then = function (onFulfilled, onRejected) {
        return new Promise(function (resolve) {
            handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve,
                onRejected: onRejected || null,
                reject: reject
            });
        });
    };
    let handle = (callback) => {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }

        var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected,
            ret;
        if (cb === null) {
            cb = state === 'fulfilled' ? callback.resolve : callback.reject;
            cb(value);
            return;
        }
        try {
            ret = cb(value);
            callback.resolve(ret);
        } catch (e) {
            callback.reject(e);
        } 
    }
    let resolved = (newValue) => {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve);
                return;
            }
        }
        state = 'fulfilled';
        value = newValue;
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    }
    let reject = (newValue) => {
        state = 'rejected';
        value = newValue;
        execute();
    }
    let execute = () => {
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    }
    fn(resolved);
}
```

