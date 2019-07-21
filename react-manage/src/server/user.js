// 中间件
const express = require('express')
const utils = require('utility')
const Router = express.Router()
// 路由对象进行挂载
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0,'__v':0}
// Chat.remove({},function(err,doc) {

// })
// 用户列表
Router.get('/list',function(req,res) {
    // User.remove({},(err,doc) =>{
    //     if (!err) {

    //     }
    // })
    // 获取用户列表type识别
    const {type} = req.query
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc,msg:'用户列表获取成功'})
    })
})
// 消息列表更新
Router.get('/getmsgList',function(req,res) {
    // 聊天内容 用户信息获取
    const user = req.cookies.userid
    User.find({},function(e,userdoc){
        // 用户拿出来
        let users={}
        userdoc.forEach(v=>{
            users[v._id]={name:v.user,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc) {
            if(!err) {
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })

})
Router.post('/readmsg', function(req, res){
	const userid = req.cookies.userid
	const {from} = req.body
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},
		function(err,doc){
		console.log(doc)
		if (!err) {
			return res.json({code:0,num:doc.nModified})
		}
		return res.json({code:1,msg:'修改失败'})
	})
})
// 更新消息请求
Router.post('/update',function(req,res) {
    // 获取cookie
    const userid = req.cookies.userid
    if(!userid) {
    // 没有cookie
        return res.json({code:1})
    }
    const body = req.body
    // mongoose更新数据
    User.findByIdAndUpdate(userid,body, function(err,doc) {
        // 合并
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
})
Router.post('/login', function(req,res) {
    const {user,pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc) {
        if(!doc) {
            return res.json({code:1,msg:'用户名不存在或密码错误'})
        }
        // 设置cookie
        res.cookie('userid',doc._id)
        return res.json({code:0,msg:'登录成功'})
    })
})
// 注册
Router.post('/register',function(req,res) {
    // 接受传递的参数
    console.log(req.body)
    const {user,pwd,type} = req.body
    // 查询用户名是否重复
    User.findOne({user},function(err,doc) {
        if (doc) {
            return res.json({code:1,msg:'用户名已存在'})
        }
        // if(err) {
        //     return res.json({code:1,msg:'后端出错了'})
        // }
        // User.create({user,pwd:md5Pwd(pwd),type},function(err,doc) {
        //     // 如果出错了
        //     if(err) {
        //         return res.json({code:1,msg:'后端出错了'})
        //     }
        //     return res.json({code:0})
        // })
        	
		const userModel = new User({user,type,pwd:md5Pwd(pwd)})
		userModel.save(function(e,d){
			if (e) {
				return res.json({code:1,msg:'后端出错了'})
			}
			const {user, type, _id} = d
			res.cookie('userid', _id)
			return res.json({code:0,data:{user, type, _id}})
		})
    })
})
// 加密
function md5Pwd(pwd) {
    const salt = 'myapp_is_good@###hhahah678879899999'
    return utils.md5(utils.md5(pwd+salt))
}
Router.get('/info',function(req,res) {
    const {userid} = req.cookies
    if(!userid) {
          // 用户有没有cookie
    return res.json({code:1,msg:'未登录'})
    }
    User.findOne({_id:userid},_filter,function(err,doc) {
        if(err) {
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc) {
            return res.json({code:0,doc:doc})
        }
    })
})

module.exports = Router