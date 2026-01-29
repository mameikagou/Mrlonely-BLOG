
class Hardman {
    queue = [];
    name = ""
    constructor(name){
        this.name = name;
        this.queue = [`Hi,I am ${this.name}`];

        setTimeout(()=>this.run(),0);
    }

    study(project){
        this.queue.push(`I study ${project}`)
        return this;
    }

    rest(time){
        this.queue.push(time,`Wait ${time} seconds.`)
        return this;
    }

    restFirst(time){
        this.queue.unshift(time,`Wait ${time} seconds.`)
        return this;
    }

    async run(){
        for(let item of this.queue){
            if(typeof item === 'string'){
                console.log(item);
            }else{
                await new Promise((res)=>setTimeout(res,item*1000))
            }
        }
    }
}

function hardMan(name) {
    return new Hardman(name);
}

// hardMan('潘潘')
//> Hi! I am 潘潘.


// hardMan('潘潘').study('Project')
//> Hi! I am 潘潘.
//> I am studying 敲码.


hardMan('潘潘').rest(3).study('敲码')
//> Hi! I am 潘潘.
// 此时等待三秒钟
//> Wait 3 seconds.
//> I am studying 敲码.


// hardMan('潘潘').restFirst(3).study('敲码')
// 此时等待三秒钟
//> Wait 3 seconds.
//> Hi! I am 潘潘.
//> I am studying 敲码.
