
// #### 并发请求，并发控制池
// <https://juejin.cn/post/7163522138698153997>

// ```md
// 实现一个并发请求函数concurrencyRequest(urls, maxNum)，要求如下：
// • 要求最大并发数 maxNum
// • 每当有一个请求返回，就留下一个空位，可以增加新的请求
// • 所有请求完成后，结果按照 urls 里面的顺序依次打出（发送请求的函数可以直接使用fetch即可）
// ```

const concurrencyRequest2 = (urls, maxNum) =>{
    let index = 0;
    let count = 0;

    return new Promise((resolve)=>{
        if(!urls.length){
            resolve([])
        }
        let result = [];

        const request = async ()=>{
            const i = index;
            const url = urls[index]
            index++;
            try{
                const res = fetch(url)

                result[i] = res;
            }catch(err){
                result[i] = err;
            }finally{
                count++;
                if(count === urls.length){
                    resolve(result)
                }
                request();
            }
        }

        const len = Math.min(maxNum,urls.length);

        for(let i=0;i<len;i++){
            request();
        }
    })
}



















const concurrencyRequest = (urls, maxNum) =>{
    let count = 0;
    let index = 0;
    return new Promise((resolve)=>{
        if(!urls.length){
            resolve([]);
            return;
        }
        let result = [];
        const request = async ()=>{
            if(index >= urls.length){
                return;
            }
            const i = index;
            const url = urls[index];
            index++;
            try{
                const res = await fetch(url);
                result[i] = res;
            }catch(err){
                result[i] = err;
            }finally{
                count++;
                if(count === urls.length){
                    resolve(result);
                }
                request();
            }
        }

        const times = Math.min(urls.length, maxNum);
        for(let i=0;i<times;i++){
            request();
        }
    })
}

const urls = [];
for (let i = 1; i <= 20; i++) {
    urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`);
}
concurrencyRequest(urls, 3).then(res => {
    console.log(res);
})
