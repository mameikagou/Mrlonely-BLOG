# ts


### 函数中的类型: 

重载写法: 

```ts
function func(foo: number, bar: true): string;
function func(foo: number, bar?: false): number;
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

const res1 = func(599); // number
const res2 = func(599, true); // string
const res3 = func(599, false); // number

```

### [模块].d.ts

阮一峰: <https://wangdoc.com/typescript/d.ts>
