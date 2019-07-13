// 中间件
const express = require('express')
const utils = require('utility')
const Router = express.Router()
// 路由对象进行挂载
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0,'__v':0}
// 用户列表
Router.get('/list',function(req,res) {
    // User.remove({},(err,doc) =>{
    //     if (!err) {

    //     }
    // })
    User.find({},function(err,doc){
        return res.json({code:0,doc,msg:'用户列表获取成功'})
    })
})
Router.post('/login', function(req,res) {
    const {user,pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)},{'pwd':0},function(err,doc) {
        if(!doc) {
            return res.json({code:1,msg:'用户名不存在或密码错误'})
        }
        // 设置cookie
        res.cookie('useid',doc._id)
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
        if(err) {
            return res.json({code:1,msg:'后端出错了'})
        }
        User.create({user,pwd:md5Pwd(pwd),type},function(err,doc) {
            // 如果出错了
            if(err) {
                return res.json({code:1,msg:'后端出错了'})
            }
            return res.json({code:0})
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