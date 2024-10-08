# Docker

## 搭建mysql

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

## 安装

docker使用指南: <https://docker-practice.github.io>
国内镜像: <https://vuepress.mirror.docker-practice.com/>

## 阿里云镜像加速

<https://docker-practice.github.io/zh-cn/install/mirror.html>

```sh
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://xx.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

```