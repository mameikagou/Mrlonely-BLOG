

#### setState方法

- 传入数值
- 传入函数
```js
// 初始状态
let state = 0;

// 场景1：传入数字
setState(5);
// nextState = 5 → 非对象 → 直接替换
// state变为5 → 触发更新

// 场景2：传入函数
setState(n => n + 1);
// nextState = (0 => 0+1) = 1 → 非对象 → 替换
// state变为1 → 触发更新
```

- 传入对象
```js
// 初始状态
let state = { count: 0, user: { name: 'Alice' } };

// 场景1：传入完整对象
setState({ count: 1, user: { name: 'Bob' } });
// nextState是对象 → Object.assign合并
// state变为 { count:1, user:{name:'Bob'} } → 触发更新

// 场景2：传入部分对象
setState({ count: 2 });
// 合并后 → { count:2, user:{name:'Alice'} }
// 浅合并保留原user → 触发更新

// 场景3：函数式更新
setState(prev => ({ ...prev, count: prev.count + 1 }));
// 生成新对象 → { count:1, user:{name:'Alice'} }
// 与原对象引用不同 → 触发更新
```



#### Object.is

- 用于比较两个值是否相等
- 与严格相等（===）类似，但处理了一些特殊情况
- 处理NaN、-0和+0

- 如果两个值都是 undefined，返回 true
- 如果两个值都是 null，返回 true
- 如果两个值都是 true 或都是 false，返回 true
- 如果两个值是相同长度的字符串且每个位置的字符都相同，返回 true
- 如果两个值指向同一个对象(引用相同)，返回 true
- 如果两个值都是数字并且:
  - 都是 +0，返回 true
  - 都是 -0，返回 true
  - 都是 NaN，返回 true
  - 都是非零且非 NaN 且数值相同，返回 true
  - 一个是 +0 一个是 -0，返回 false
  - 数值不同，返回 false




