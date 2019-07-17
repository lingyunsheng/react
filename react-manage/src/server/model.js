const mongoose = require('mongoose')
// 连接mongo 并且使用myapp这个集合
const DB_URL = 'mongodb://localhost:27017/myapp'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
    console.log('mongo connect success')
})

// 定义模型

const models = {
    user: {
        'user': { type: String, require: true },
        'pwd': { type: String, require: true },
        'type': { 'type': String, require: true },
        //  头像
        'avatar': { 'type': String },
        // 个人简介或者职位简介
        'desc': { 'type': String },
        // 职位名
        'title': { 'type': String },
        // 如果是企业
        'company': { 'type': String },
        'money': { 'type': String }
    },
    chat: {
        'chatid':{'type':String,require:true},
        'from':{'type':String,require:true},
        'to':{'type':String,require:true},
        'read':{'type':Boolean,default:false},
        'content':{'type':String,require:true,default:''},
        // 用户排名 事件 顺序
        'create_time':{'type':Number,default:new Date().getTime()}
    }
}
// 遍历模型注册号
for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function (m) {
        return mongoose.model(m)
    }
}