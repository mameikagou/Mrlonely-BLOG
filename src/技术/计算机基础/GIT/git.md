### git log

查看图形化的提交历史：
```sh
git log --graph --oneline --all
```

## git 

### git restore
// Todo

### git reset

git reset 是一个强大的 Git 命令，用于重置当前分支的 HEAD 到指定的状态。它有三种主要的模式：--soft、--mixed 和 --hard。下面是它们的详细用法：


- git reset --soft `<commit>`：
仅重置 HEAD 到指定的提交。
暂存区和工作区的更改保持不变。
常用于撤销最后一次提交，但保留更改以便重新提交。

```sh
git reset --soft HEAD~1
```
> 举例：我在两次提交中上传了敏感信息，如何解决？
使用`git reset --soft HEAD~2`
撤销两次commit重新提交


- git reset --mixed `<commit>`（默认模式）：
重置 HEAD 到指定的提交。
重置暂存区，但保留工作区的更改。
常用于撤销提交并将更改放回工作区，以便进行修改。

```sh
git reset --mixed HEAD~1
```



- git reset --hard `<commit>`：
重置 HEAD 到指定的提交。
重置暂存区和工作区的更改。
丢弃所有未提交的更改，无法恢复。
此外，还有一些其他选项：

```sh
git reset --hard HEAD~1
```



- git reset `<file>`：
从暂存区中移除指定文件，但保留工作区的更改。
常用于取消暂存文件。

```sh
git reset <file>
```


- git reset --keep `<commit>`：
类似于 --hard，但会保留与目标提交不冲突的本地更改。
如果有冲突的更改，重置会失败。

```sh
git reset --keep HEAD~1
```


- git reset --merge `<commit>`：
类似于 --hard，但会保留未合并的更改。
常用于中止合并操作。
这些是 git reset 的主要用法，根据需要选择合适的模式来管理你的代码历史和工作区。

```sh
git reset --merge
```

- git reset --hard origin/master 
命令会将当前分支的代码重置到远程仓库 origin 的 master 分支的最新提交状态。具体来说，它会执行以下操作：

重置当前分支的 HEAD：将当前分支的 HEAD 指向 origin/master 的最新提交。
重置暂存区：将暂存区的内容重置为 origin/master 的最新提交。
重置工作区：将工作区的内容重置为 origin/master 的最新提交，丢弃所有未提交的更改。

```sh
git reset --hard origin/master 
```

### git revert

`git revert HEAD`本质会多一个commit, 效果是选中的commit反过来;

执行一次相反提交;

!!! 公有分支不能撤销!!!

所以: 当目标是个共有分支的时候, 只能用revert;

可以revert到某次commit

`git revert <git log id>`

##### 最佳实践
使用特定提交或标签而非分支名：

```sh
# 进入子模块目录
cd shared-lib
# 切换到特定提交
git checkout v1.2.3  # 或特定的commit hash
# 回到主仓库并提交这个更改
cd ..
git add shared-lib
git commit -m "Lock shared-lib to version v1.2.3"
```

