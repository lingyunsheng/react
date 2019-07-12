const mongoose = require('mongoose')
// 连接mongo 并且使用myapp这个集合
const DB_URL = 'mongodb://localhost:27017/myapp'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function() {
    console.log('mongo connect success')
})