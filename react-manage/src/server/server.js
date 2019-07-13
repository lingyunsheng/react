const express = require('express')
// 引入库
const utils = require('utility')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
// 开启中间件


const app = express()

app.use(cookieParser())
// 解析cookie
app.use(bodyParser.json())
// 解析post的json
app.use('/user',userRouter)


// 发送
// app.get('/', function (req, res) {
//     res.send('<h1>Hello,World</h1>')
// })
app.listen(1314, function () {
    console.log('Node app start at port')
})