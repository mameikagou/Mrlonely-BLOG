

<https://segmentfault.com/a/1190000021818059>

### URL解析

let url = "http://www.xxx.com?a=1&b=2&c=3"
// 也就是获取到: {a: 1, b: 2, c: 3}

```js
let url = "http://www.xxx.com?a=1&b=2&c=3"

let res = url.split('?')[1].split('&').reduce((prev, curr)=>{
    const [key, value] = curr.split('=');
    prev[key] = value;
    return prev;
},{});
console.log('res',res)
```

let url = "http://www.xxx.com?a&b&c"

```js
let url = "http://www.xxx.com?a&b&c"
let res = url.split('?')[1].split('&').reduce((prev, curr)=>{
    const [key, value] = curr.split('=');
    if(!value) return prev;
    prev[key] = value;
    return prev;
},{});
console.log('res',res)
```

### 对象的处理
let url = "http://www.xxx.com?a[name]=tiger&a[age]=25&b[name]=cat&c=666"

```js
let url = "http://www.xxx.com?a[name]=tiger&a[age]=25&b[name]=cat&c=666"

let res = url.split('?')[1].split('&').reduce((prev, curr)=>{
    const [key, value] = curr.split('=');
    if(!value) return prev;
    let path = key.
    prev[key] = value;
    return prev;
},{});

```