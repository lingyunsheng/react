随着 ajax 的流行，异步数据请求交互运行在不刷新浏览器的情况下进行。而异步交互体验的更高级版本就是 SPA —— 单页应用。单页应用不仅仅是在页面交互是无刷新的，连页面跳转都是无刷新的，为了实现单页应用，所以就有了前端路由。

前端路由实现起来其实也很简单，就是匹配不同的 url 路径，进行解析，然后动态的渲染出区域 html 内容。但是这样存在一个问题，就是 url 每次变化的时候，都会造成页面的刷新。那解决问题的思路便是在改变 url 的情况下，保证页面的不刷新。

**两种前端路由实现方式**

1. #### hash 模式

   在 2014 年之前，大家是通过 hash 来实现路由，url hash 就是类似于：

   ```javascript
   http://www.xxx.com/#/login
   ```

   这种 #。后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。

   另外每次 hash 值的变化，还会触发`hashchange` 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。然后我们便可以监听`hashchange`来实现更新页面部分内容的操作：

   ```javascript
   function matchAndUpdate () {
      // todo 匹配 hash 做 dom 更新操作
   }

   window.addEventListener('hashchange', matchAndUpdate)
   ```

   ​


2. #### history 模式

   14年后，H5标准的发布多了两个API`pushState` 和 `replaceState`，通过这两个API实现的修改url不会发送请求，同时还有` popstate` 事件。但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。

   缺点：

   - 用户刷新的时候还是会发送请求，这时候需要服务器进行重定向。

   ```javascript
   function matchAndUpdate () {
      // todo 匹配路径 做 dom 更新操作
   }

   window.addEventListener('popstate', matchAndUpdate)

   ```

## Vue-router的实现

vue-router在代码中的定义

```javascript
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [...]
})

new Vue({
  router
  ...
})
```

可以看出来vue-router的注入是需要通过Vue.use的，而在使用的时候我们需要`vue-router`的`router-view`和`router-link`组件，以及`this.$router/$route`这样的实例对象。

在源码中通过`new VueRouter({...})`我们创建了一个` VueRouter` 的实例。VueRouter中通过参数`mode`来指定路由模式，前面已经简单的了解了一下前端路由的2种模式。

`VueRouter`对不同模式的实现大致是这样的：

1. 首先根据`mode`来确定所选的模式，如果当前环境不支持`history`模式，会强制切换到hash模式；
2. 如果当前环境不是浏览器环境，会切换到`abstract`模式下。然后再根据不同模式来生成不同的history操作对象。