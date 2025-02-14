
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