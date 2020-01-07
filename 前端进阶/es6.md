# class
无论是静态属性还会静态方法，都需要在前面加上static关键字
## 静态方法和属性
静态方法和属性可以阻止方法被实例继承，类的内部相当于实例的原型，所有在类中定义的方法和属性相当于在原型上定义方法和属性，都会被类实例继承，但是使用静态方法和属性定义的方法和属性都不会被继承而且实例可以直接使用。
静态方法中this指向：this指向类而不是类的实例
# rem, px, em的区别
## 特点
1. IE无法调整那些使用px作为单位的字体大小
2. 国外的大部分网站能够调整就是用em或rem
- px像素是相对长度单位，是相对显示器屏幕分辨率而言的。
- em是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。
  任意浏览器的默认字体高都是16px。所有未经调整的浏览器都符合: 1em=16px。那么12px=0.75em,10px=0.625em。为了简化font-size的换算，需要在css中的body选择器中声明Font-size=62.5%，这就使em值变为 16px*62.5%=10px, 这样12px=1.2em, 10px=1em, 也就是说只需要将你的原来的px数值除以10，然后换上em作为单位就行了。
  em会继承上父元素的值为1em
  目标em值 = 目标像素值 / 父元素（被继承元素）像素值。
- rem使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素字体大小。
# vw,vh
## vw
相对于视口的宽度，视口被均分为100单位的vw
```
h1 {
	font-size: 8vw;
}
```
如果视口的宽度是200mm，那么上述代码中h1元素的字号将为16mm，即(8x200)/100
## vh
相对于视口的高度。视口被均分为100单位的vh
```
h1 {
	font-size: 8vh;
}
```
如果视口的高度是200mm，那么上述代码中h1元素的字号将为16mm，即(8x200)/100

# GET和POST的区别
最直观的区别就是GET把参数包含在URL中，POST通过request body传递参数。


GET和POST是什么？HTTP协议中的两种发送请求的方法。

 

HTTP是什么？HTTP是基于TCP/IP的关于数据如何在万维网中如何通信的协议。

HTTP的底层是TCP/IP。所以GET和POST的底层也是TCP/IP，也就是说，GET/POST都是TCP链接。GET和POST能做的事情是一样一样的。你要给GET加上request body，给POST带上url参数，技术上是完全行的通的。
## 区别
GET产生一个TCP数据包；POST产生两个TCP数据包。


对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器相应200。
对于POST而言，浏览器宪法header，服务器相应100 continue，浏览器再发data，服务器响应200.

因为POST需要两步，时间上消耗的要多一点。

1. GET与POST都有自己的语义，不要随便混用

2. 在网络环境好的情况下，发一次包的时间和发两次包的时间差别基本可以无视。而在网络环境差的情况下，两次包的TCP在验证数据包完整性上，有非常大的优点

3. 并不是所有浏览器都会在POST中发送两次包，Firefox就只发送一次

   

   

# **var与let、const**

#### 一、var声明的变量会挂载在window上，而let和const声明的变量不会：

#### 二、var声明变量存在变量提升，let和const不存在变量提升

#### 三、let和const声明形成块作用域

#### 四、同一作用域下let和const不能声明同名变量，而var可以

# 内存泄漏

js中的内存垃圾回收机制：垃圾回收器会定期扫描内存，当某个内存中的值被引用为零时就会将其回收。当前变量已经使用完毕但依然被引用，导致垃圾回收器无法回收这就造成了内存泄漏。传统页面每次跳转都会释放内存，所以并不是特别明显。

Vue单页面应用中：Web App 与 传统Web的区别，因为Web App是单页面应用页面通过路由跳转不会刷新页面，导致内存泄漏不断堆积，导致页面卡顿。


