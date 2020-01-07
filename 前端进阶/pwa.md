# PWA
pwa就是渐近式WEB应用

一个PWA应用首先是一个网页，然后添加上App Manifest 和 Service Worker 来实现 PWA 的安装和离线等功能。
- 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
- 实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
- 实现了消息推送
## 实现
### Manifest实现添加至主屏幕
index.html
```
<head>
  <title>Minimal PWA</title>
  <meta name="viewport" content="width=device-width, user-scalable=no" />

  <link rel="manifest" href="manifest.json" />

  <link rel="stylesheet" type="text/css" href="main.css">
  <link rel="icon" href="/e.png" type="image/png" />
</head>
```
manifest.json

```json
{
  "name": "Minimal PWA", // 必填 显示的插件名称
  "short_name": "PWA Demo", // 可选  在APP launcher和新的tab页显示，如果没有设置，则使用name
  "description": "The app that helps you understand PWA", //用于描述应用
  "display": "standalone", // 定义开发人员对Web应用程序的首选显示模式。standalone模式会有单独的
  "start_url": "/", // 应用启动时的url
  "theme_color": "#313131", // 桌面图标的背景色
  "background_color": "#313131", // 为web应用程序预定义的背景颜色。在启动web应用程序和加载应用程序的内容之间创建了一个平滑的过渡。
  "icons": [ // 桌面图标，是一个数组
    {
    "src": "icon/lowres.webp",
    "sizes": "48x48",  // 以空格分隔的图片尺寸
    "type": "image/webp"  // 帮助userAgent快速排除不支持的类型
  },
  {
    "src": "icon/lowres",
    "sizes": "48x48"
  },
  {
    "src": "icon/hd_hi.ico",
    "sizes": "72x72 96x96 128x128 256x256"
  },
  {
    "src": "icon/hd_hi.svg",
    "sizes": "72x72"
  }
  ]
}
```

#service worker实现离线缓存
Service Workers 就像介于服务器和网页之间的拦截器，能够拦截进出的HTTP 请求，从而完全控制你的网站。
- 在页面中注册并安装成功后，运行于浏览器后台，不受页面刷新的影响，可以监听和截拦作用域范围内所有页面的 HTTP 请求。
- 网站必须使用 HTTPS。除了使用本地开发环境调试时(如域名使用 localhost)
- 运行于浏览器后台，可以控制打开的作用域范围下所有的页面请求
- 单独的作用域范围，单独的运行环境和执行线程
- 不能操作页面 DOM。但可以通过事件机制来处理
- 事件驱动型服务线程
```javascrpt
      // 注册 service worker
      if ('serviceWorker' in navigator) {           
        navigator.serviceWorker.register('/service-worker.js', {scope: '/'}).then(function (registration) {
          // 注册成功
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function (err) {                   
          // 注册失败 :(
          console.log('ServiceWorker registration failed: ', err);
        });
      }
```
service-worker.js
```javascript
var cacheName = 'helloWorld';     // 缓存的名称  
// install 事件，它发生在浏览器安装并注册 Service Worker 时        
self.addEventListener('install', event => { 
/* event.waitUtil 用于在安装成功之前执行一些预装逻辑
 但是建议只做一些轻量级和非常重要资源的缓存，减少安装失败的概率
 安装成功后 ServiceWorker 状态会从 installing 变为 installed */
  event.waitUntil(
    caches.open(cacheName)                  
    .then(cache => cache.addAll([    // 如果所有的文件都成功缓存了，便会安装完成。如果任何文件下载失败了，那么安装过程也会随之失败。        
      '/js/script.js',
      '/images/hello.png'
    ]))
  );
});
  
/**
为 fetch 事件添加一个事件监听器。接下来，使用 caches.match() 函数来检查传入的请求 URL 是否匹配当前缓存中存在的任何内容。如果存在的话，返回缓存的资源。
如果资源并不存在于缓存当中，通过网络来获取资源，并将获取到的资源添加到缓存中。
*/
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)                  
    .then(function (response) {
      if (response) {                            
        return response;                         
      }
      var requestToCache = event.request.clone();  //          
      return fetch(requestToCache).then(                   
        function (response) {
          if (!response || response.status !== 200) {      
            return response;
          }
          var responseToCache = response.clone();          
          caches.open(cacheName)                           
            .then(function (cache) {
              cache.put(requestToCache, responseToCache);  
            });
          return response;             
    })
  );
});
```

