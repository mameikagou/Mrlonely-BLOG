// 测试样例1：标准同花顺
const test1:card[] = [
    { huase: 'A', value: 1 },  // A
    { huase: 'A', value: 2 },  // 2
    { huase: 'A', value: 3 },  // 3
    { huase: 'A', value: 4 },  // 4
    { huase: 'A', value: 5 },  // 5
    { huase: 'B', value: 6 },  // 额外牌
    { huase: 'C', value: 7 },  // 额外牌
    { huase: 'D', value: 8 }   // 额外牌
];

// 测试样例2：A作为大牌的同花顺
const test2:card[] = [
    { huase: 'A', value: 10 }, // 10
    { huase: 'A', value: 11 }, // J
    { huase: 'A', value: 12 }, // Q
    { huase: 'A', value: 13 }, // K
    { huase: 'A', value: 1 },  // A
    { huase: 'B', value: 2 },  // 额外牌
    { huase: 'C', value: 3 },  // 额外牌
    { huase: 'D', value: 4 }   // 额外牌
];

// 测试样例3：不是同花顺（花色不同）
const test3:card[] = [
    { huase: 'A', value: 1 },
    { huase: 'B', value: 2 },
    { huase: 'C', value: 3 },
    { huase: 'D', value: 4 },
    { huase: 'A', value: 5 },
    { huase: 'B', value: 6 },
    { huase: 'C', value: 7 },
    { huase: 'D', value: 8 }
];

// 测试样例4：不是同花顺（数字不连续）
const test4:card[] = [
    { huase: 'A', value: 1 },
    { huase: 'A', value: 3 },
    { huase: 'A', value: 5 },
    { huase: 'A', value: 7 },
    { huase: 'A', value: 9 },
    { huase: 'B', value: 2 },
    { huase: 'C', value: 4 },
    { huase: 'D', value: 6 }
];

// 测试样例5：特殊情况 - 多个可能的同花顺
const test5:card[] = [
    { huase: 'A', value: 1 },  // 可以组成 A-5 的同花顺
    { huase: 'A', value: 2 },
    { huase: 'A', value: 3 },
    { huase: 'A', value: 4 },
    { huase: 'A', value: 5 },
    { huase: 'A', value: 10 }, // 也可以组成 10-A 的同花顺
    { huase: 'A', value: 11 },
    { huase: 'A', value: 12 }
];

// 测试样例6：边界情况 - 最小同花顺
const test6:card[] = [
    { huase: 'A', value: 1 },
    { huase: 'A', value: 2 },
    { huase: 'A', value: 3 },
    { huase: 'A', value: 4 },
    { huase: 'A', value: 5 },
    { huase: 'B', value: 1 },
    { huase: 'C', value: 1 },
    { huase: 'D', value: 1 }
];

// 测试样例7：边界情况 - 最大同花顺
const test7:card[] = [
    { huase: 'A', value: 10 },
    { huase: 'A', value: 11 },
    { huase: 'A', value: 12 },
    { huase: 'A', value: 13 },
    { huase: 'A', value: 1 },
    { huase: 'B', value: 13 },
    { huase: 'C', value: 13 },
    { huase: 'D', value: 13 }
];

interface card{
    huase:'A'|'B'|'C'|'D'
    value:number
}

const isShunzi = (arr:card[]) =>{
    const mapp = {
        'A':0,
        'B':0,
        'C':0,
        'D':0
    }
    for(const key in mapp) {
        mapp[key] = 0;
    }
    arr.sort((a,b)=>{
        return b.value - a.value
    })
    const set = new Set()
    const arr2:any[] = arr.map(item=>{
        if(!set.has(item.value)){
            set.add(item.value)
            return item
        }else{
            mapp[item.huase]++
            return null
        }
    }).filter(Boolean)

    if (arr2.length < 5) return false
    for(const key in mapp){
        if (mapp[key] >= 5){
            continue
        } else {
            return false
        }
    }
    const len = arr2.length

    for(let index=0;index<len-4;index++){
        let flag = arr2[index].huase

        if(arr2[index].value === 1){
            for(let idx = 1; idx <= 4; idx++) {
                if(arr2[len-idx].huase !== flag) {
                    return false  // 直接返回 false
                }
            }
        }

        if(arr2[index].value + 4 !== arr2[index+4].value) {
            return false
        }

        for(let idx = 1; idx <= 4; idx++) {
            if(arr2[index+idx].huase !== flag) {
                return false  // 直接返回 false
            }
        }
    }
    return true;
}



console.log(isShunzi(test1))