#### 生成包含特定文件夹更改的补丁

控制的比较精细的规范文件：

```sh
# 1. 生成包含特定文件夹更改的补丁
git diff main..feature_branch -- path/to/folder > changes.patch

# 2. 切换到目标分支
git checkout target_branch

# 3. 应用补丁
git apply changes.patch
```




