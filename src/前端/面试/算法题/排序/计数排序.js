

const main = () => {
    const arr = [3, 2, 1, 4, 5, 6, 7, 8, 9, 10];
    const result = countingSort(arr);
    console.log(result);
}

const countingSort = (arr) => {

    const cnt = [];
    const b = [];
    arr.map((item)=>{
        cnt[item] = cnt[item] || 0;
        cnt[item]++;
    })

    let tot = 0;
    for(let i=0;i<10000;i++){ // 10^5
        for(let j=0;j<cnt[i];j++){
            b[++tot] = i;
        }
    }
    console.log(b);
    return b;
}

main();