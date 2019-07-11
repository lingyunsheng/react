### Express+mongodb 开发web后台接口

- Express开发 web后台接口  koa
- 非关系型数据库 mongodb  关系数据库mysql  mongodb json数据
- 使用 nodejs 的 mongoose模块连接和操作mongodb

### Express

- 基于nodejs 快速、开放、极简的web开发框架
 npm install express --save   安装express

- hello world 应用
- npm install -g nodemon

- app.get app.post  数据提交文件
- app.use 文件复杂 使用模块 单独模块使用
- res.send  res.json res.sendfile 响应不同的内容
返回 文本 json 文件


### mongodb mongoose
非关系型数据库
 npm i -g nodemon
 npm i mongoose --save 

 mongodb 存储的就是json 通过mongoose操作mongodb

## mongoose

- Connect连接数据库
- 定义文档模型 Schema和 model 新建模型

## 文档模型
- String Number数据类型
- 定义 create remove update find
- Find FindOne

mongod --config/usr/local/etc/mongod.conf 后台启动
Express结合mongodb'
封装mongoose

- mongodb 独立工具函数
- express 使用body-parser 支持 post 参数
- 使用cookie-parser 获取登录信息cookie

引入 express
创建 app
const app =express()
监听两个路由
app.get('/'，function(req,res)  {
    res.send('<h1>hello</h1>')
})
app.get('/data', function(req,res) {
    User.find({}, function(err, doc) {
        return res.json(doc)
    })
})
监听端口
app.listen(1314, function(){
    console.log('server port is 1314')
})

连接mongodb

引入mongoose

const DB_URL ='mongdb:localhost://27017/immoc'
<!-- 连接数据库 -->
mongoose.connect(DB_URL)

判断是否连接成功
mongoose.connection.on('connected', function() {
    console.log('mongodb connect success')
})

创建数据库和数据表

<!-- 数据模型 -->
const User = mongoose.model('user', new mong00se.Schem({
    user:{type:String,require:true}
    age:{type:Number,require:true}
}))

新增模型

User.create({
    user:'ym',
    age:18
},function(err,doc){
    if(!err) {
        console.log(doc)
    } else {
        console.log(err)
    }
})

删除数据
User.remove({'age':18})

修改数据
User.update({'user':'ym'}{'$set':{age:26},function(err,doc){})

查找数据

User.find({'user':'ym'}, function(err,doc){
    return res.json(doc)
})
findOne