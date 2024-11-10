

# 

git报错:

```sh
> git -c user.useConfigOnly=true commit --quiet --allow-empty-message --file -
error: gpg failed to sign the data
fatal: failed to write commit object

```

## 解决方式

使用这个进行测试
```
export GPG_TTY=$(tty)
echo "test" | gpg --clearsign
```