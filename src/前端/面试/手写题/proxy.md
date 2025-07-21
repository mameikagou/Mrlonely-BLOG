#### Proxy方法
实现对象代理，能检测对象属性变化以及保持属性类型不变

答案：https://juejin.cn/post/7449648346119651379

Proxy trap(handler)规范：只有get和set需要绑定receiver（this），区别在于，“是否需要上下文信息”，需要知道“谁在做这个”，也就是需要根据进行get和set的人的身份的不同，来进行不同的操作。

```js
class myProxy{
    constructor(target,handler){
        this.target = target;
        this.handler = handler;
    }

    get(key){
        if(this.handler.get){
            return this.handler.get(this.target,key,this)
        }
        return this.target[key]; // 在没有handler的时候提供默认兜底
    }

    set(key,value){
        if(this.handler.set){
            return this.handler.set(this.target,key,value,this)
        }
        return this.target[key] = value;
    }
}
const target = {
    message = ""
}
const handler = {
    get(key,receiver){ // receiver接收this来绑定上下文
        if(key in target){
            return target[key]
        }
        return undefined
    }
    
    set(key,value,receiver){
        if(key in target){
            target[key] = value
            return true
        }
        return false
    }
}
```