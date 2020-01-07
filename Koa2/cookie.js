const Koa = require('koa')

const app = new Koa()

app.use(async (ctx) => {
    if(ctx.url === '/') {
        ctx.cookies.set(
            'MyName','qinsheng',
            {
                domian:'127.0.0.1', // 写cookie的域名
                path:'/',  // 写cookie所在的路径
                maxAge: 100*60*60*24,  // cookie的有效时长
                expires: new Date('2020-1-31'), //cookie失效时间
                httpOnly:false, // 是否只用于http请求
                overwrite:false // 是否允许重写
            }
        )
        ctx.body='cookie is  ok'
    } else {
        if(ctx.cookies.get('MyName')) {
            ctx.body = ctx.cookies.get('MyName')
        } else {
            ctx.body= 'cookie'
        }
    }
})

app.listen(3000, () => {
    console.log('server ist started at port 3000')
})