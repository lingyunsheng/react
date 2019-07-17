const express = require('express')

const model = require('./model')
const Chat = model.getModel('chat')
// 引入库
const utils = require('utility')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
// 引入socket.io库
// work with express  和express 配合 监听端口


const server = require('http').Server(app)
const io = require('socket.io')(server)
// io.on io.emit
io.on('connection', function(socket) {
    console.log('user login')
    // 当前这次请求 io全局
    socket.on('sendmsg',function(data) {
        // console.log(data)
        // // 发送全局事件 每个人都在接受状态
        // io.emit('recvmsg',data)
        const { from ,to,msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc) {
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
  
})


const userRouter = require('./user')
// 开启中间件




app.use(cookieParser())
// 解析cookie
app.use(bodyParser.json())
// 解析post的json
app.use('/user',userRouter)


// 发送
// app.get('/', function (req, res) {
//     res.send('<h1>Hello,World</h1>')
// })
server.listen(1314, function () {
    console.log('Node app start at port')
})