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

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter)
app.get('/',function(req,res){
    res.send('<h1>Hello world</h1>')
})
server.listen(9093,()=>{
    console.log('Node app start at port 9093')
})