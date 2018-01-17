## webSocket

### socket.io

### Socket.io与Ajax区别
  - 基于不同的网络协议
    + Ajax基于http协议，单向，实时获取数据只能轮询
    + socket.io基于websocket双向通信协议，后端可以主动推送数据
    + 现在浏览器均支持websocket协议

  - Socket.io 配合express
    + 安装 `npm install socket.io`
    + `Io = require('socket.io')(http)`
    + `io.on ` 监听时间 `io.emit `触发时间
    +  
    ```
    const app = express();
    ##Socket.io和express配合，需要Socket.io和http借口统一起来
    const server = require('http').Server(app);//express server
    const io = require('socket.io')(server);//server传给io对象
    io.on('connection', function(socket){
        console.log('user login')
    })
    ```
    
  - Socket.io 客户端 前端API 
    + 安装 `npm install socket.io-client --save`
    + `import io from 'socket.io-client'` //客户端库 . 
    + `io.on`   监听时间
    + `io.emit` 触发事件  








