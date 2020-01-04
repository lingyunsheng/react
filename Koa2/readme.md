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
