#

1, 搜索, 然后拉取镜像

2, 进入docker里面

```sh
docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

3, 进入docker里面

```sh
docker exec -it my_mysql bash
```

4, 连接数据库(root用户, 密码是123456)

```sh
mysql -uroot -p123456
```
