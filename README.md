## 技术栈:

>  前端：react + react-router + redux + ES6/7 + webpack + [axios](https://www.npmjs.com/package/axios)

>  后台：node [express](http://www.expressjs.com.cn/)

>  数据库： mongodb 可视化工具 Robo T3

## 项目运行:

### 启动前端

```
# 克隆项目
git clone https://github.com/WangBeijing/reactApp.git

# 进入目录
cd reactApp

# 安装依赖
npm install

# 启动项目
npm start 

```
> [淘宝镜像](http://npm.taobao.org/) `$ npm install -g cnpm --registry=https://registry.npm.taobao.org`

> 浏览器访问访问 localhost:3000/login

### 启动后台
```
cd reactApp

node server/server.js

#链接mongo
mongo
```

## 工具介绍

>  **nodemon**

- 修改了服务端代码,node**服务器会自动重启**。
- 安装`npm install -g nodemon`,输入`nodemon server.js`

>  **utility**

- 本项目使用后台md5加密,加密方式:密码加盐再加密，加密算法为md5(md5(密码+String))
- 安装`npm install utility --save-dev`
- 当然在公司项目确保安全性前端将密码加密一次再发送服务端.

> **proxy解决跨域**

- 在`package.json`文件下设置`"proxy": "http://localhost:9093"`
- web端`localhost:3000/login` 请求本地服务API `http://localhost:9093/user/login`

> **前后端交互cookie保存登录状态**

- 登录后服务端返回`cookie`，浏览器会自动存储在http中，这样就可以访问资源了
- `express`依赖`cookie-parser`,安装`npm install cookie-parser --save`
- 登录时，服务端在DB中查到相应的记录，并将记录的主键id写入到cookie中返回给前端作为通信状态标识。
  ```
  User.findOne({user, pwd},{'pwd': 0}, function(err, doc){
    if(err){}
    if(!doc){}
    res.cookie('userid', doc._id)
    return res.json({code:0, data.doc})
    })
  ```
  ![](https://github.com/WangBeijing/reactApp/blob/master/images/F526BF61-40F0-49BF-A437-6846AA6F22AE.png)
  ![](https://github.com/WangBeijing/reactApp/blob/master/images/WX20180109-161546%402x.png)

- 登录成功后，服务端会检查`request`中`cookie(token)`，做访问资源受限。
  ```
  Router.get('/info', function(req, res){
      const { userid } = req.cookies;
      if(!userid){
        return res.json({code : 1});//没有userid
      }
      User.findOne({_id:userid},{'pwd': 0},function(err,doc){
          if(err){
            return res.json({code: 1, msg:'后端出错'})
          }
          if(doc){
            return res.json({code: 0 , data:doc})
          }
      })
  })
  ```
> **浏览器cookie**
- `Name`cookie标识 
- `Value`值 
- `Domain`当前cookie只在locahost域名下有效 
- `Path`域名资源地址 
- `Expires`过期时间 
- `Size` cookie大小
- `HTTP` httponly：js无法修改，对cookie的操作只能放到后端，安全性更高 
- `Secure`安全，https，
- `SameSite`当前这个域名下发出cookie，防御csrf攻击。
- 安装`npm install browser-cookies --save`,[用法](https://www.npmjs.com/package/browser-cookies)

>  **prop-types**

- Rect属性类型检测,安装`npm install prop-types --save` [用法](http://www.css88.com/react/docs/typechecking-with-proptypes.html)

> **npm script**

- 前端工作流，创建自定义命令，npm run 执行自定义命令。
- 安装`cross-env`,`npm install cross-env --save-dev`,在`NODE_ENV=production`前面添加`cross-env`就可以了
- 在js文件中使用`process.env.ENV_CONFIG`就可以接受自定义参数了。
  ```
  "scripts":{
    "dev": "node build/dev-server.js",
    "build-dev": "cross-env NODE_ENV=production env_config=dev node build/build.js",//npm run build-dev构建测试环境
    "build-prod": "cross-env NODE_ENV=production env_config=pro node build/build.js",//npm run build-prod构建正式环境版本
  }
  ```

## 后台mongodb数据库

- 按照默认的配置文件启动.
  - `mongod --config /usr/local/etc/mongod.conf` mongod.conf的内容是关于MongoDB的设置
- 首先需要连接到MongoDB
  - `mongo`
- 插入数据:
  - `db.test.insert({'name':'test'})` test为表名,如果是user表则为`db.user.insert()`
- 查看数据:
  - `db.test.find()`

## Emoji表情简介
- [Emoji](https://emojipedia.org/) 的国际标准在 2015 年出台,截止2017年4月,列入Unicode的Emoji共有[2389个](http://www.unicode.org/emoji/charts/full-emoji-list.html).
- 目前，[苹果系统](https://emojipedia.org/apple/)、[安卓系统](https://emojipedia.org/google/)、[Twitter](https://twitter.github.io/twemoji/preview.html)、[Github](https://gist.github.com/rxaviers/7360908)、[Facebook](https://emojipedia.org/facebook/) 都有自己的 Emoji 实现.
- emoji使用方式
  - 最简单的方法复制/粘贴,`getEmoji.com` 选中一个 Emoji 贴在自己的文档即可.
  ```
  const emoji = '😃 😘 🙄 😊 🤔 😍 😂 👰 🐻 🍔 ⚽ 🌇 💡 🔣 🎌 📊 🚧 🇦🇺 😃 ❤ 😘 🙄 😊 🤔';
  ```
  - JavaScript插入Emoji,推荐使用 [node-emoji](https://www.npmjs.com/package/node-emoji) 这个库.
  ```
  var emoji = require('node-emoji');

  // 返回 coffee 的 Emoji
  emoji.get('coffee');

  // 返回文字标签对应的 Emoji
  // https://www.webpagefx.com/tools/emoji-cheat-sheet/
  emoji.get(':fast_forward:');

  // 将文字替换成 Emoji
  emoji.emojify('I :heart: :coffee:!');

  // 随机返回一个 Emoji 
  emoji.random();

  // 查询 Emoji
  // 返回结果是一个数组 
  emoji.search('cof');
  ```
  - 通过CSS插入
  ```
  <link href="https://afeld.github.io/emoji-css/emoji.css" rel="stylesheet">
  <i class="em em-baby"></i>
  ```

  ## react遍历数组key

  ## eslint代码规范
  eslint是一个开源的JavaScript代码检查工具,团队中使用eslint正是用来统一JavaScript代码风格.
  ### 基础配置
  首先引入eslint基础包,再加入webpack中对应的插件eslint-loader,然后在项目根目录下创建.eslintrc文件后进行eslint的配置<br>
  通过.eslintrc文件规则配置,告诉eslint工具需要检查哪些[语法规则](http://eslint.cn/docs/rules/?spm=5176.11156381.0.0.42237161QnUxkl)，配置方式如下:
  ```
  "rules": [
    "rule-name1": "0",
    "rule-name2": "1",
    "rule-name3": "2"
  ]
  ```
  规则格式是"<规则名称>: <告警级别>"，告警级别分为三种:
  - "0"表示忽略问题，等同于"off"
  - "1"表示给出警告，等同于"warn"
  - "2"表示直接报错，等同于"error"
  引入并配置好eslint和eslint-loader后，就可以开始添加webpack的相关配置了:
  ```
  preLoaders: [
    {
        test: /\.js$/,  // 检测所有的js文件
        loader: "eslint-loader", // 使用eslint插件
        exclude: [   // 排除第三方文件
            /node_modules/,
            /app\/lib/
        ]
    }
  ]
  ```
  让webpack在打包文件之前，对除第三方外的js文件用eslint进行检查。<br>
  完成上述配置后，webpack在构建时就能自动对js代码用eslint进行检查了。<br>
  注：由于webpack在默认配置下遇到error并不会抛出错误终止代码打包，需要在webpack命令上添加bail参数让webpack抛出错误:
  ```
  webpack --bail --progress --colors --config webpack.config.js
  ```
    
  默认在package.json中有eslint配置`"eslintConfig": {"extends": "react-app"}`继承reat-app,是`Create React App`默认eslint配置。<br>
  在此基础可以再加一些配置[官网地址](http://eslint.cn/),针对`eslint eqeqeq: "error"`,eslint要求使用 `=== && !==` ,为了关闭提示可以为此增加一条rules[更多规则](http://eslint.cn/docs/rules/eqeqeq),提示级别划分为0-off,1-warn,2-error.<br>
  ```
  "eslintConfig": {
    "extends": "react-app",
    "rules":{
      "eqeqeq":["off"]      //或者[0]标识关闭
    }
  }
  ```
>推荐使用Github上airbnb[JavaScript Style Guide](https://github.com/airbnb/javascript)代码规范

 ## async、await优化异步代码
从最早处理使用setTimeout处理异步会造成call hell(回调地狱)使代码变得非常臃肿不可读。
衍生出了Promise,axios默认的形式。用.then来处理成功的回调优化写异步的形式但还是会出点.then().then()多个情况。
async+await配合使用,await必须在async内部。
```
export function readMsg(from){
    return async (dispatch,getState)=>{
        //await确保同步完成之后再执行下面的代码,并且把返回值放到res里。
        const res = await axios.post('/user/readmsg',{from})
        const userid = getState().user._id;
        if(res.status==200&& res.data.code == 0){
            dispatch(msgRead({userid, from, num:res.data.num}))
        }
    }
}
```
>这样看起来代码并没有异步的感觉,全都是按照同步的顺序来编写。