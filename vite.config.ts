import { defineConfig } from 'vitepress';

export default defineConfig({
    // 排除所有非md文件，便于你插一些可以跑的脚本
    srcExclude: ['**/*.*', '!**/*.md']
});