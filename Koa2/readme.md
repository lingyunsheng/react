# Koa2

在学习egg.js前，继续重新温习一下koa
koa是node框架  简单灵活方便 非常的小巧 100多行的源码，组合generator去除冗余

Koa2是现在最流行的基于Node.js平台的web开发框架，它很小，但扩展性很强。Koa给人一种干净利落的感觉，体积小、编程方式干净。国内很多知名互联网公司都在使用，BAT（百度、阿里、腾讯）全部都在使用。

使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。一个Koa应用就是一个对象，包含了一个middleware数组，这个数组由一组Generator函数组成。这些函数负责对HTTP请求进行各种加工，比如生成缓存、指定代理、请求重定向等等。这些中间件函数基于 request 请求以一个类似于栈的结构组成并依次执行。

node -v  查看node版本

npm init -y package.json 初始化依赖包 项目配置项

安装koa

npm install --save koa

node index.js  运行node

## 第一个koa

npm install --save koa安装完koa 开始建立index.js

const Koa = require('koa')

const app = new Koa()


ctx  koa封装的一个内置属性  
app.use(async (ctx) => {
    ctx.body('hello')
})

app.listen(3000)

console.log('开始运行')

### async await  异步请求

async wait的简写。明白了两个单词，就很好理解了async是声明一个方法是异步的，await是等待异步方法完成。注意的是await必须在async方法中才可以使用因为await访问本身就会造成程序停止堵塞，所以必须在异步方法中才可以使用。

function test1() {
    return new promise(resolve => {
        setTimeout(() => {
            resolve('hello')
        },3000)
    })
}

async function test2() {
    const v1 = await test1()
    console.log(v1)
}

test2()

await一般在等待async方法执行完毕，但是其实await等待的只是一个表达式，这个表达式在官方文档里说的是Promise对象，可是它也可以接受普通值。我们写一段代码来验证一下这个结果。在程序中我们有用async的方法，也有普通的方法。最后在控制台输出时，你会发现都可以直接输出。

# Koa2 Get 请求
前后端配合的时候 请求数据的时候 GET/POST
GET 前端发送请求 后端返回相应的数据

- query和querystring
1. query  是返回格式处理好的参数
2. querystring 返回的是字符串


app.use(async (ctx) => {
    let url = ctx.url
    let req = ctx.request
    let req_query = req.query
    let req_querystring = req.querystring

    ctx.body={
        url,
        req,
        req_query,
        req_querystring 
    }
})

app.listen(3000, () => {
    console.log('server at port 3000')
})


http 创建服务器

http
    .createServer((req,res) => {
        res.send('hhh')
    })
    .listen(3000,()=> {
        console.log('服务器已经在3000端口运行')
    })


- 安装格式插件  FormatTool   JSOn-formatal

http://localhost:3000/?name=qinsheng&age=18


query querystring  返回的格式

query 返回的是json 对象的格式


querystring 返回的是 string字符串 

{
"url": "/?name=qinsheng&age=18",
"req_query": {
"name": "qinsheng",
"age": "18"
},
"req_querystring": "name=qinsheng&age=18"
}

## 接收GET请求  request 请求
1. request接收请求   ctx.request

req = ctx.request
req_query = req.query
req_querystring = req.querystring

2. 上下文接收   ctx.query
{
"url": "/?name=qinsheng&age=18",
"req_query": {
"name": "qinsheng",
"age": "18"
},
"req_querystring": "name=qinsheng&age=18",
"ctx_query": {
"name": "qinsheng",
"age": "18"
},
"ctx_querystring": "name=qinsheng&age=18"
}


# POST请求

Koa2 没有封装接收post请求方法

1. 解析上下文ctx的原生node.js对象  req
2. 解析成querystring对象
3. 将字符串转化成JSON对象


## ctx.request ctx.req

- request  是koa封装后的方法是Koa2中context经过封装的请求对象，它用起来更直观和简单
- req   context提供的node.js 原生http请求

## ctx.method  根据不同的请求 写不同的方法 根据请求类型获得不同的页面内容。GET请求时得到表单填写页面，POST请求时，得到POST处理页面。

上下文对象  ctx.method 方法
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyparser())

if(ctx.url === '/' && ctx.method==='GET') {
    let html =``
    ctx.body=html
} else if(ctx.url === '/' && ctx.method === 'POST') {
    let postData = await parsepostData(ctx)
    ctx.body=postData 

    // let postData =ctx.request.body
} else {
    ctx.body='404'
}

