装饰器 。。清空git工作区
yarn eject 把脚手架配置放出来
有问题删依赖
删apptest.js

项目第一步先写路由 4个路由 4个页面 整个路由给app 中间部分路由切换
cnpm i react-router-dom -S

navLink 导航

switch只显示符合path的第一个组件 后面的不管
不加switch符合path的所有组件
cnpm i stylus-loader -D
cnpm i jsonp -S

##
把json改为jsonp接口接受jsonp格式 回调

https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1562038595597&g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&jsonpCallback=callback

cnpm i swiper -S

## react setState更新最重要方法
1. 异步的
2. 短时间内做了很多setState，会合并

## jsonp
export const OPTION = {
    param: 'jsonpCallback',
    prefix: 'callback'
}
?jsonpCallback=xxx
xxx 可以固定死的
jsonp jquery
每次请求的 callback xxx 都是不一样的  加上 随机值
callback_1
callback_2
callback_3

 cnpm i better-scroll -S
 cnpm i react-lazyload -S

## Lazyload 
监听原生滚动，
现在是css3 transform滚动，他检测不到

cnpm i redux react-redux -S 把数据和react连起来
cnpm i react-transition-group -S动画

jsonp 返回