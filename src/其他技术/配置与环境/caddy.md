# Caddy

按照官方文档安装, 安装完成后, 执行 `caddy version` 查看版本
如果成功, 在浏览器中访问ip地址即可访问到caddy的默认页面

## 配置文件
Caddy的配置文件是 `Caddyfile`, 位于 `/etc/caddy/Caddyfile`

将其默认内容修改为你的域名, 并保存,即可启用https;

## 使用docker配置

编写docker-compose.yml文件

```yaml
services:
  caddy:
    image: caddy
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443'
```

-d 表示后台守护进程
```sh
docker compose up -d
```

使用docker compose logs

会发现https配置失败: 

需要配置好域名dns域名和修改Caddyfile配置文件

```sh
| {"level":"warn","ts":1728458421.179755,"logger":"http.auto_https","msg":"server is listening only on the HTTP port, so no automatic HTTPS will be applied to this server","server_name":"srv0","http_port":80}
```

## 查看端口占用情况

```
netstat -tulpn
```

其中tcp表示TCP协议, u表示UDP协议, l表示监听, p表示进程信息, n表示显示数字地址和端口号, 最后的-a表示显示所有连接