

### redis

连不上的排查方案顺序

云服务器的安全组对应端口 -> ufw 防火墙 -> systemd -> docker是否运行良好 -> docker里面的redis容器是否正常

#### 安全组

开放一下安全组的6379端口

#### ufw 防火墙

```sh
sudo ufw status
sudo ufw allow 6379
```

#### systemd & docker

守护进程 以及 docker 的 daemon 运行正常


#### redis容器里面的情况

```sh
docker exec -it redis-test bash

# 进入redis-cli
redis-cli

# 返回pong就是成功了
auth ping 
```