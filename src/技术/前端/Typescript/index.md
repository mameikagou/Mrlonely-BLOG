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

### 类型保护函数

```ts
// 判断是否是个location:[number,number]
export function isCoord(token: unknown): token is Coord {
  return (
    Array.isArray(token) &&
    token.length === 2 &&
    token.every((val) => typeof val === 'number')
  );
}
```

### 一些符号的使用

一个js的例子, 可以根据不同的类型执行不同的函数
```js
function eatFood(food){
  console.log("I eat",food);
}

const NameLookup = {
  ming: (food)=> eatFood(food),
  ning: (food)=> eatFood(food),
}

let name = "ming"
let food = "meat"
console.log(NameLookup[name](food));
```

来加上ts:

```ts
function eatFood(food:string){
  console.log("I eat",food);
}

type NameType = "ming" | "ning" 

const NameLookup:{
  [Key in NameType]:(food:string) => void
} = {
  ming: (food:string)=> eatFood(food),
  ning: (food:string)=> eatFood(food),
}

let name:NameType = "ming"
let food:string = "meat"
console.log(NameLookup[name](food));

```

### 泛型, 映射类型 keyof
关于

```ts
type EventPayloadMap<DragType>={
  onStart: string
  onEnd: string
}

type NameMap<NameType> = {
  [EventName in keyof EventPayloadMap<DragType>] : EventPayloadMap<DragType>[EventName]
}
```