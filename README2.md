## Vue

### 基本使用

### 核心思想  mvc
  - MVC
  - MVP
  - MVVM  MV(VM)
    + M:model
    + V:View
    + VM:ViewModel

### 轻
  - 体积上
  - MVVM
  - 数据绑定
  - 效率高
    - $scope.name

  - Object.defineproperty()  // ie9
    + 能够自己去监视对数据的改变.

### 继续使用
  - vue中双向绑定的原理

### Vue组件

### Vue路由


### 搜索引擎得到js获取的数据
  - 谷歌是可以的


## connect
### connect中间件的概念
[中间件](https://github.com/senchalabs/connect
)
  - app.use中的函数称之为中间件。

  - 轻内核
  - net 模块 //    http://
  - net -> http - connect -> express -> ...

  - body-parser 
    + 处理用户请求的参数
  - compression
    + 压缩代码的

### express
  - 路由的匹配规则
  - 对静态文件的处理
    + express.static('public')


非阻塞IO
- 单线程 ,
  + 有个请求过来，开始读取文件。
  + 多核

- 进程(一般一个软件打开一次就一个进程)
  - 进程里可用有线程
  - node是一个进程》只有一个线程

- 打开多个node,多个进程->多个线程。

[文章](我是一个线程)



异步

## 其他
https://html5test.com/index.html

## 微信二次开发
  - 微信公众台
http://mp.weixin.qq.com
https://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html?ADUIN=1099048193ADSE

### ngrok 
  - 使得外网能够访问局域网

>
<xml>
  <ToUserName><![CDATA[olzRYwMvBIsLngr0Wtze2b_zOJkI]]></ToUserName>\n
  <FromUserName><![CDATA[gh_1c063f89d323]]></FromUserName>\n
  <CreateTime>1475119882</CreateTime>\n
  <MsgType><![CDATA[text]]></MsgType>\n
  <Content><![CDATA[我好只，你好吗!]]></Content>\n
  <MsgId>6335591651325081296
</MsgId>
\n</xml>'