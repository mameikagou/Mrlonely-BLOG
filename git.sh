#!/bin/bash

# 自动化Git操作脚本
# 功能：自动build, pull, commit, push

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_message() {
  echo -e "${2}${1}${NC}"
}

# 检查是否在Git仓库中
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  print_message "错误：当前目录不是Git仓库" "$RED"
  exit 1
fi

# 执行pnpm run build
print_message "正在执行构建..." "$YELLOW"
if pnpm run build; then
  print_message "构建成功" "$GREEN"
else
  print_message "构建失败，请检查错误信息" "$RED"
  exit 1
fi

# 获取当前分支
current_branch=$(git branch --show-current)
print_message "当前分支：$current_branch" "$GREEN"


# 检查是否有变更需要提交
if [[ -z $(git status -s) ]]; then
  print_message "没有需要提交的变更" "$YELLOW"
  exit 0
fi

# 显示变更文件
print_message "以下文件有变更:" "$YELLOW"
git status -s

# 询问提交信息
# read -p "请输入提交信息 (默认: 'Update files'): " commit_message
commit_message=${commit_message:-"Update files"}

# 添加所有变更并提交
print_message "正在添加变更并提交..." "$YELLOW"
git add .
if git commit -m "$commit_message"; then
  print_message "提交成功" "$GREEN"
else
  print_message "提交失败" "$RED"
  exit 1
fi

# 拉取最新代码
print_message "正在拉取最新代码..." "$YELLOW"
if git pull; then
  print_message "拉取成功" "$GREEN"
else
  print_message "拉取失败，可能有冲突需要解决" "$RED"
  exit 1
fi

# 推送到远程
print_message "正在推送到远程仓库..." "$YELLOW"
if git push origin $current_branch; then
  print_message "推送成功" "$GREEN"
else
  print_message "推送失败" "$RED"
  exit 1
fi

print_message "所有Git操作已完成" "$GREEN"
