
## 启动mongodb服务端

按照默认的配置文件启动.
  `mongod --config /usr/local/etc/mongod.conf`
  mongod.conf的内容是关于MongoDB的设置

- [首先需要连接到MongoDB service:]
  - [`mongo`]
插入数据:
  `db.test.insert({'name':'test'})`
查看数据:
  `db.test.find()`
