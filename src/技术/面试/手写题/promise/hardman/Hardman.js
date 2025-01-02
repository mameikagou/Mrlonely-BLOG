

class Hardman {
    constructor(name){
        this.queue = []

        // 使用异步任务，待所有添加完毕后再加入
        setTimeout(async()=>{
            for(let item of this.queue){
                await item()
            }
        })

        // 使用箭头函数表示要直接执行
        this.queue.push(()=>new Promise(resolve=>{
            console.log(`I am ${name}`)
            resolve()
        }))
    }
    // 把learn和rest的内容抽象出来
    wait(time){
        return new Promise(resolve=>{
            console.log(`Begin to wait ${time}ms`)
            setTimeout(()=>{
                console.log(`After waiting ${time}ms`)
                resolve();
            },time)
        })
    }

    // 使用箭头函数表示要直接执行
    learn (task){
        this.queue.push(()=>new Promise(resolve=>{
                console.log(`I am learning ${task}`)
                resolve()
        }))
        return this
    }

    rest(time){
        this.queue.push(()=>this.wait(time))
        return this
    }

    restFirst(time){
        this.queue.unshift(()=>this.wait(time))
        return this
    }
}

const hardman = new Hardman("jack").restFirst(3000).learn("Chinese").learn("Englsih").rest(2000).learn("Japanese")