// 将提交的数据转成querystring

function parsepostData(ctx) {
    return new Promise((resolve, reject) => {
        // try catch 捕捉异常
        try{
            // 定义接收的对象
            let postdata = ''
            ctx.req.on('data', (data) => {
                postdata += data
            })
            ctx.req.addListener('end', () => {
                let querStr  = queryString(postdata)
                resolve(querStr)
            })

        } catch(error) {
            reject(error)
        }
    })
}

// 将字符串转换为 JSON对象

function queryString(queryStr) {
    // 声明一个空对象
    let queryData = {}
    // 字符串以&分割
    let queryStrList = queryStr.split('&')
    for(let [index, queryStr] of queryStrList.entries()) {
        let queryItem = queryStrList.split('=')
        queryData[queryItem[0]] = decodeURLcomponent(queryItem[1])
    }

    return queryData
}


# koa-bodyparser 中间件

针对post请求 我们不需要自己手动写原生的方法 直接用koa-bodyparser轮子使用

对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中。


ctx.request.body


post请求方法 koa没有封装的方法 只有使用原生node.js 方法

koa-bodyparser 就是一个轮子 将提交的data数据 先转化为 字符串 字符串转化为json

npm install --save koa-bodyparser@3

const bodyparser = require('koa-body-parser')

// 使用轮子中间件
app.use(bodyparser())

let postdata = ctx.request.body
ctx.body = postdata


## 使用npm进行安装，需要注意的是我们这里要用–save，因为它在生产环境中需要使用。


# koa2 原生路由  根据不同的路径跳转不同的页面
要想实现原生路由，需要得到地址栏输入的路径，然后根据路径的不同进行跳转。用ctx.request.url就可以实现


## fs  原生路由 需要引入 fs模块 读取文件路径

const fs = require('fs')


使用原生路由方法写

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    let url = ctx.request.url
    // 选择 url 根据不同的路由 选择不同的页面
    let html = await route(url)
    ctx.body=html
})

