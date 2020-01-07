对于普通对象，for...of结构不能直接使用，会报错，必须转而使用Object.keys()方法部署Iterator方法
# Iterator
**作用** ：
1. 为各种数据结构提供一个统一的访问接口
2. 使得数据结构的成员能够按某种次序排列
3. 为es6创建新的遍历命令——for...of
  **过程** ：
4. 创建一个指针对象，指向当前数据结构的起始位置
5. 第一次调用指针对象的next方法，将指针指向数据结构的第一个成员
6. 第二次调用next方法，将指针指向数据结构的第二个成员
7. 不停调用next方法，直到指向数据结构的结束位置

在ES6中有些数据结构原生具有Iterator接口，因为部署了Symbol.iterator属性，具备原生接口的有数组、某些类似数组的对象、Set和Map。如果想使用for...of循环而不具备原生Iterator接口，那么就要在Symbol.iterator属性上设置。

为什么对象没有默认Iterator接口，是因为哪个属性县遍历，哪个属性后遍历是未知的，需要手动指定。

手动设置Symbol.iterator例子
```javascript
class Rang() {
    constructor() {
        
    }
    [Symbol.iterator]() {
        return this;
    }
    next() {
        let val = this.value;
        if (val < this.stop) {
            this.value++; 
            return {done: false, value: val}
        } else {
            return {done: true, value: undefined}
        }
    }
}
```
**调用Iterator的场合** 
1. 解构赋值
   ```
     let set = new Set().add('a').add('b')

     let [x, y] = set;
     // x = 'a' b = 'b'
   ```
2. 扩展运算符
   ```
      let  str = 'hello';
      [...str] // ['h', 'e', 'l', 'l', 'o']
   ```
3. for...of \ Array.form()等

字符串也有Iterator接口

# Set
Set数据结构，而且成员是唯一的，没有重复值，如果要设置新的值，那么就有可能覆盖旧的值。

向Set加入值时不会发生类型转换，所以5和‘5’是两个不同的值，Set内部判断两个值是否相等的算法类似于（===），当然唯一的不同是在Set内部NaN是相等的。

4个操作方法
- add(value):添加数值
- delete(value): 删除某个数值
- has(value): 判断set中是否有value
- clear()：清楚全部成员

4个遍历方法
1. keys()：返回一个键名的遍历器
2. values(): 返回一个键值的遍历器
3. entires(): 返回一个键值对的遍历器
4. forEach(): 使用回调数遍历每个成员
# weakSet
weakSet的对象只能是对象，而不是其他类型的值。weakSet中的对象都是弱引用，即垃圾回收机制不考虑weakSet对该对象的引用，如果其他对象都不再引用该对象，那么垃圾会后机制会自动回收该对象所占用的内存，因此weakset是不可遍历的。是一种对DOM对象操作的一种防止内存泄漏的方法
# Map
类似于对象，也是键值对的集合，各种数据类型都可以当作键，Map比Object更合适

作为构造函数，Map也可以接受一个数组作为参数。该数组成员是一个个表示键值对的数组
```javascript
var map = new Map([['name', '张三']， ['title', 'Author']])

map.size()  // 2
map.has('name') //true
map.get('name') // 张三

map.has('title') //true
map.get('title') // Author

```

Map构造函数接受数组作为参数，实际上执行的是下面的算法。

```javascript
var item = [['name', '张三']， ['title', 'Author']];
var map = new Map();
item.forEach(([key, value]) => {
  map.set(key, value);
})
```

如果对同一个词赋值，那么后面的值就会覆盖前面的值。



map的键实际上是跟内存地址绑定的，只要内存地址不一样，那么就视为另外一个键，这就解决了同名属性碰撞问题。只有键名严格相等（包括0和-0），才会视为一个键。当然NaN不严格相等，但是map会视为一个键。

## 属性以及操作方法

- size属性返回成员总数
- set（key， value）设置key对应的值，然后返回map
- get（key），获得对应key的键值，如果没有则返回undefined
- has（key）返回一个布尔值，表示特定的键是否存在
- delete（key）删除特定的键，如果失败返回false
- clear（）清楚所有成员

遍历方法和set一样。

map转为JSON需要注意两种情况，

- 一种是Map的键名都是字符串，这时候只需要将Map转为对象，即可
- 另一种是键名有非字符串的，可以选择转为数组JSON

# weakMap

weakMap和weakSet类似，它只接受对象作为键名，它的键所对应的对象可能在未来消失

# Promise原理

.promise是对异步编程的一种抽象。它是一个代理对象，代表一个必须进行异步处理的函数返回的值或抛出的异常。也就是说promise对象代表了一个异步操作，可以将异步对象和回调函数脱离开来，通过then方法在这个异步操作上面绑定回调函数。

promise有3种状态：pending（待解决，这也是初始化状态），fulfilled（完成），rejected（拒绝）。

# 屏幕自适应

## viewport深入理解

在移动设备上进行网页的开发，首先需要搞明白移动设备的viewport。

**viewport概念**

移动设备上的viewport就是设备屏幕上能用来显示我们的网页的那一块区域，具体一点，就是浏览器用来显示网页的那部分区域。一般情况下1移动设备上的viewport都要1大于浏览器可视区域，因为考虑到移动设备的分辨率相对于桌面电脑来说都比较小，所以为了能在移动设备上正常显示那些传统的为桌面浏览器设计的网站，移动设备上的浏览器会吧自己默认的viewport设为980px或1024px，但是这样子浏览器就会出现横向滚动条，因为可视区域的宽度（手机屏幕实际宽度）比默认的viewport宽度要小。

**css的1px不是手机的1px**

