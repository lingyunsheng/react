const express = require('express')
// 新建app
const app = express()

// 发送
app.get('/', function (req, res) {
    res.send('<h1>Hello,World</h1>')
})
// 返回给前台
app.get('/data', function (req, res) {
    res.json({name:'node express框架',type:'it'})
})
app.listen(1314, function () {
    console.log('Node app start at port')
})