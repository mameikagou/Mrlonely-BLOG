


// #### 大数相减 需要考虑长度问题 以及借位的问题


// ```js
const isGreaterOrEqual = ( num1,num2 ) => {
    if( num1.length > num2.length ) return true;
    if( num1.length < num2.length ) return false;
    return Number(num1) >= Number(num2)
}

const subtractStrings = ( num1, num2 )=>{

    let sign = '';
    let biggerNum, smallerNum;

    if(isGreaterOrEqual(num1, num2)){
        biggerNum = num1
        smallerNum = num2;
    }else{
        sign = '-';
        biggerNum = num2;
        smallerNum = num1;
    }

    let i = biggerNum.length;
    let j = smallerNum.length;

    let borrow = 0;
    let result = [];

    while(i>0){

        const d1 = Number(biggerNum[i-1]);
        const d2 = j > 0 ? Number(smallerNum[j-1]) : 0;

        // 减去之前的借位
        let diff = d1 - d2 - borrow;

        if(diff<0){
            diff+=10;
            borrow = 1;
        }else{
            borrow = 0;
        }

        result.push(diff);

        i--;
        j--;
    }

    result.reverse();

    while(result.length >0 && result[0]==='0'){
        result.shift();
    }

    return sign + result.join('');
}
// ```