# ssh 与 caddy 相关

## caddy的基本使用

### 用途

caddy的用途是便于在服务器上运行一个服务;
它使用go语言编写, 便于配置操作简单;

### 基本使用

配置caddyfile文件, 默认路径是```/etc/caddy/Caddyfile```

## 公钥私钥与ssh-keygen

使用```ssh-keygen```命令可以生成一个公私密钥对, 在服务器上有一个```authorized_keys```文件, 位置是 ``~/.ssh``; 

其中, 带pub的是公钥, 其余的是私钥;

上传服务器时, 将公钥填写到服务器中的`authorized_keys`, 私钥则填写到github的环境变量当中;

## 配置免密登录

修改该路径下的`sshd_config`文件:

```sh
/etc/ssh/sshd_config
```

重启服务

```sh
systemctl restart sshd
```

然后同上, 使用`ssh-keygen`, 公钥放到服务器`~/.ssh`下的`authorized_keys`, 私钥用作凭证

## vscode ssh remote

官方文档还是挺详细的:<https://code.visualstudio.com/docs/remote/ssh#_remember-hosts-and-advanced-settings>

```
Host ip地址
  HostName 主机名
  User 用户
  IdentityFile 这个是你的私钥位置, 还记得上面写的公钥私钥如何使用吗?
```

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
