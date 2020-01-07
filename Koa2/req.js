const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
    // context   ctx.method
    if(ctx.url==='/' && ctx.method==='GET') {
        // 显式具体表单页面
        // 模板字符串 格式
        let html = `
            <h1>post请求</h1>
            <form method="post" action="/">
                <p>username</name>
                <input name="name" /> <br/>
                <p>age</name>
                <input name="age" /> <br/>
                <p>website</name>
                <input name="website" /> <br/>
                <button type="submit">submit</button>
            </form>
        `
        ctx.body=html
    } else if(ctx.url==='/' && ctx.method==='POST') {
        let postData = await parsePostData(ctx)
        ctx.body= postData
    } else {
        ctx.body='<h1>404页面</h1>'
    }
})

// req 方法
function parsePostData(ctx) {
    // 声明promise
    return new Promise((resolve,reject) => {
        // 追踪错误
        try{
            // 接收对象
            let postdata = " "
            // 将提交的表单数据转成querystring 字符串
            ctx.req.on('data', (data) => {
                postdata += data
            })
            // 监听事件
            ctx.req.addListener("end", function() {
                let parseData = parseQueryStr(postdata)
                resolve(parseData)
            })
        }catch(error) {
            reject(error)
        }
    })
}

// 将字符串转化为json  deCode  queryStr 字符串
function parseQueryStr(queryStr) {
    let queryData = {}
    let queryStrList = queryStr.split('&')
    console.log(queryStrList)
    // entries 返回的数组 索引
    console.log(queryStrList.entries())
    for( let [index,queryStr] of queryStrList.entries() ) {
        let itemList = queryStr.split('=')
        // decodeURIComponent  decodeURLComponent  乱码转换
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}

app.listen(3000, ()=> {
    console.log('server at port 3000')
})