
const express =require('express');
const utils =require('utility');//md5
const Router =express.Router();
const model = require('./model');
const User = model.getModel('user');
//设置不向前台返回密码和版本号
const _filter = { 'pwd': 0, '__v':0};

Router.get('/list',function(req, res){
    //User.remove({}, function(e,d){})
    User.find({}, function(err,doc){
        return res.json(doc)
    })
})
Router.post('/login',function(req, res){
    const {user, pwd} = req.body;
    User.findOne({user, pwd:amd5Pwd(pwd)}, _filter, function(err,doc){
        if(!doc){
            return res.json({code:1, msg:'用户名或密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0, data:doc})
    })
})
Router.post('/register', function(req,res){

    const {user, pwd, type} = req.body;
    User.findOne({user},function(err, doc){
        if(doc){
            return res.json({code:1, msg:'用户名重复'})
        }
        const userModel = new User({user, type, pwd:amd5Pwd(pwd)})
        userModel.save(function(e,d){
            if(e){
                return res.json({code:1, msg:'后端出错了'})
            }
            const {user, type, _id} = d;
            res.cookie('userid', _id)
            return res.json({code:0, data:{user, type, _id}})
        })

    })
})
Router.get('/info',function(req,res){
    const { userid } = req.cookies;
    if( !userid ){
        return res.json({ code : 1})
    }
    User.findOne({_id:userid}, _filter, function(err, doc){
        if(err){
            return res.json({code:1, msg:'后端出错'})
        }
        if(doc){
            return res.json({code:0, data:doc})
        }
    })
    //return res.json({code:1})
})
//加盐
function amd5Pwd (pwd) {
    const salt = 'react-vue';
    return utils.md5(utils.md5(pwd+salt))
}

module.exports=Router
