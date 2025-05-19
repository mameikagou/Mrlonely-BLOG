

### git submodule

Git Submodule 允许你将一个 Git 仓库作为另一个 Git 仓库的子目录，同时保持提交的独立性。

```
# 在主仓库中添加子模块
git submodule add https://github.com/example/shared-lib.git libs/shared
```
这将：
克隆 shared-lib 仓库到 libs/shared 目录
创建 .gitmodules 文件，记录子模块信息
将子模块添加到暂存区

#### 克隆包含子模块的仓库
```sh
# 方法1：克隆后初始化
git clone https://github.com/example/main-project.git
cd main-project
git submodule init
git submodule update

# 方法2：克隆时直接包含子模块
git clone --recurse-submodules https://github.com/example/main-project.git
```

#### 更新子模块
```sh
# 进入子模块目录
cd libs/shared
git pull origin main

# 回到主仓库，提交更新的子模块引用
cd ../..
git add libs/shared
git commit -m "Update shared library to latest version"`

# 批量更新所有
git submodule update --remote
```

### 不好的地方

- 管理混乱
- 版本地狱，依赖复杂