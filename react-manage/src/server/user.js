// 中间件
const express = require('express')
const Router = express.Router()
// 路由对象进行挂载

Router.get('/info',function(req,res) {
    return res.json({code:1})
})

module.exports = Router