在网页开发中我们一般使用px作为单位，当然在电脑中1px往往等于1物理像素。但是在手机css的px只是一个抽象单位，在手机中，1px所代表的物理像素会可能更多。

从iphone4开始，苹果公司便推出了retina屏，分辨率提高了一倍，但是屏幕尺寸没有变化，这就意味着同样大小的屏幕，像素多了一倍，这就让css的1px等于了2个物理像素。其他品牌的手机也是一个道理。

还有一个因素会引起css的px变化，那就是用户的缩放。当用户把页面放大一倍，那么1px所代表的物理像素也会增加一倍；反之吧页面缩小一倍，css中1px所代表物理像素减少一倍。

在移动端浏览器中以及某些桌面浏览器中，window对象有一个devicePixelRatio属性，他的官方定义为设备物理像素和设备独立像素的比例，也就是 devicePixelRatio = 物理像素 / 独立像素。css的px可以看做设备的独立像素，所以通过devicePixelRatio，我们可以知道该设备上一个css像素代表多少个物理像素。例如，在Retina屏的iphone上devicePixelRatio的值为2，也就是说1个css像素相当于2个物理像素。但是要注意的是，devicePixelRatio在不同的浏览器中还存在些许的兼容性问题，所以我们现在还并不能完全信赖这个东西。

## viewport的三个理论

移动设备上的浏览器如果让所有网页都正常显示，即使不是为移动设备设计的网站，但如果以浏览器的可视区域作为viewport的话，因为移动设备的屏幕不是很宽，会导致布局混乱挤作一团。前面我们已经说了，css中的1px并不是代表屏幕上的1px。

分辨率越大，css中的1px代表的物理像素就会越多，devicePixelRatio的值也越大，因为分辨率增大了，但是屏幕尺寸并没有变大多少，那么只能让css的1px代表更多的物理像素，才能让1px的东西在屏幕上的大小与哪些低分辨率的设备差不多，不然就会因为太小而看不清。

所以在1080x1920这样的设备上，在默认情况下，也许你只要把一个div的宽度设为300多px（视devicePixelRatio的值而定），就是满屏的宽度了。

### layout viewport

如果把移动设备上浏览器的可视区域设为viewport的话，某些网站就会因为viewport太窄而显示错乱，所以这些浏览器就决定默认情况下把viewport设为一个较宽的值，比如980px，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了。

layout viewport的宽度可以通过 document.documentElement.clientWidth 来获取。

### visual viewport

layout viewport 的宽度是大于浏览器可视区域的宽度的，所以我们还需要一个viewport来代表 浏览器可视区域的大小

visual viewport的宽度可以通过window.innerWidth 来获取，但在Android 2, Oprea mini 和 UC 8中无法正确获取。

### idea viewport

因为现在越来越多的网站都会为移动设备进行单独的设计，所以必须还要有一个能完美适配移动设备的viewport。

所谓完美适配是指

1. 不用用户缩放和横向滚动条就能正常查看网站的所有内容
2. 显示的文字的大小是合适的。比如一段14px大小的文字，不会因为在一个高密度像素的屏幕里显示得太小而无法看清，理想的情况是这段14px的文字无论是在何种密度屏幕，何种分辨率下，显示出来的大小都是差不多的。当然，不只是文字，其他元素像图片什么的也是这个道理

这就是idea viewport

 ideal viewport并没有一个固定的尺寸，不同的设备拥有有不同的ideal viewport。所有的iphone的ideal viewport宽度都是320px，无论它的屏幕宽度是320还是640，也就是说，在iphone中，css中的320px就代表iphone屏幕的宽度。

## 利用meta标签对viewport进行控制

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

| width         | 设置**\*layout viewport***  的宽度，为一个正整数，或字符串"width-device" |
| ------------- | ---------------------------------------- |
| initial-scale | 设置页面的初始缩放值，为一个数字，可以带小数                   |
| minimum-scale | 允许用户的最小缩放值，为一个数字，可以带小数                   |
| maximum-scale | 允许用户的最大缩放值，为一个数字，可以带小数                   |
| height        | 设置**\*layout viewport***  的高度，这个属性对我们并不重要，很少使用 |
| user-scalable | 是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许 |

要把当前的viewport宽度设为ideal viewport的宽度，既可以设置 width=device-width，也可以设置 initial-scale=1，但这两者各有一个小缺陷，就是iphone、ipad以及IE 会横竖屏不分，通通以竖屏的ideal viewport宽度为准。所以，最完美的写法应该是，两者都写上去，这样就 initial-scale=1 解决了 iphone、ipad的毛病，width=device-width则解决了IE的毛病

## 自适应和响应式

**自适应是为了解决如何才能在不同大小的设备上呈现相同的网页。手机的屏幕比较小，宽度通常在600像素以下，pc的像素一般在1000像素以上，部分配置高的笔记本在2000像素以上的也有，同样的页面要显示在不同的设备上面，还要呈现出满意的效果，不是一件容易的事情。因此就有人想出了一个办法，能不能"一次设计，普遍适用"，让同一张网页自动适应不同大小的屏幕，根据屏幕的宽度，自动调节网页的内容大小，但是无论怎么样子，他们的主体的内容和布局是没有变化的。**

响应式的概念应该是覆盖了自适应，但是包括的东西更多了。响应式布局可以根据屏幕的大小自动的调整页面的展现方式，以及布局。

自适应还是暴露出一个问题，如果屏幕太小，即使网页能够根据屏幕大小进行适配，但是会感觉在小屏幕上查看，内容过于拥挤，响应式正是为了解决这个问题而衍生出来的概念。它可以自动识别屏幕宽度、并做出相应调整的网页设计，布局和展示的内容可能会有所变动。如果下面的网址，屏幕宽度大于1300像素，则6张图片并排在一行。

