
// 引入koa
const Koa = require('koa')

// new 一个koa 然后使用koa
const app = new Koa()

// 中间件  ctx  ctx koa自带的对象 request response
app.use(async (ctx) => {
    ctx.body = 'hello koa2'
})

// 监听3000端口
app.listen(3000)
console.log('开始运行')