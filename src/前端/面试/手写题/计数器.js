

// 手撕：实现一个构造函数，对象中包含构造函数调用的次数（使用闭包）。
// 进阶：1. 私有属性（get函数）
// 2. 非new调用报错 
// 3.不用闭包如何实现，是否了解类的静态变量

// 就是从闭包过渡到class呗
// 普通实现

const UserCopy = (function(){
    let count = 0;
    
    function UserConstructor (name) {

        if(!new.target){
            throw new Error('you should use new')
        }
        count++;
        this.name = name;
        // biome-ignore lint/complexity/useArrowFunction: <This function is a constructor and needs its own 'this' context and 'new.target'.>
        this.getCount = function(){
            // return count;
        }
    }

    return UserConstructor;
})()

const user3 = new UserCopy('hong', 20);
const user4 = new UserCopy('hong', 20);
console.log(UserCopy.count);
console.log(user4.getCount());

// 使用class
class User {
    static #count = 0;
    constructor(name, age){
        User.#count++;
        this.name = name;
        this.age = age;
    }

    getCount(){
        return User.#count;
    }
}

const user1 = new User('hong', 20);
const user2 = new User('hong', 20);

// console.log(User.#count); // 不可以
console.log(user2.getCount());