## 泄漏点
1. DOM/BOM对象泄漏
2. script中存在对DOM/BOM对象的引用
3. JS对象泄漏
4. 通常由闭包导致，比如事件处理回调，导致DOM对象和脚本中对象双向引用，这个时常见的泄漏原因
## 代码关注点
1. DOM中的addEventListener函数及派生事件监听
2. 其它BOM对象的事件监听，如websocket的on函数
3. 避免不必要的函数引用
4. 如果使用render函数，避免在html标签中绑定DOM/DOM事件
## Vue的处理
1. 如果在mounted/created 钩子中绑定了DOM/BOM 对象中的事件，需要在beforeDestroy 中做对应解绑处理
2. 如果在mounted/created 钩子中使用了第三方库初始化，需要在beforeDestroy 中做对应销毁处理
3. 如果组件中使用了定时器，需要在beforeDestroy 中做对应销毁处理
4. 模板中不要使用表达式来绑定到特定的处理函数，这个逻辑应该放在处理函数中？
5. 如果在mounted/created 钩子中使用了$on，需要在beforeDestroy 中做对应解绑($off)处理
6. 某些组件在模板中使用 事件绑定可能会出现泄漏，使用$on 替换模板中的绑定
## 内存泄漏的几种情况

1. **意外的全局变量** 

   - **函数内创建**

   JS处理未定义遍历的方式比较宽松，未定义的变量会在全局对象创建一个新变量，在浏览器这种，全局对象是windows。

   ```javascript

   function foo(arg) { 
       bar = "this is a hidden global variable"; 
   }
   ```

   真相是：

   ```javascript

   function foo(arg) { 
       window.bar = "this is an explicit global variable"; 
   }
   ```

   在函数内意外的创建了一个全局变量。

   - 在函数内使用this创建

   ```javascript
   function foo() {
     this.val = "this is an explicit global variable"; 
   }
   foo();
   ```

   这关于this的指向问题，在这里调用的时候，this实际指向了windows属性

   尽管我们讨论了一些意外的变量，但是仍然会有一些全局变量产生的垃圾，他们被定义为不可回收。尤其是当全局变量用于临时存储和处理大量信息时，需要多加小心。如果必须使用全局变量存储大量数据时，确保用完以后把它设置为 null 或者重新定义。

2. **被遗忘的计时器或回调函数**

   ```javascript

   var someResource = getData(); 
   setInterval(function() { 
       var node = document.getElementById('Node'); 
       if(node) { 
           // 处理 node 和 someResource 
           node.innerHTML = JSON.stringify(someResource)); 
       } 
   }, 1000);
   ```

   当我们不在需要用到这个计时器的时候，node对象可以删掉，虽然看起来是把这个计时器去掉了，但是它还是会执行会占用内存，所以最好的方式是对这个计时器进行clear().同时，`someResource` 如果存储了大量的数据，也是无法被回收的。

   对于观察者的例子，一旦它们不再需要（或者关联的对象变成不可达），明确地移除它们非常重要。

3. **脱离 DOM 的引用**

   有时，保存 DOM 节点内部数据结构很有用。假如你想快速更新表格的几行内容，把每一行 DOM 存成字典（JSON 键值对）或者数组很有意义。此时，同样的 DOM 元素存在两个引用：一个在 DOM 树中，另一个在字典中。将来你决定删除这些行时，需要把两个引用都清除。

   ```javascript

   var elements = { 
       button: document.getElementById('button'), 
       image: document.getElementById('image'), 
       text: document.getElementById('text') 
   }; 
    
   function doStuff() { 
       image.src = 'http://some.url/image'; 
       button.click(); 
       console.log(text.innerHTML); 
       // 更多逻辑 
   } 
    
   function removeButton() { 
       // 按钮是 body 的后代元素 
       document.body.removeChild(document.getElementById('button')); 
    
       // 此时，仍旧存在一个全局的 #button 的引用 
       // elements 字典。button 元素仍旧在内存中，不能被 GC 回收。 
   } 
   ```

   此外还要考虑 DOM 树内部或子节点的引用问题。假如你的 JavaScript 代码中保存了表格某一个 <td> 的引用。将来决定删除整个表格的时候，直觉认为 GC 会回收除了已保存的 <td> 以外的其它节点。实际情况并非如此：此<td> 是表格的子节点，子元素与父元素是引用关系。由于代码保留了 <td> 的引用，导致整个表格仍待在内存中。

