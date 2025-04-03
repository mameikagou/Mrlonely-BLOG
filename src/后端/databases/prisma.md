## Prisma

Prisma 创造了一种 DSL（Domain Specific Language，领域特定语言）。

### schema.prisma

![alt text](../images/image3.png)

<https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-postgresql>

```sh
psql -U postgres -d admindashboard -p 5434

-U 用户名
-d 数据库名
```

```sh
 psql "postgresql://postgres:password@localhost:5434/admindashboard"

 postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

常用命令：

```md
展示所有数据库： \l
切换当前数据库： \c databasename
列出所有的表： \dt
查看连接信息 \conninfo
退出会话 \q
```



有关prisma环境变量的
<https://www.prisma.io/docs/orm/more/development-environment/environment-variables/managing-env-files-and-setting-variables>

```sh
export DATABASE_URL=
printenv DATABASE_URL
```