# 数据库设计三大范式
第一范式：当关系模式R的所有属性都不能在分解为更基本的数据单位时，称R是满足第一范式

第二范式：如果R在满足第一范式的基础上，R的所有非主属性的完全依赖于R的每一个候选关键属性，那么就是R满足第二范式

第三范式：R在满足第一范式的基础上，X是R的任意属性集，如果X非传递依赖于R的任意一个候选关键字，就满足第三范式

# 网页性能
## 网页性能衡量指标
### fps
最能反映页面性能的一个指标是 FPS（frame per second），一般系统设定屏幕的刷新率为 60fps，当页面元素动画、滚动或者渐变时绘制速率小于 60，就会不流畅，小于 24 就会卡顿，小于 12 基本认定卡爆了。
1帧的时长有16ms，除去山下文切换开销，每一帧都只有10ms的时间，如果超过这一帧就会被认为丢失
### DOMContentLoaded 和 Load
DOM加载并且解析完成才会触发 DOMContentLoaded 事件，如果 DOM 数量增加 2000 个并且嵌套层级较深，解析时间也会相应增加 50-200ms，所以最好使用首屏加载优化
## 首屏加载
## 淘宝首页性能优化
### 关键模块优先加载
不论用户首屏的面积有多大，保证关键模块优先加载。对于无JS内容的模块，会预先打上tb-pass的标记，初始化的时候跳过此模块，对于首屏关键模块，会进入懒加载监控除必须立即加载的模块外，关键模块被加到懒加载监控，原因是，部分用户进入页面就可能急速往下拖拽页面，此时，没必要渲染这些首屏模块。

非关键模块会送到lazyQueue队列，没有放到懒加载监控是因为。
- 这样子就不需要为每个模块作计算，会存在性能损失
- 如果关键模块还没有加载好，非关键模块进入视窗就会开始渲染，这势必会影响关键模块的渲染

两种请求下会开始将非关键模块加入懒加载监控：
1. 当页面中触发 mousemove scroll mousedown touchstart touchmove keydown resize onload 这些事件的时候，说明用户开始与页面交互了，程序必须开始加载。
2. 如果还没交互，但是页面已经onload
### 缓存
首屏中有两个次要请求，一个是主题市场的 hot 标，将用户最常逛的三个类目打标；第二个是个人中心的背景，不同的城市会展示不同的背景图片，这里需要请求拿到城市信息。

这两处的渲染策略都是，在程序的 idle（空闲）时期，或者 window.onload 十秒之后去请求，然后将请求的结果缓存到本地，当用户第二次访问淘宝首页时能够看到效果。
### 图片尺寸的控制和懒加载
阿里 CDN 是支持对图片尺寸做压缩处理的。大部分图片使用webp 格式
### 类似运用首屏加载
将除首屏外的模块的模板以及数据存储并在节点处标注模块和数据的ID，当需要时通过ID进行获取
### 低频修改模块，缓存请求
有一些模块数据是很少被修改的，比如接口的兜底数据、阿里 APP 模块数据等，可以通过调整参数，设置模块的缓存时间
### 黄金法则
- 首屏一定要快
- 滚屏一定要流畅
- 能不加载的先别加载
- 能不执行的先别执行
- 渐进展现、圆滑展现

在优化的过程中需要更多地思考，如何让阻塞的脚本分批执行，如何将长时间执行的脚本均匀地分配到时间线上。这些优化都体现在代码的细节上，宏观上的处理难以有明显的效果。
淘宝中有段代码基本保证每个模块的初始化都是在浏览器空闲时期，减少了很多不必要的丢帧。








