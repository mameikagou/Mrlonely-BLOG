
const toLowerCamelCase = (word) => {
    return word.replace(/(?<=\w)_(\w)/g,(match,char)=>char.toUpperCase());
}

// --- 测试用例 ---
console.log(toLowerCamelCase('hello_world'));         // "helloWorld"
console.log(toLowerCamelCase('get_user_by_id'));      // "getUserById"
console.log(toLowerCamelCase('alreadyCamelCase'));    // "alreadyCamelCase" (优雅地处理了无需转换的情况)
console.log(toLowerCamelCase('_start_with_dash'));    // "_startWithDash"