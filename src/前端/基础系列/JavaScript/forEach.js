

// Array.prototype.forEach = function(array, callback){
//     for(let index=0;index<this.length;i++){
//         callback(array[index], index, array)
//     }
// }

const foo = (n) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(n);
    }, 1000);
  });
};

const test = async(nums) => {
  nums.map(async (n) => {
    let num = await foo(n);
    console.log(num);
  });
};

test([1, 2, 3]);