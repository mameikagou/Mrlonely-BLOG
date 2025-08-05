

```js
Function.prototype.myCall = (thisArgs, ...args)=>{
    thisArgs.tempFunc = this;
    thisArgs.tempFunc(...args);
    delete thisArgs.tempFunc;
}

```

但是这样会污染原型链，出现tempFunc的属性会出问题。

解法:
```js
Function.prototype.myCall = (thisArgs, ...args)=>{
    
    const fnkey = Symbol('fn');
    const context = thisArgs ? Object(thisArgs) : undefined;

    context[fnkey] = this;

    const result = context[fnkey](...args);

    delete context[fnkey]

    return result;
}
```