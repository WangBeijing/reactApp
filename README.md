## 技术栈:

>  前端：react + react-router + redux + ES6/7 + webpack + [axios](https://www.npmjs.com/package/axios)

>  后台：node [express](http://www.expressjs.com.cn/)

>  数据库： mongodb 可视化工具 Robo T3

## 项目运行:

### 启动前端

```
git clone https://github.com/WangBeijing/reactApp.git

cd reactApp

npm install

npm start //启动项目

//本地访问 localhost:3000/login

```

### 启动后台
```
cd reactApp

node server/server.js
```

## 工具介绍

>  **nodemon**

- 修改了服务端代码，node**服务器会自动重启**。
- 安装`npm install -g nodemon`,输入`nodemon server.js`

>  **utility**

- 本项目使用后台md5加密,加密方式：密码加盐再加密，加密算法为md5(md5(密码+String))
- 安装`npm install utility --save-dev`
- 当然在公司项目确保安全性前端将密码加密一次再发送服务端。

> **proxy解决跨域**

- 在`package.json`文件下设置`"proxy": "http://localhost:9093"`
- web端`localhost:3000/login` 请求本地服务API `http://localhost:9093/user/login`

> **cookie保存登录状态**

- 登录后服务端返回cookie，浏览器会自动存储在http中，这样就可以访问资源了
- 安装`npm install cookie-parser --save`
- 服务端在DB中查到相应的记录，并将记录的主键id写入到cookie中返回给前端作为通信状态标识。
  ```
  User.findOne({user, pwd}, function(err, doc){
    if(err){}
    if(!doc){}
    res.cookie('userid', doc._id)
    return res.json({code:1, data.doc})
    })
  ```




## 后台mongodb数据库

- 按照默认的配置文件启动.
  - `mongod --config /usr/local/etc/mongod.conf` mongod.conf的内容是关于MongoDB的设置

- 首先需要连接到MongoDB service:
  - `mongo`
- 插入数据:
  - `db.test.insert({'name':'test'})` test为表名，如果是user表则为`db.user.insert()`
- 查看数据:
  - `db.test.find()`

![](https://github.com/WangBeijing/reactApp/blob/master/src/component/img/boy.png)

[x]
