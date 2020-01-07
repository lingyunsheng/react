# vue 实现数据的双向绑定

vue数据的双向绑定是通过数据劫持发布者—订阅者模式的方式来实现的，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

实现mvvm主要包含两个方面，数据变化更新视图，视图变化更新数据。

关键点在于data如何更新view，因为view更新data其实可以通过事件监听即可，比如input标签监听 'input' 事件就可以实现了。所以我们着重来分析下，当数据改变，如何更新视图的。

数据更新视图的重点是如何知道数据变了，只要知道数据变了，那么接下去的事都好处理。如何知道数据变了，其实上文我们已经给出答案了，就是通过Object.defineProperty( )对属性设置一个set函数，当数据改变了就会来触发这个函数，所以我们只要将一些需要更新的方法放在这里面就可以实现data更新view了。

1. 需要一个监听器Observer，用来监听所有属性，如果属性发生改变，那么就通知订阅者
2. 实现一个订阅者Watcher，用来收到属性变化时候需要通知执行的函数，从而更新视图
3. 实现一个解析器Compile，可以扫描和解析每个节点，并初始化模板数据以及初始化相应的订阅者

最后再来理一遍，`observe`递归遍历整个`data`，给每个属性创建一个订阅中心，而且重写他们的`getter/setter`方法：在特殊情况（`Dep.target`存在）下`get`会添加订阅者到订阅中心，在`set`时会通知订阅中心，继而通知每位订阅者；订阅者会特殊情况（`Dep.target`存在）下，执行`render`函数（目标在数据的初始化的时候将数据放入dep订阅器中），`get`每一个涉及到的数据。这样，以后只要有数据发生变动，就会触发该订阅者的更新函数，就会引起`dom`的变化！

## 1.Observer

要实现Observer就需要使用Object.defineProperty()，对所有属性进行getter和setter的监听，当每次进行setter时触发特定的update函数。这时候需要创建一个订阅器Dep，该订阅器用于订阅者，当属性变化的时候执行对应订阅者的更新函数。

但是我们需要找到一个地方，用于将订阅者收集起来，这里我在getter实现订阅者的加入，但是需要判断是否有订阅者。

```javascript
function defineReactive(data, key, val) {
    observer(val);
    var dep = new Dep(); 
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            if (Dep.target) {
                dep.addSub(Dep.target); //添加订阅者
            }
            return val;
        },
        set: function (newVal) {
            if (val == newVal) {
                return;
            }
            val = newVal;
            console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
            dep.notify(); // 如果数据变化，通知所有订阅者
        }
    })
}
function observer(data) {
    if (!data || typeof data != 'object') return;

    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
}

function Dep() {
    this.subs = [];
}
Dep.target = null;
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub)
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
}
```

## 2.Watcher

订阅者Watcher在初始化的时候需要将自己添加进订阅器Dep中，所以在一开始初始化时，需要强制执行一次监听器Observer的get执行了添加订阅者Wather的操作，这就响应了Observer为什么要在getter中加入，因为只有getter才不会影响原本的值。

```javascript
function watcher(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();  // 将自己添加到订阅器的操作
}
watcher.prototype = {
    update: function () {
        this.run();
    },
    run: function () {
        let val = this.vm.data[this.exp];
        let oldVal = this.value;
        if (val != oldVal) {
            this.value = val;
            this.cb.call(this.vm, val, oldVal);
        }
    },
    get:function () {
        Dep.target = this;  // 缓存自己
        let value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null;  // 消去缓存
        return value;
    }
}
```



到此为止，简单版的Watcher设计完毕，这时候我们只要将Observer和Watcher关联起来，就可以实现一个简单的双向绑定数据了。因为这里没有还没有设计解析器Compile，所以对于模板数据我们都进行写死处理，假设模板上又一个节点，且id号为'name'，并且双向绑定的绑定的变量也为'name'，且是通过两个大双括号包起来（这里只是为了掩饰，暂时没什么用处）.

```javascript
function vueSelf(data, el, exp) {
    this.data = data;
    observer(data);
    el.innerHTML = this.data[exp];
    new watcher(this, exp, function (value) {
        el.innerHTML = value;
    })
    return this;
}
```

