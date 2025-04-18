
## vscode配置

```json
// Place your settings in this file to overwrite default and user settings.
{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.expand": false,
  "explorer.fileNesting.patterns": {
    // 风格配置收敛
    ".eslintrc.js": ".commitlint*, .cz-config*, .editorconfig, .eslint*, .stylelint*",
    ".npmrc": ".npm*",
    "pnpm-lock.yaml": "pnpm-lock*, lerna.json"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
}
```



配置熟悉的vscode tabs ：
false的时候，每次点击都会新建。
true的时候，只有双击才会新建。

```json
"editor.enablePreview":"false"
```

tabs重叠
```json
"workbench.editor.wrapTabs": true
```