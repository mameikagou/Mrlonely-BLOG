# 一个报错：

```sh
✖ rendering pages...
build error:
window is not defined
ReferenceError: window is not defined
    at file:///Users/mrlonely/mrlonely/mrlonely-code/gitclone/Mrlonely-BLOG/node_modules/.pnpm/oh-my-live2d@0.19.3/node_modules/oh-my-live2d/dist/index.js:29:1
    at ModuleJob.run (node:internal/modules/esm/module_job:194:25)
```

起因是vitepress部分使用的是cjs，没有window对象；

解决：
在动态引入时，加入判断

```js
if (typeof window !== 'undefined') {
  import('oh-my-live2d').then(module => {
    // 使用模块
  });
}
```