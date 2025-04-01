
常用docker-compose.yaml

```yaml
  mysql:
    image: mysql:8.0
    container_name: gin-mysql
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_USER: admin
      MYSQL_PASSWORD: 123456
    volumes:
      - <your path>:/var/lib/mysql/
    command: 
      --default-authentication-plugin=mysql_native_password
```

```json
 {"error": "Error 1044 (42000): Access denied for user 'admin'@'%' to database 'gva'"}
```

缺少权限：

```sh
GRANT ALL PRIVILEGES ON gva.* TO 'admin'@'%';
FLUSH PRIVILEGES;
```


进容器连接：
```zsh
docker exec -it mysql_server bash

mysql -u root -p
```

密码错误：
```zsh
 docker exec -it mysql_server bash
root@c8d9114af3bf:/# mysql -u root -p
Enter password: 
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)
```

删数据卷
```sh
docker-compose down
docker volume rm docker-images_mysql_data
```