## webSocket

### socket.io

### Socket.io与Ajax区别
  - 基于不同的网络协议
    + Ajax基于http协议，单向，实时获取数据只能轮询
    + socket.io基于websocket双向通信协议，后端可以主动推送数据
    + 现在浏览器均支持websocket协议

  - 配合express
    + `Io = require('socket.io') (http) ` 安装`npm install socket.io`
    + `io.on ` 监听时间
    + `io.emit `触发时间
    
  - Socket.io前端API
  - 配合express 
    + `import io from 'socket.io-client'` //客户端库 . 安装`npm install socket.io-client`
    + `io.on`   监听时间
    + `io.emit` 触发事件  