4. 闭包

   匿名函数可以访问父级作用域的变量

   ```javascript
   var theThing = null; 
   var replaceThing = function () { 
     var originalThing = theThing; 
     var unused = function () { 
       if (originalThing) 
         console.log("hi"); 
     }; 
    
     theThing = { 
       longStr: new Array(1000000).join('*'), 
       someMethod: function () { 
         console.log(someMessage); 
       } 
     }; 
   }; 
    
   setInterval(replaceThing, 1000); 

   ```

   本质上，闭包的链表已经创建，每一个闭包作用域携带一个指向大数组的间接的引用，造成严重的内存泄露。

# 循环

## for...of循环

for...of语句创建一个循环来迭代可迭代的对象。在ES6中引入的for...of循环允许遍历Array、String、Maps、Sets等可迭代的数据结构

### 语法

```javascript
for (variable of iterable) {
    statement
}
```

- variable：每个迭代的属性值被分配给该变量。
- iterable：一个具有可枚举属性并且可以迭代的对象。

for...of循环允许遍历获得键值,如果要通过for...of循环获取数组的索引，可以借助数组实例的entires方法和keys方法。

### 用例

```javascript
var arr = ['red', 'green', 'd'];
Object.key(arr)
for (let i of arr) {
  console.log(i)    // red green d
}
```



## for... in循环

**for...in语句**以任意顺序遍历一个对象的可枚举属性。对于每个不同的属性，语句都会被执行。也就是说遍历的顺序我们无法知道，但是对于Array来说仍然可能是从0开始，而且一般用于对对象的遍历。



会有几个问题：

1. index索引为字符串型数字
2. 遍历顺序有可能不是按照实际数组内部顺序
3. 使用for...in会遍历数组所有的可枚举属性，包括原型。

```javascript
let arr = [1, 2, 3, 4];
arr.h = 5;
for (let i in arr) {
  console.log(i)
}
//1 2 3 4 h 
```

# Chrome的使用

# VueX过度使用

vuex的过渡使用首先会引起的就是网页内存会过高，而且无法进行分标签页显示。

使用vuex的情况

1. 思考是否需要用到vuex

   只有我们需要实现数据共享的时候我们才需要用到vuex，但是像账户是否已经登录等状态其实是可以通过cookie的一个初始化请求的实现的，但是这就延伸了一个问题如果每个页面都需要两个请求进行初始化，那么就会拉长初始化的时间，这会让用户觉得该网页的性能并不好点。

2. 是否有更好的选择

## Object.create和new的区别

创建对象的方式，Object.create 和new

**new关键字创建的对象会保留原构造函数的属性，而用Object.create()创建的对象不会。**

Object.create的实现方式

```javascript
Object.create =  function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
};
```

可以看出来。Object.create是内部定义一个对象，并且让F.prototype对象 赋值为引进的对象/函数 o，并return出一个新的对象。



再看看var o1 = new Base()的时候new做了什么。

```javascript
var o1 = new Object();
o1.[[Prototype]] = Base.prototype;
Base.call(o1)
```

new做法是新建一个obj对象o1，并且让o1的`__proto__`指向了Base.prototype对象。并且使用call 进行强转作用环境。从而实现了实例的创建。



```javascript
var Base = function () {
    this.a = 2
}
var o1 = new Base();
var o2 = Object.create(Base);
console.log(o1.a); //2
console.log(o2.a); //undeined
```

可以看到Object.create 失去了原来对象的属性的访问。

```javascript
var Base = function () {
    this.a = 2
}
Base.prototype.a = 3;
var o1 = new Base();
var o2 = Object.create(Base);
console.log(o1.a);  //2
console.log(o2.a);  //undefined
```

