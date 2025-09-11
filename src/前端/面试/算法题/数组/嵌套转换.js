function reverseNestedArray(arr) {

    let flatArray = [];

    const flatten = (arr)=>{
        for(const item of arr){
            if(Array.isArray(item)){
                flatten(item);
            }else{
                flatArray.push(item);
            }
        }
    }

    flatten(arr);
    let index = 0;

    flatArray.reverse();
    
    const reconstruct = (currentArr) => {
        return currentArr.map((item)=>{
            if(Array.isArray(item)){
                return reconstruct(item);
            }else{
                return flatArray[index++];
            }
        })
    }

    return reconstruct(arr)
}

// 示例
const input = [1, [2, [3, [4, 5, 6]]]];
const output = reverseNestedArray(input);

console.log(JSON.stringify(output)); // 输出: [6,[5,[4,[3,2,1]]]]