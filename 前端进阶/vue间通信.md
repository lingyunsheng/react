# vue中组件通信

## 父=》子组件

1. 在父组件中设置

   ```
   <son myName="michael" myPhone='123'></son>
   ```

2. 在子组件中设置

   ```
   Vue.component('son',{
   　　props:['myName','myPhone']
   })
   ```

## 子=》父组建

子组件对父组建传信息，是利用了父组件自定义事件，然后在子组件内利用$emit进行触发

1. 在父组件中设置自定义事件并传给子组件

```
methods:{
　　recvMsg:function(msg){
　　//msg就是传递来的数据
　　}
}

<son @customEvent="recvMsg"></son>
```

2. 在子组件中利用$emit进行触发

   ```
   this.$emit('customEvent',123)
   ```

## 兄弟模块通信

1. 创建一个vue实例

   ```
   var bus = new Vue();
   ```

2. 在接收方的组件**绑定自定义事件**

   ```
   bus.$on('customEvent',function(msg){
   　　//msg是通过事件传递来的数据 (传递来的123)
   });
   ```

3. 在发送方的组件**触发自定义事件**

   bus.$emit('customEvent',123);