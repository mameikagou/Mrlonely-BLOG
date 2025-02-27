
```js
const arr = [1, 2, 3, 4];
// bad
const first = arr[0];
const second = arr[1];
// good
const [first, second] = arr;
```

虽然但是，我还是喜欢第二种，更简洁；
```js
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
}
// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
}
// best
function getFullName({ firstName, lastName }) {
}
```

对象尽量静态化，不新增字段和值；
```js
// bad
const a = {};
a.x = 3;
// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 });
// good
const a = { x: null };
a.x = 3;
```