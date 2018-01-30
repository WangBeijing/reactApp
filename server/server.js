const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const model = require('./model');
const Chat = model.getModel('chat');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', function(socket){
    //socket当前这次链接请求
    socket.on('sendmsg', function(data){
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({chatid, from, to,content: msg}, function(err,doc){
            io.emit('recvmsg',Object.assign({}, doc._doc))
        })

        //发送给全局io对象
        console.log(data)
        io.emit('recvmsg',data)
    })
})



const userRouter = require('./user')
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     next();
// });

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter)

//用path解决相对的路径的问题
//path.resolve把相对路径变成绝对路径

const path = require('path');
//2.设置中间件
//前端开发port3000,后端port9093，最终上线只能一个端口，如何在9093端口访问打包后的应用这是关键。
app.use(function(req, res, next){
    //设置白名单,user || static 开始的
    if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
        return next()
    }
    //否则就是需要渲染的文件
    return res.sendFile(path.resolve('build/index.html'))
})
//1.访问／开头设置静态资源访问地址，通过中间件的形式转发（白名单）
app.use('/',express.static(path.resolve('build')))


app.get('/',function(req,res){
    res.send('<h1>Hello world</h1>')
})
server.listen(9093,()=>{
    console.log('Node app start at port 9093')
})

//1.购买域名
//2.dns解析到服务器ip
//3.安装nginx
//4.使用pm2管理node进程