```html
//html文件
<body>
        <h1 id="name">name</h1>
</body>
<script src="./observer.js"></script>
        <script src="./watcher.js"></script>
        <script src="./vueSelf.js"></script>
        <script type="text/javascript">
            var ele = document.querySelector('#name');
                var vueSelf = new vueSelf({
                    name: 'hello world'
                }, ele, 'name');
             
                window.setTimeout(function () {
                    console.log('name值改变了');
                    vueSelf.data.name = 'canfoo';
                }, 2000);
        </script>
```

如果我们想通过vueSelf.name = 'canfoo'这种进行赋值，这时候也需要object.defineProperty()进行调整，可以写成一个proxy函数

```javascript
vueSelf.prototype.proxyKeys = function(key) {
    // body... 
    let self = this;
    Object.defineProperty(this, key, {
        enumerable: false,
        configurable: true,
        get: function proxyGetter() {
            return self.data[key];
        },
        set: function proxySetter(newVal) {
            self.data[key] = newVal;
        }
    })
};
```

## 3.compile

要实现个解析器Compile来做解析和绑定工作，需要考虑两个步骤：

1. 解析模板，并替换模板中的特定的数据，对视图进行初始化
2. 将模板对应的节点绑定对应的更新函数，初始化相应的订阅器

为了解析模板，需要获取dom元素，然后对含有dom元素上含有指令的节点进行处理，因此这个环节需要对dom操作比较频繁，所有可以先建一个fragment片段，将需要解析的dom节点存入fragment片段里再进行处理：

```javascript
function nodeToFragment (el) {
    var fragment = document.createDocumentFragment();
    var child = el.firstChild;
    while (child) {
        // 将Dom元素移入fragment中
        fragment.appendChild(child);
        child = el.firstChild
    }
    return fragment;
}
```



接下来需要遍历各个节点，对含有相关指定的节点进行特殊处理，这里咱们先处理最简单的情况，只对带有 '{{变量}}' 这种形式的指令进行处理

```javascript
function compileElement (el) {
    var childNodes = el.childNodes;
    var self = this;
    [].slice.call(childNodes).forEach(function(node) {
        var reg = /\{\{(.*)\}\}/;
        var text = node.textContent;
 
        if (self.isTextNode(node) && reg.test(text)) {  // 判断是否是符合这种形式{{}}的指令
            self.compileText(node, reg.exec(text)[1]);
        }
 
        if (node.childNodes && node.childNodes.length) {
            self.compileElement(node);  // 继续递归遍历子节点
        }
    });
},
function compileText (node, exp) {
    var self = this;
    var initText = this.vm[exp];
    this.updateText(node, initText);  // 将初始化的数据初始化到视图中
    new Watcher(this.vm, exp, function (value) {  // 生成订阅器并绑定更新函数
        self.updateText(node, value);
    });
},
function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
}
```

获取到最外层节点后，调用compileElement函数，对所有子节点进行判断，如果节点是文本节点且匹配{{}}这种形式指令的节点就开始进行编译处理，编译处理首先需要初始化视图数据，对应上面所说的步骤1，接下去需要生成一个并绑定更新函数的订阅器，对应上面所说的步骤2。这样就完成指令的解析、初始化、编译三个过程，一个解析器Compile也就可以正常的工作了。为了将解析器Compile与监听器Observer和订阅者Watcher关联起来，我们需要再修改一下类SelfVue函数

```javascript
function SelfVue (options) {
    var self = this;
    this.vm = this;
    this.data = options;
 
    Object.keys(this.data).forEach(function(key) {
        self.proxyKeys(key);
    });
 
    observe(this.data);
    new Compile(options, this.vm);
    return this;
}
```

更改后，我们就不要像之前通过传入固定的元素值进行双向绑定了，可以随便命名各种变量进行双向绑定了：

```
<body>
    <div id="app">
        <h2>{{title}}</h2>
        <h1>{{name}}</h1>
    </div>
</body>
<script src="js/observer.js"></script>
<script src="js/watcher.js"></script>
<script src="js/compile.js"></script>
<script src="js/index.js"></script>
<script type="text/javascript">
 
    var selfVue = new SelfVue({
        el: '#app',
        data: {
            title: 'hello world',
            name: ''
        }
    });
 
    window.setTimeout(function () {
        selfVue.title = '你好';
    }, 2000);
 
    window.setTimeout(function () {
        selfVue.name = 'canfoo';
    }, 2500);
 
</script>
```

这里，一个数据双向绑定功能已经基本完成了，接下去就是需要完善更多指令的解析编译。