const express = require('express')
// 引入库
const userRouter = require('./user.js')
// 开启中间件
const app = express()
app.use('/user',userRouter)


// 发送
// app.get('/', function (req, res) {
//     res.send('<h1>Hello,World</h1>')
// })
app.listen(1314, function () {
    console.log('Node app start at port')
})