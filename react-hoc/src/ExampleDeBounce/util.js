// 防抖
/**
 * func干什么事  wait  多少毫秒之后执行这个函数
 * 修饰类,方法,属性。装饰整个类
 */
export function debounce(func, wait) {
  var result, timeout;
  return function() {
      // this
      // 参数
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
          result = func.apply(this, args)
      }, wait);
      return result;
  }
}
// 可用于装饰的防抖
// 装饰器都是函数
export function decDebounce(wait) {
  return function(taget, key, descriptor) {
      // 原来要做的事
      var callBack = descriptor.value;
      // 增强
      var fn = debounce(callBack, wait);
      // 把原来的改成增强后的
      descriptor.value = fn;
  }
}

export function decArrowDebounce(wait) {
  return function(taget, key, descriptor) {
      // 拿到原来要做的事
      var callBack = descriptor.initializer && descriptor.initializer();
      // 增强
      var fn = debounce(callBack, wait);
      // 把原来的改成增强后的
      // value属性 -> 修饰方法的时候
      // get方法 ->修饰属性的时候
      //descriptor.value
      //return {} 
      //改变原来的 或者返回一个新的都可以
      return {
          // 开关
          configurable: true,
          get: function() {
              return fn;
          }
      }
  }
}
// hoc高阶组件(方法) 装饰整个组件
// 装饰一个class
// 修饰类的
export function decDisplayName(displayname) {
  return function(target) {
      target.displayName = displayname;
  }
}
class Base{
  // 下面的方法
  a() {
      console.log('a')
  }
  // 属性
  b = () => {
      console.log('b')
  }
}
const base = new Base();
console.log('base', base);