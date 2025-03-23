#!/bin/bash

# 跑一下就知道这仨是做什么的了
function show_params() {
    echo "参数总数 \$#: $#"
    echo "参数列表 \$*: $*"
    echo "参数列表 \$@: $@"
    
    echo "\n使用循环遍历 \$* :"
    for arg in "$*"
    do
        echo "$arg"
    done
    
    echo "\n使用循环遍历 \$@ :"
    for arg in "$@"
    do
        echo "$arg"
    done
}

# 调用函数，传入参数
show_params "hello world" "apple" "banana"