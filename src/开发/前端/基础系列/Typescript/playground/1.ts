// 1, 递归推断

type ttt = Promise<Promise<Promise<Record<string, any>>>>
// 递归复用做循环。
// 如果T是一个Promise，它会递归地对提取出的U应用DeepPromiseValueType。
// 这里的infer是做类型推断，extends是使用条件语句。
type DeepPromiseValue<T> = T extends Promise<infer U> ? DeepPromiseValue<U> : T;

type res = DeepPromiseValue<ttt>;





// 2, Readonly实现

// keyof T 是一个索引类型查询操作符，它会产生 T 类型的所有公共属性名的联合类型
// 比如：{a: 1, b: 2} 的 keyof 结果是 a | b
// P in 是映射类型的语法，表示对联合类型中的每个成员进行遍历。类似于 JavaScript 中的 for...in 循环
// 所以 P 会依次取 a 和 b，然后 T[P] 取各自对应的值，所以结果是 {readonly a: 1, readonly b: 2}
// [P in keyof T]: T[P] 表示为 T 的每个属性 P 创建一个新属性，并保持原属性的类型 T[P]。
type Readonly2<T> = {
    readonly [P in keyof T] : T[P];
}

type res2 = Readonly2<{a: 1, b: 2}>;



type DeepReadonly<T> = {
    readonly [P in keyof T] : T[P] extends object ? DeepReadonly<T[P]> : T[P];
}

const v = {
    k1: 1,
    k2: {
        k21: 2,
        k22: 3
    }
} as const;