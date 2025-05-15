

#### Mutable可变状态mobx、Valtio

指的是创建对象之后，任何状态更新都是基于原先对象更新， 而不是创建新的对象。

##### 优点：

- 性能更好， 不需要创建新的对象
- 状态管理更直观， 不需要考虑状态的深拷贝，并且它一般都会基于Proxy实现， 在更新的时候触发对应re-render，往往性能是最优的。


##### 缺点：

- 使用Proxy实现，有时候比较黑盒，不好排查。

##### example：
这样写了之后，只有整体替换了role之后，才会更新；更改其中的小属性，不会。
```ts
role: types.optional(types.frozen<Partial<Response['role']>>(), {}),
```
还是会整体更新，保证事务的完整
```ts
self.role = {
    ...self.role,
    ...newRole
}
```

#### 更加精确的reactive
<https://reactive.formilyjs.org/zh-CN>