

### Set, Map, 数组

对于数组来说，values()方法返回一个迭代器，该迭代器返回数组中的每个元素。

```js
const fruits = ['apple', 'banana', 'orange'];

// 获取数组值的迭代器
const fruitIterator = fruits.values();

// 使用next()手动迭代
console.log(fruitIterator.next().value); // 'apple'
console.log(fruitIterator.next().value); // 'banana'

// 转换为数组
const newArray = Array.from(fruits.values());
console.log(newArray); // ['apple', 'banana', 'orange']

// 直接迭代
for (const fruit of fruits.values()) {
  console.log(fruit);
}
// apple, banana, orange
```

```js
const mySet = new Set(['a', 'b', 'c']);

// 获取迭代器
const iterator = mySet.keys();

// 使用next()获取第一个元素
const firstResult = iterator.next();
console.log(firstResult);
// 输出: { value: 'a', done: false }

// 提取实际值
const firstElement = firstResult.value;
console.log(firstElement);
// 输出: 'a'
```

next()返回的对象结构:
```js
{
  value: 元素的值,
  done: 布尔值，表示迭代是否完成
}
```
