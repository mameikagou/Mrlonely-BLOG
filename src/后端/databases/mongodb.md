


### MongoDB

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


### Error

#### 连接失败问题
就是Mongo会去当前的表里找你的用户，但是你实际的用户在admin表里，所以认证失败；
需要加一个authSource=admin
```
mongodb://<account>:<password>@<server_host>:43679/app_db?authSource=admin
```
MongoDB 验证流程：
连接到目标数据库（例如 app_db）
MongoDB 默认在当前数据库中查找用户记录
如果没有指定 authSource，MongoDB 在 app_db.system.users 中查找您的用户
但因为您的用户实际存在于 admin.system.users 中，所以认证失败

#### 文档实例
```js
const doc = await ComponentCodeModel.findById(id);
doc.name = "新名称"; // 可以直接修改
doc.description = "新描述";
await doc.save();    // 可以直接保存（更新数据库）
```
不使用文档实例的情况
```js
const obj = await ComponentCodeModel.findById(id).lean();
obj.name = "新名称";
obj.description = "新描述";
// 无法直接保存，需要额外调用更新方法
await ComponentCodeModel.updateOne(
  { _id: id }, 
  { name: obj.name, description: obj.description }
);

#### 

