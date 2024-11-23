
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