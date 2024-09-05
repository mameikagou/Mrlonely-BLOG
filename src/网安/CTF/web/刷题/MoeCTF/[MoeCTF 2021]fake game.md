# 原型链污染

[深入理解原型链污染](https://www.leavesongs.com/PENETRATION/javascript-prototype-pollution-attack.html?page=1)

就是属性为0的时候没找到, 就会去原型上找; 

```json
{"attributes":{"health":0,"attack":0,"armor":0,"__proto__":{"health":20000000,"attack":20000000,"armor":2000000}}}
```

绷不住了, 涉及对象合并的操作就有原型链污染;

```js
function merge(target, source) {
    for (let key in source) {
        if (key in source && key in target) {
            merge(target[key], source[key])
        } else {
            target[key] = source[key]
        }
    }
}
```

污染失败:

```js
let o2 = {a: 1, "__proto__": {b: 2}}
merge(o1, o2)
```

污染成功:

```js
let o2 = JSON.parse('{"a": 1, "__proto__": {"b": 2}}')
merge(o1, o2)
```

主要区别在于, merge的时候, __proto__是否被识别为一个key