

const sleep = (seconds) => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        }, seconds*1000)
    })
}


class Hardman{

    name
    tasks
    constructor(name = ''){

        this.name = name;
        this.tasks = [];

        this.tasks.push(()=>{
            console.log(`Hello, I am ${this.name}`);
        })

        setTimeout(()=>{
            this.run()
        },0)
    }

    async run(){
        for(const task of this.tasks){
            await task();
        }
    }
}