const express = require('express')
// 引入库
const mongoose = require('mongoose')
// 连接mongo 并且使用myapp这个集合
const DB_URL = 'mongodb://localhost:27017/myapp'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function() {
    console.log('mongo connect success')
})
// 类似于mysql的表 mongo里有文档字段的概念
const User = mongoose.model('user', new mongoose.Schema({
    user:{type:String,require:true},
    age:{type:Number,require:true}
}))
// 增加
User.create({
    user:'zly',
    age:24
},function(err, doc) {
    if (!err) {
        console.log(doc)
    } else {
        console.log(err)
    }
})
// 新建app
const app = express()

// 更新 过滤条件
User.update({'user':'杨幂'},{'$set':{age:26}},function(err,doc){
    if(!err) {
        console.log(doc)
    }
})
// 删除
User.remove({age:34},function(err,doc){
    console.log(doc)
})
// 发送
app.get('/', function (req, res) {
    res.send('<h1>Hello,World</h1>')
})
// 返回给前台
app.get('/data', function (req, res) {
    // 查找
    User.findOne({'user':'zly'}, function(err, doc){
        //  res.json({name:'node express框架',type:'it'})
        return res.json(doc)
    })
   
})
app.listen(1314, function () {
    console.log('Node app start at port')
})