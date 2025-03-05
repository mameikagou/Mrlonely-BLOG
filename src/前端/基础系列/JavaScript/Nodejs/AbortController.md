
用来取消异步操作的api

```ts ESM
const ac = new AbortController();
const {signal} = ac;

readFile('example.txt',{signal},(err,data)=>{

})

ac.abort();
```

