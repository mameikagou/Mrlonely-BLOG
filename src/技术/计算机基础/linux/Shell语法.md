
##  /bin, /boot, /ect
/bin目录下存各种工具：
/bin/bash/cat等等

/boot 一般不更改
/etc 更改频繁，要存用户配置信息

## 
反引号
```sh
# 用于命令替换，执行命令并返回结果
current_date=`date`
files=`ls`

# 等价于 $() 写法（推荐）
current_date=$(date)
files=$(ls)

# 示例
echo "Today is `date`"
echo "Files: $(ls)"
```


## 语法
看一个计算一个目录下所有内容的例子

```sh
#!/bin/bash

calculate_total_size() {
    local directory="$1"

    # 这里表if，要有 if [];then fi 
    # d表示dictionary
    if [ ! -d "$directory" ]; then
        echo "$directory is not a directory"
        exit 1
    fi

    total_size=$(find "$directory" -type f -exec du -b {} \; | awk '{sum += $1} END {print sum}')
    echo "Total size of $directory: $total_size bytes"


}

echo "请输入目录路径: "
read directory
calculate_total_size "$directory"
```

$(find "$dictionary" -type f -exec du -b {} \; | awk '{sum += $1} END')