![image](https://img-blog.csdn.net/20170612193823050?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYmx1ZWJsdWVza3lodWE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



![image](https://img-blog.csdn.net/20170612193858113?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYmx1ZWJsdWVza3lodWE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



看完上图，我们就知道了，为什么通过Object.create构造的连Base原型上的属性都访问不到，因为他压根就没有指向他的prototype。这也就说明了`__proto__` 和 `prototype` 的区别。

原生函数省略了为构造函数初始化参数这一环节，结果所有实例在默认情况下都将取得相同的属性值，归根结底就是原生模式的prototype属性多指向的对象很多时候是共享的.

1. Object.create(o),如果o是一个构造函数，则采用这种方法来创建对像没有意义
2. Object.create(o),如果o是一个字面量对象或实例对象，那么相当于是实现了对象的浅拷贝



Object.create(null) 创建的对象是一个空对象，在该对象上没有继承 



Object.create()方法接受两个参数:Object.create(obj,propertiesObject) ;

obj:一个对象，应该是新创建的对象的原型。

propertiesObject：可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符（这些属性描述符的结构与[`Object.defineProperties()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)的第二个参数一样）。注意：该参数对象不能是 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，另外只有该对象中自身拥有的可枚举的属性才有效，也就是说该对象的原型链上属性是无效的。

# 原型链

原型链，可以理解为继承链或者使用链，当new一个构造函数的时候，就会继承构造函数的原型（也就是prototype）。

只要是对象就有原型, 并且原型也是对象, 因此只要定义了一个对象, 那么就可以找到他的原型, 如此反复, 就可以构成一个对象的序列, 这个结构就被成为**原型链**

原型链继承就是利用就是修改**原型链结构**, 从而让实例对象可以使用整个原型链中的所有成员。

原型链**本质** 上就是对象与对象之间的链接，通过\_proto\_进行指向

类似的例子：

![](https://images2015.cnblogs.com/blog/787416/201603/787416-20160322110905589-2039017350.png)

## 原型链的搜索方法

1. 优先搜索对象内自定义的方法和属性，一旦找到就会使用。
2. 找不到时，就会通过原型链（使用\_proto\_）指向构造函数的prototype对象，在里面进行搜索，
3. 若找不到那么会继续指向\_proto\_的\_proto\_去进行搜索，一直到null时会报错处理。



## prototype和__proto__的区别

函数（Function）才有prototype属性，对象（除Object）拥有\_\_proto\_\_

![](https://images2015.cnblogs.com/blog/787416/201603/787416-20160323103557261-114570044.png)

```
var a = {};
console.log(a.prototype);  //undefined
console.log(a.__proto__);  //Object {}

var b = function(){}
console.log(b.prototype);  //b {}
console.log(b.__proto__);  //function() {}

var a1 = {a:1};
var a3 = {c:1};
var a2 = Object.create(a1,a3);
console.log(a2.__proto__); //Object {a: 1}
```

![](https://images2015.cnblogs.com/blog/787416/201603/787416-20160323103622089-1134417169.png)

```javascript
/*1、字面量方式*/
var a = {};
console.log(a.__proto__);  //Object {}

console.log(a.__proto__ === a.constructor.prototype); //true

/*2、构造器方式*/
var A = function(){};
var a = new A();
console.log(a.__proto__); //A {}

console.log(a.__proto__ === a.constructor.prototype); //true

/*3、Object.create()方式*/
var a1 = {a:1}
var a2 = Object.create(a1);
console.log(a2.__proto__); //Object {a: 1}

console.log(a.__proto__ === a.constructor.prototype); //false（此处即为图1中的例外情况）
```



**图解构造器Function和Object的关系**

![](https://images2015.cnblogs.com/blog/787416/201604/787416-20160402074219504-987295181.png)





为什么

```javascript
Function instanceof Object;//true
Object instanceof Function;//true
```

通过上图就可以知道`Function.__proto__.__proto__ === Object.prototype` 和 `Object.__proto__ === Function.prototype ` 而instanceof就是通过proto不停的寻找是否与其相等

```javascript
L instanceof R 
L.__proto__.__proto__ ..... === R.prototype
```

