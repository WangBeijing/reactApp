
const express =require('express');
const utils =require('utility');//md5
const Router =express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
//设置不向前台返回密码和版本号
const _filter = { 'pwd': 0, '__v':0};

Router.get('/list',function(req, res){
    //User.remove({}, function(e,d){})
    const { type } = req.query;
    User.find({type}, function(err,doc){
        return res.json({code:0, data:doc})
    })
})

Router.get('/getmsglist', function(req, res){
    const user = req.cookies.userid;
    //'$or':[{from:user, to:user}]
    User.find({}, function(err,userdoc){
        let users = {};
        userdoc.forEach(v=>{
            users[v._id] = {name:v.user, avatar:v.avatar}
        })
        Chat.find({ '$or':[{from:user}, {to:user}] }, function(err, doc){
            if(!err){
                return res.json({code:0, msgs:doc, users:users})
            }
        })
    })    
})
//消息列已读消息
Router.post('/readmsg',function(req, res){
    const userid = req.cookies.userid;
    const {from} = req.body;
    
    Chat.update({from, to:userid},{'$set':{read:true}},{
        //修改多条
        'multi':true
    },function(err,doc){
        console.log(doc)
        if(!err){
            //返回修改条数
            return res.json({code:0, num:doc.nModified})
        }
        return res.json({code:1,msg:'修改失败'})
    })
})
Router.post('/update',function(req, res){
  const userid = req.cookies.userid;
  if(!userid){
    return json.dumps({code:1})
  }
  const body = req.body;
  //查找id并更新body
  User.findByIdAndUpdate(userid, body, function(err, doc){
    console.log(body)  
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    },body)
    console.log(data)
    return res.json({code:0, data})
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
