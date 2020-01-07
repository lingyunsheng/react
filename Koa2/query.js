const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
    // url 请求地址   
    let url = ctx.url
    // 从request接收get请求  
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring

    // 从上下文接收
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring

    ctx.body={
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    }
})

app.listen(3000, () => {
    console.log('query querystring')
})