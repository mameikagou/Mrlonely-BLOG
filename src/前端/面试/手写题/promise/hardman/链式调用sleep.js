

class Project {
    constructor(name){
        this.name = name
        this.queue = []
        this.games = []
    }

    sayHi(){
        console.log(`Hello, I am${this.name}`)
        return this
    }

    sleep(time){
        console.log(`${time}ms 之后`)
        this.queue.push(this.createPromise(time))
        return this
    }

    play(game) {
        this.games.push(`我在玩${game}`)
        return this;  // 返回 this 以支持链式调用
    }
    createPromise(time){
        return new Promise(resolve=>{
            setTimeout(()=>{
                console.log(this.games.shift())
                resolve()
            },time)
        })
    }
    start(){
        this.queue.reduce((prev, next)=>prev.then(()=>next())
        ,Promise().resolve())
    }
}

async function init() {
    const boy = new Project('Tom');
    await boy.sayHi()
             .sleep(1000)
             .play('王者')
             .sleep(2000)
             .play('跳一跳');
}

init();