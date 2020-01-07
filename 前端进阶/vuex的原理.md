# vuex的原理

vuex作为vue官方出品的状态管理框架，以及其简单API设计、便捷的开发工具支持，在中大型的vue项目中得到很好的应用。

## 理解computed

使用vuex中store中的数据，基本上离不开vue中一个常用的属性computed。官方一个最简单的例子如下

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join()
    }
  }
})
```

在这里，我们需要考虑为什么当message变化的时候computed也会跟着改变，到底是什么触发，然后我们就可以想起，属性双向绑定原理利用`Object.defineProperty()` 进行的数据双向绑定，对属性进行，劫持。这时候我们是不是可以想到`computed` 也应该类似，是通过`Object.defineProperty()` 对数据进行劫持实现而且修改上文中的`message` 属性。

这里我们来看看computed的源码

```javascript
// src/core/instance/state.js
// 初始化组件的state
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  // 当组件存在data属性
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  // 当组件存在 computed属性
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

在这里我们重点关注的是`initComputed(vm, opts.computed)` 这个函数。

```javascript
// src/core/instance/state.js
const computedWatcherOptions = { lazy: true }
function initComputed (vm: Component, computed: Object) {
  // 初始化watchers列表
  const watchers = vm._computedWatchers = Object.create(null)
  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (!isSSR) {
      // 关注点1，给所有属性生成自己的watcher, 可以在this._computedWatchers下看到
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    if (!(key in vm)) {
      // 关注点2
      defineComputed(vm, key, userDef)
    }
  }
}
```

在初始computed的时候我们需要关注两个点：

1. 对每一个属性都生成了一个属于自己的Watcher实例，并将 **{ lazy: true }**作为options传入
2. 对每一个属性调用了defineComputed方法(这个方法类似于data的双向绑定方法)

我们再来看看watcher函数

```javascript
// src/core/observer/watcher.js
constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: Object
  ) {
    this.vm = vm
    vm._watchers.push(this)
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // 如果初始化lazy=true时（暗示是computed属性），那么dirty也是true,需要等待更新
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.getter = expOrFn // 在computed实例化时，将具体的属性值放入this.getter中
    // 省略不相关的代码
    // 关注点在这里
    this.value = this.lazy
      ? undefined
      : this.get()
    // 关注点在这里
  }
  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }
```

在**computed**生成的**watcher**，会将watcher的lazy设置为true,以减少计算量。因此，实例化时，this.dirty也是true,标明数据需要更新操作。我们先记住现在**computed中初始化对各个属性生成的watcher的dirty和lazy都设置为了true**。同时，将computed传入的属性值**（一般为funtion）**,放入**watcher**的**getter**中保存起来。在这里调用的时候会调用this.get()，这个`this.get()` ，我们记得上面传递进来的`options.lazy` 是false所以这里必定不会执行` this.get()` 。

现在让我们来看看**defineComputed** 这个函数

```javascript
// src/core/instance/state.js
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    // 如果找到了该属性的watcher
    if (watcher) {
      // 和上文对应，初始化时，该dirty为true,也就是说，当第一次访问computed中的属性的时候，会调用 watcher.evaluate()方法；
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}

evaluate () {
    this.value = this.get()
    this.dirty = false
  }
```

所以，其实当执行`createComputedGetter` 这个函数的时候才会执行getter添加入Dep中。

## Vuex

其实通过官方文档了解到，每个插件都需要一个install方法安装进项目中，Vuex也一样，通过调用applyMixin方法，该方法主要作用就是在所有组件的**beforeCreate**生命周期注入了设置**this.$store**这样一个对象，

关于vuex.store我们先看看他的构造函数

```javascript
// src/store.js
constructor (options = {}) {
  const {
    plugins = [],
    strict = false
  } = options

  // store internal state
  this._committing = false
  this._actions = Object.create(null)
  this._actionSubscribers = []
  this._mutations = Object.create(null)
  this._wrappedGetters = Object.create(null)
  this._modules = new ModuleCollection(options)
  this._modulesNamespaceMap = Object.create(null)
  this._subscribers = []
  this._watcherVM = new Vue()

  const store = this
  const { dispatch, commit } = this
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
}
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
}

  // strict mode
  this.strict = strict

  const state = this._modules.root.state

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root)

  // 重点方法 ，重置VM
  resetStoreVM(this, state)

  // apply plugins
  plugins.forEach(plugin => plugin(this))

}

// src/store.js
function resetStoreVM (store, state, hot) {
  // 省略无关代码
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
}
```

我们可以看到`resetStoreVM(this, state)` 这个方法方法是关键，它为state创建了一个隐蔽了vue实例的data，我们的commit操作，本质上其实是修改这个组件的data值，结合上文的computed,修改被**defineReactive**代理的对象值后，会将其收集到的依赖的**watcher**中的**dirty**设置为true,等到下一次访问该watcher中的值后重新获取最新值。

这样就能解释了为什么vuex中的state的对象属性必须提前定义好，如果该**state**中途增加**一个属性**，因为该**属性**没有被**defineReactive**，所以其依赖系统没有检测到，自然不能更新。

由上所说，我们可以得知store._vm.$data.$$state === store.state, 我们可以在任何含有vuex框架的工程验证这一点。

## 总结

vuex整体思想诞生于**flux**,可其的实现方式完完全全的使用了vue自身的响应式设计，依赖监听、依赖收集都属于vue对对象Property set get方法的代理劫持。最后一句话结束vuex工作原理，`vuex中的store本质就是没有`template`的隐藏着的vue组件；`。

、

