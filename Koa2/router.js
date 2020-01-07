const Koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const views = require('koa-views')
const path = require('path')
const static = require('koa-static')

const staticPath = './static'

const app = new Koa()
// const router = new Router({
//     // 加前缀 层级
//     prefix: '/qinsheng'
// })

app.use(static(
    path.join(__dirname,staticPath)
))

const router = new Router()
router.get('/', (ctx, next) => {
    let html = `
        <form method="POST" action="/">
        <p>name</p>
        <input name="name" /> 
        <button type="submit">submit</button>
        </form>
    `
    ctx.body = html
})
    .get('/index', (ctx, next) => {
        ctx.body = "index"
    })

router.post('/', (ctx, next) => {
    let postData = ctx.request.body
    console.log('postData', postData)
    ctx.body = postData
})

app.use(views(path.join(__dirname, './views'), {
    extension:'ejs'
}))

app.use(async (ctx) => {
    let title ='jhh'
    await ctx.render('index', {
        title
    })
})

app
    .use(bodyparser())
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(3000, () => {
    console.log('server is start at port 3000')
})


//  路由层级 /api/v1/merge  前缀