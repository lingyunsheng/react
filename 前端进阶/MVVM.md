# MVVM模式
说到MVVM模式就不得不说下MVC了，传统的MVC模式就是modul,view,controller三层，但是当初的网页比较简单，前端所需要的数据，一般都能通过后端处理好再发给前端。但是H5的出现让网页开始向app靠拢，为了实现H5的移动端和原生app一样，逐渐的发展为MVVM模式。
**MVC的缺点** ：
1. 开发者在代码中大量调用相同的 DOM API，处理繁琐 ，操作冗余，使得代码难以维护。
2. 大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验。
3. 当 Model 频繁发生变化，开发者需要主动更新到View ；当用户的操作导致 Model 发生变化，开发者同样需要将变化的数据同步到Model 中，这样的工作不仅繁琐，而且很难维护复杂多变的数据状态。

**MVVM**简介：
MVVM 极大地提高了前端开发效率。MVVM 的核心是 ViewModel 层，它就像是一个中转站（value converter），负责转换 Model 中的数据对象来让数据变得更容易管理和使用，该层向上与视图层进行双向数据绑定，向下与 Model 层通过接口请求进行数据交互，起呈上启下作用。
![iamge](https://images2017.cnblogs.com/blog/882926/201711/882926-20171115175942921-775941263.png)
## MVVM组成部分
![image](https://images2017.cnblogs.com/blog/882926/201711/882926-20171115175958671-1955710845.png)
其实可以看出对于前端，只是在view和viewModule层进行编写代码。
### view层
View 是视图层，也就是用户界面。前端的html和css构建，与viewModel实现数据绑定
### module层
 Model 是指数据模型，也就是后端的数据操控，一般前端利用ajax操作进行在viewModule层对其进行数据请求
### viewModule层
在该层所封装的数据类型包括视图的状态（数据）和一些行为，而 Model 层的数据模型是只包含状态的。
由于实现了双向绑定，ViewModel 的内容会实时展现在 View 层，这是激动人心的，因为前端开发者再也不必低效又麻烦地通过操纵 DOM 去更新视图，MVVM 框架已经把最脏最累的一块做好了，我们开发者只需要处理和维护 ViewModel，更新数据视图就会自动得到相应更新，真正实现数据驱动开发。
**视图状态**：这一块展示什么（数据）
**视图行为**：用户发生了什么行为（触发了什么事件），要作什么，执行什么函数
## 例子
vue的模板就是view层
```
<div id="app">
    <p>{{message}}</p>
    <button v-on:click="showMessage()">Click me</button>
</div>
```

Vue 的 ViewModel 层
```
var app = new Vue({
    el: '#app',
    data: {     // 用于描述视图状态（有基于 Model 层数据定义的，也有纯前端定义）
        message: 'Hello Vue!',  // 纯前端定义
        server: {}, // 存放基于 Model 层数据的二次封装数据
    },
    methods: {  // 用于描述视图行为（完全前端定义）
        showMessage(){
            let vm = this;
            alert(vm.message);
        }
    },
    created(){
        let vm = this;

        // Ajax 获取 Model 层的数据
        ajax({
            url: '/your/server/data/api',
            success(res){
                // TODO 对获取到的 Model 数据进行转换处理，做二次封装
                vm.server = res;
            }
        });
    }
})
```
服务器的module层
```
{
    "url": "/your/server/data/api",
    "res": {
        "success": true,
        "name": "IoveC",
        "domain": "www.cnblogs.com"
    }
}
```
# 单向数据绑定和双向数据绑定
既然MVVM中的vue是双向数据绑定，那么react就是使用单向数据绑定当然不算是MVVM模式
## 双向绑定
双向绑定就是view中的修改，会直接修改viewModule层，最后修改module层，而在viewModule层通过请求获得module层的数据之后，能直接作用在view。
## 单向绑定
