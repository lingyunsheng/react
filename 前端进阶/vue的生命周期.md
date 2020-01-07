# VUE的生命周期

Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、卸载等一系列过程，我们称这是Vue的生命周期。通俗说就是Vue实例从创建到销毁的过程，就是生命周期。

接下来用一张图来显示整个过程

![](https://images.cnblogs.com/cnblogs_com/fly_dragon/276813/o_lifecycle-%E6%A0%87%E6%B3%A8%E7%89%88%E6%9C%AC.png)

生命周期有以下几个阶段：

- **beforeCreate**
- **created**
- **beforeMount**
- **mounted**
- **beforeUpdate**
- **updated**
- **beforeDestroy**
- **destroyed**



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>vue生命周期学习</title>
  <script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
</head>
<body>
  <div id="app">
    <h1>{{message}}</h1>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      message: 'Vue的生命周期'
    },
    beforeCreate: function() {
      console.group('------beforeCreate创建前状态------');
      console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
      console.log("%c%s", "color:red","message: " + this.message) 
    },
    created: function() {
      console.group('------created创建完毕状态------');
      console.log("%c%s", "color:red","el     : " + this.$el); //undefined
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化
    },
    beforeMount: function() {
      console.group('------beforeMount挂载前状态------');
      console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
      console.log(this.$el);
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
    },
    mounted: function() {
      console.group('------mounted 挂载结束状态------');
      console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
      console.log(this.$el);    
      console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
      console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
    },
    beforeUpdate: function () {
      console.group('beforeUpdate 更新前状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);   
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    updated: function () {
      console.group('updated 更新完成状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el); 
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    beforeDestroy: function () {
      console.group('beforeDestroy 销毁前状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);    
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message); 
    },
    destroyed: function () {
      console.group('destroyed 销毁完成状态===============》');
      console.log("%c%s", "color:red","el     : " + this.$el);
      console.log(this.$el);  
      console.log("%c%s", "color:red","data   : " + this.$data); 
      console.log("%c%s", "color:red","message: " + this.message)
    }
  })
</script>
</html>
```

用这段代码可以早console中看到

![](https://segmentfault.com/img/bVVT3m?w=938&h=448)

1. **beforeCreate**

   在这个钩子触发的时候可以看到数据观测(data observer) 和 event/watcher 事件配置还没被调用el对象也是没有的。

2. **created**

   **created**的时候数据已经和**data属性进行绑定**、属性和方法的运算也会出现， watch/event 事件回调也有了。

3. **beforeMount**

   在挂载开始之前被调用：相关的 render 函数首次被调用。在这一阶段，我们虽然依然得不到具体的DOM元素，但vue挂载的根节点已经创建，下面vue对DOM的操作将围绕这个el继续进行。

4. **mounted**

   mounted是平时我们使用最多的函数了，一般我们的异步请求都写在这里。在这个阶段，数据和DOM都已被渲染出来。

5. **beforeUpdate**

   数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。beforeUpdate函数在数据更新后并没立即更新数据，但是DOM中的数据已经改变。

6. **updated**

   由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

   在这时候，你可以执行依赖于DOM的操作，但是应该避免，这样子可能会导致无限循环这个钩子。该钩子在服务器端渲染期间不被调用。

7. **beforeDestroy**

   实例销毁之前调用。在这一步，实例仍然完全可用。

8. **destroyed**

   Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。

# react生命周期

一个React组件的生命周期分为三个部分：实例化、存在期和销毁时

## 组件初始化(initialization)阶段

就是对申明的class类进行继承和使框架1内的各种方法能注入

## 组件的挂载(Mounting)阶段

此阶段分为componentWillMount，render，componentDidMount三个时期

- componentWillMount:

  在组件挂在DOM之前被调用，只会被调用一次在这边调用this.setState不会引起组件重新渲染

- render

  根据组件的props和state返回一个react元素（一般为UI）不负责组件实际渲染工作，之后由react根据此元素去渲染DOM不能在里面执行this.setState，会有改变组件状态的副作用

- componentDidMount

  组件挂载到DOM后调用，且只会被调用一次

## 组件的更新(update)阶段

此阶段要先明确react更新机制。setState引起的state更新或父组件重新render引起的props更新，更新后的state和props相对之前无论是否有变化，都将引起子组件的重新render。

- componentWillReceiveProps

  每当父组件重新render导致的重传props，子组件将直接跟着重新渲染的时候救护触发，此方法只调用于props引起的组件更新过程中

- shouldComponentUpdate(nextProps, nextState)

  此方法通过比较nextProps，nextState及当前组件的this.props，this.state，返回true时当前组件将继续执行更新过程，返回false则当前组件更新停止

- componentWillUpdate

  此方法在调用render方法前执行，在这边可执行一些组件更新发生前的工作，一般较少用。

- render

- componentDidUpdate(prevProps, prevState)

  此方法在组件更新后被调用，可以操作组件更新的DOM，prevProps和prevState这两个参数指的是组件更新前的props和state

## 组件的卸载阶段

- componentWillUnmount

  此方法在组件被卸载前调用，可以在这里执行一些清理工作，比如清楚组件中使用的定时器，清楚componentDidMount中手动创建的DOM元素等，以避免引起内存泄漏。