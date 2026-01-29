


### Object

#### Object.create()

基于某个原型创建对象

常用于：
- 实现原型继承
- 创建纯净对象（没有原型链）
- 创建带有特定属性和方法的对象
- 实现单例模式
- 创建不可变对象


```ts
// 创建一个原型对象
const personProto = {
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

// 创建一个新对象，继承自 personProto
const person = Object.create(personProto);
person.name = 'John';
person.greet(); // 输出: Hello, I'm John


// 创建一个完全空的对象，没有原型链
const emptyObj = Object.create(null);

// 使用 new
function Person(name) {
  this.name = name;
}
const p1 = new Person('John');
// 使用 Object.create
const personProto = { name: '' };
const p2 = Object.create(personProto);
p2.name = 'John';
```