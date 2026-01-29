

const func1 = (intervals:Array<number[]>) => {
    const len = intervals.length;

    intervals.sort((a,b)=>a[0]-b[0])
    let last = intervals[0]
    for(let i=1;i<len;i++) {
        let current = intervals[i]

        if(current[0]<=last[1]){
            return false;
        }

        last = intervals[i]
    }
    return true;
}

console.log(func1([[0,30], [5,10], [15,20]]))
console.log(func1([[7,10], [2,4]]))