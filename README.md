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
	- 修改了服务端代码，node**服务器会自动重启**。安装`npm install -g nodemon`,输入`nodemon server.js`

## 后台mongodb数据库

- 按照默认的配置文件启动.
  - `mongod --config /usr/local/etc/mongod.conf` mongod.conf的内容是关于MongoDB的设置

- 首先需要连接到MongoDB service:
  - `mongo`
- 插入数据:
  - `db.test.insert({'name':'test'})` test为表名，如果是user表则为`db.user.insert()`
- 查看数据:
  - `db.test.find()`

![](https://github.com/WangBeijing/reactApp/blob/master/src/component/login/job.png)

###   使用proxy解决前后端跨域问题
>  本地web端`localhost:3000/login` 请求本地服务器API `http://localhost:9093/user/login`
```
"proxy": "http://localhost:9093"
```