function render(page) {
    return new Promise((resolve, reject) => {
        // 将读取的文件写入
        let pageUrl =`./page/${page}
        fs.readFile(pageUrl, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

async function route(url) {
    let page = '404.html'
    switch(url) {
        case '/':
            page='index.html';
            break;
        case '/index':
            page='index.html';
            break;
    }
    // 读取文件
    let html = await render(page)
    return html
}

### 总结原生路由的方法

- 通过ctx.request.url 获取url的变化
- 通过url的变化 去选择 相应的路由页面
route(url) {
    switch(url) {
        case:
             page='404.html'
    }
    let html = render(page)
}
- 通过选择的页面 fs读取 再写入

fs.readFile(pageUrl, 'binary', (err, data) {
    if(err) {
        reject(err)
    } else {
        resolve(data)
    }
})


# koa-router 路由 中间件

npm install --save koa-router

const Koa = require('koa')
// 引入koa 安装好的
const Router = require('koa-router')
const app = new Koa()

const router = new Router()

router.get('/', (ctx, next) => {
    ctx.body='hello, index'
})
.get('/todo', (ctx,next)=> {
    ctx.body="todo
})

app
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(3000, () => {
    console.log('server is start at port 3000')
})

## koa-router 路由的层级

1. prefix
const Koa = require('koa')
const Router = require('koa-router')

const router = new Router({
    prefix:'qinsheng'
})

const app = new Koa()

app
    // 路由装载
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(3000)

2. 多层级的路由
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
// 配置多层级子路由
let home = new Router()
home.get('/',(ctx,next) => {
    ctx.body='home'
}).get('/index',(ctx,next) => {
    ctx.body ='index'
})

let page = new Router()
page.get('/',(ctx,next) => {
    ctx.body='page'
}).get('/index',(ctx,next) => {
    ctx.body ='index'
})

// 装载到app.use
let router = new Router()
router.routes('home',home.routes(), home.allowedMethods())
router.routes('page',page.routes(), page.allowedMethods())

http://localhost:3000/page/index


# koa koa-bodyparser koa-router get post 请求操作

// 引入koa
const Koa = require('koa')
// 引入koa-bodyparser post 请求
const bodyparser = require('koa-bodyparser')
// 引入路由
const Router = require('koa-router')

// 生成app
const app = new Koa()

// 生成路由
router.get('/', (ctx, next) => {
    let html =`
        // 表单 提交信息
        <form method="POST" action="/">
            <input name="name" />
            <button type="submit">submit</button>
        </form>
    `
    ctx.body = html
}).get('/index', (ctx, next) => {
    ctx.body="index"
})

// post 提交post 请求 ctx.request.body
router.post('/', (ctx, next) => {
    let postData = ctx.request.body
    ctx.body = postData
})


const router = new Router()

app
    .use(bodyparser())
    .use(router.routes())
    .use(router.allowedMethods())
app.listen



### 原生的parser和route 在上面
- koa-parser
if(ctx.url === '/' && ctx.method==='GET') {
    let url = ctx.url
    let req_query = ctx.request.query  // ctx.query
    let req_querystring = ctx.request.querystring  // ctx.querystring
    ctx.body ={
        url,
        req_query,
        req_querystring
    }
} else if(ctx.url === '/' && ctx.method === 'POST') {
    let postData = await parserData(ctx)
    ctx.body = postData
} else {
    ctx.body="404"
}

async function parserData(ctx) {
    // 异步
    return new Promise((resolve, reject) => {
        try{
            let postdata = ''
            // 监听
            ctx.req.on('data', (data) => {
                postdata += data
            })
            ctx.req.addListener('end', () => {
                // 转字符串json
                let  json = await parserJson(postdata)
                resolve(json)
            })
        }catch(error) {
            reject(error)
        }
    })
}

function parserJson(queryStr) {
    // 空对象
    let queryData = {}
    let queryStrList = queryStr.split('&')
    for(let [index, queryStr] in queryStrList.entries()) {
        let queryStrItem = queryStrList.split('=')
        queryData[queryStrItem[0]] = decodeURLComponent(queryStrItem[1])
    }

    return queryData

}

app.listen(3000)

- koa-router  ctx.url
const fs = require('fs')
app.use(async(ctx) => {
    let url = ctx.url
    let urls = await route(url)
    ctx.body = urls
})

async function route(url) {
    // 默认404
    let page = '404.html'
    switch(url) {
        case '/':
            page="index.html";
            break;
    }
    let html = await render(page)
    return html;
}

function render(page) {
  return new Promise((resolve, reject) => {
        let pageUrl = `./page/${page}`
        fs.readFile(pageUrl, 'binary', (err,data) => {
        if(err) {
            reject(err)
        }
        else {
            resolve(pageUrl)
        }
    })
  })
}


# cookie

cookie  开发中制作登录和保存用户信息在本地，最常用的就是cookie，
作为一个网站登录 可以设置cookie

koa的上下文(ctx) 直接提供了cookie的读取和写入的方法


- ctx.cookies.get(name,[options]): 读取上下文请求中的cookie
- ctx.cookies.set(name, value, [options])： 在上下文中写入cookie

## 写入Cookie操作 

const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
    if(ctx.url === '/') {
        ctx.cookies.set(
            'MyName','qingsheng',
            {
                domain:'127.0.0.1' // 域名
                path:'/' 路径
                maxAge: 24*60*60*3600 // cookie生效时间
                expries:('2020-1-1') // 失效时间，
                httpOnly:false // 是否只用http 请求
                overwrite:false //是否重写
            }
        )
        ctx.body='cookie is ok'
    } else {
        if(ctx.cookies.get('MyName')) {
            ctx.body=ctx.cookies.get('MyName')
        } else {
            ctx.body='nnnn'
        }

    }
})

# 模板引擎 ejs
开发中不可能把所有html代码全部卸载JS里 没有办法完成大型web开发 必须借助模板机制帮助我们开发。 koa2的模板机制。
借助中间件。

cnpm install --save koa-views
 ejs是著名并强大的模板引擎 可以单独安装
 npm install --save ejs

 安装好ejs模板引擎后，就可以编写模板了，为了模板统一管理，我们新建一个view的文件夹，并在它下面新建index.ejs文件。

 views

 <title><% title= %><title> hhhh
 <body>
    <h1>EJS <% title= % ></h1>
 </body>

 const koa = require('koa')
 const views = require('koa-views')
 const path = require('path')

const app = new Koa()

app.use(views(path.join(__dirname, './views')), {
    let title='jshh'
    ctx.render('index',{
        title
    })
})


# koa-static 静态资源托管 将静态资源 请求 js css png 
安装koa-static
npm install --save static
在static文件夹 放js css 图片

const koa = require('koa')
const static = require('koa-static')
const app = new Koa()

// 引入路径
const staticPath = './static'

app.use(static(
    path.join(__dirname, staticPath)
))




