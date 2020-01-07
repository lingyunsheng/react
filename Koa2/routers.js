const Koa = require('koa')
const fs  = require('fs')
const app = new Koa()

app.use(async (ctx) => {
    // ctx.request.url 获取地址栏的路径
    let url = ctx.request.url
    // 根据不同的路由返回不同的页面
    let html = await route(url)
    ctx.body=html
})

function render(page) {
    // 返回一个promise
    return  new Promise((resolve, reject) => {
        let pageUrl = `./page/${page}`
        // 读取路径
        fs.readFile(pageUrl, 'binary', (err, data) => {
            console.log(444)
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// 路由判断
async function route(url) {
    // 初始化page
    let page = '404.html'
    switch(url) {
        case '/':
            page='index.html';
            break;
        case '/index':
            page='index.html';
            break;
        case '/todo':
            page='todo.html';
            break;
        case '/404':
            page='404.html';
            break;
        case '/notFound':
            // 文件不存在
            break;
    }
    // 返回一个render方法  page
    let html = await render(page)
    return html
}

app.listen(3000, () => {
    console.log('server is start at port 3000')
})