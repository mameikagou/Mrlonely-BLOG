
#### TS手撕题 typescript
获取对象类型中指定 类型的值 对应的键 (KeysMatchingValue)

- Extends用途
    - 用途一：类的继承 (Inheritance)
    - 用途二：泛型约束和条件判断 (Constraint & Conditional)
        - 是不是...这种类型
        - 能否装进...这个盒子

- Keyof：
    - 获得一个对象类型的所有键（key），并返回一个由这些键组成的字符串字面量的联合类型(String Literal Union Type) 


```js
/**
 * T: 原始对象类型
 * V: 要匹配的值的类型
 * * 这个高级类型会返回 T 中所有值为 V 类型的键的联合类型。
 */
type KeysMatchingValue<T, V> = {
  // 1. 遍历 T 的所有键 K
  [K in keyof T]: 
    // 2. 判断 T[K] 的类型是否可以赋值给 V
    T[K] extends V 
      ? K   // 3. 如果是，则键的类型保持为 K
      : never // 4. 如果不是，则键的类型变为 never
// 5. 取出所有非 never 的键，组成联合类型
}[keyof T];


// --- 使用示例 ---

// 定义一个对象类型
type ExampleObject = {
  name: string;
  age: number;
  email: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// 获取所有值为 string 类型的键
// 结果：type StringKeys = "name" | "email"
type StringKeys = KeysMatchingValue<ExampleObject, string>;

// 获取所有值为 number 类型的键
// 结果：type NumberKeys = "age"
type NumberKeys = KeysMatchingValue<ExampleObject, number>;

// 获取所有值为 Date 对象的键
// 结果：type DateKeys = "createdAt" | "updatedAt"
type DateKeys = KeysMatchingValue<ExampleObject, Date>;

const nameKey: StringKeys = 'name'; // OK
const emailKey: StringKeys = 'email'; // OK
// const ageKey: StringKeys = 'age'; // Error: Type '"age"' is not assignable to type 'StringKeys'.
```