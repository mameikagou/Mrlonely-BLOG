# ssh 与 caddy 相关

## caddy的基本使用

### 用途

caddy的用途是便于在服务器上运行一个服务;
它使用go语言编写, 便于配置操作简单;

### 基本使用

配置caddyfile文件, 默认路径是```/etc/caddy/Caddyfile```

## 公钥私钥与ssh-keygen

使用```ssh-keygen命令```可以生成一个公私密钥对, 在服务器上有一个```authorized_keys```文件, 位置是 ``~/.ssh``; 

其中, 带pub的是公钥, 其余的是私钥;

上传服务器时, 将公钥填写到服务器中的```authorized_keys```, 私钥则填写到github的环境变量当中;

## Problem

### ssh refuse

可能是服务器没开ssh

```bash
systemctl status ssh 
```

打开即可

```bash
sudo systemctl start ssh 
```
