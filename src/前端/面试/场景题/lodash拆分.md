

### lodash引入问题

- 手动按路径引入
    - 举例：
        - 错误：import { debounce, throttle } from 'lodash';
        - 正确：import throttle from 'lodash/throttle';
    - 兼容性最好，也没有多余代码。
- 使用 lodash-es 包
    - 老项目中无法使用
- 使用 babel-plugin-lodash（适用于基于 Babel 的旧项目）
    - 它可以在代码编译阶段，自动将 import { debounce } from 'lodash' 这种写法转换为方案一中的 import debounce from 'lodash/debounce'。
    - 缺点是：强依赖Babel


#### 其他
- 通过 Code Review 和 ESLint 规则，强制改写为 import debounce from 'lodash/debounce'
- 配置组件库按需引入： 对于 Ant Design，我引入了 babel-plugin-import 插件（在旧的 Babel 环境下），它能自动将 import { Button } from 'antd' 转换为 import Button from 'antd/es/button' 并引入对应的样式。这使得只有被用到的组件才会被打包，UI 库的体积贡献直接减少了 90% 以上。
- 精简 moment.js： 我利用 Webpack 的 ContextReplacementPlugin，在打包时明确告诉 Webpack，我们只需要 moment/locale/zh-cn 和 moment/locale/en-gb 这两个语言包。这个小小的配置，就为我们节省了近 200KB 的空间。

- 代码分割：
    - 动态导入和懒加载

```js
// Before
import DashboardPage from './pages/Dashboard';
// After
const DashboardPage = React.lazy(() => import('./pages/Dashboard'));

const handleShowChart = async () => {
  const { ChartComponent } = await import('./components/HeavyChart');
  // ...然后渲染这个组件
};
```