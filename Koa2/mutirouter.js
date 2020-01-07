const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

// 子路由
let home = new Router()
home.get('/', (ctx, next) => {
    ctx.body="home下的page"
}).get('/index', (ctx, next) => {
    ctx.body="home吓的index"
})

let page = new Router()
page.get('/', (ctx, next) => {
    ctx.body="page下的page"
}).get('/index', (ctx, next) => {
    ctx.body="page的index"
})

// 子路由 装载

// 主路由  父级路由
let router  = new Router()
router.use('/home', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

app
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(3000, () => {
    console.log('server is start at port 3000')
})


//  路由层级 /api/v1/merge  前缀