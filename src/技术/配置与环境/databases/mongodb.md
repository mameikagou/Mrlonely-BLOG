


MongoDB
```sh
# 直接输入mongosh 相当于：
mongosh "mongodb://localhost:27017"
mongosh --host <ip> --port 27017
```

使用密码：
```sh
mongosh "mongodb://mongodb0.example.com:28015" --username alice --authenticationDatabase admin
```

常用命令：
```sh
show dbs 查看所有数据库
show db 查看当前数据库
```

创建以及打开数据库
```sh
use testdb # use的同时会创建以及打开
```