const sleep = (seconds = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    })
};

const CodingMan = (man = '') => {
    const tasks = [];
    tasks.push(() => {
        console.log(`hello, ${man}`);
    });

    setTimeout(async () => {
        for (const task of tasks) {
            await task();
        }
    });
    const obj = {
        sleep: seconds => {
            tasks.push(async () => {
                await sleep(seconds);
                console.log(`wake up after ${seconds}s`);
            })
            return obj;
        },
        eat: meal => {
            tasks.push(() => {
                console.log(`eat ${meal}~`);
            });
            return obj;
        },
        sleepHead: seconds => {
            tasks.unshift(async () => {
                await sleep(seconds);
                console.log(`wake up after ${seconds}s`);
            });
            return obj;
        }
    }
    return obj;
}


// class版本的：



class CodingMan2 {
    // 一样的，tasks，关注点分离写法
    // 把return new Promise放在了sleep里面
    name
    tasks
    constructor(name = ''){
        this.name = name;
        this.tasks = [];

        this.tasks.push(()=>{
            console.log(`Hello, I am ${this.name}`);
        })

        setTimeout(()=>{
            this.run();
        },0)
    }

    async run(){
        for(const task of this.tasks){
            await task();
        }
    }

    eat(meal){
        this.tasks.push(()=>{
            console.log(`Eat ${meal}`);
        })
        return this;
    }

    sleep(seconds){
        this.tasks.push(async()=>{
            await sleep();
            console.log(`Sleep ${seconds}`);
        })
        return this;
    }

    sleepHead(seconds){
        this.tasks.unshift(async()=>{
            await sleep();
            console.log(`Sleep ${seconds}`);
        })
        return this;
    }

}