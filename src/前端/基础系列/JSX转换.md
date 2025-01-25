

## JSX转换

在旧版本 react17之前，需要显示声明`import React from 'react'`，因为需要调用React.createElement('div')；


在react17之后，不需要显示声明，因为babel会自动将JSX转换为React.createElement('div')

```ts
// Babel 自动插入：
import { jsx as _jsx } from 'react/jsx-runtime';
const element = _jsx('div', {});

```