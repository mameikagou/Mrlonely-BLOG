

#### 手撕：单括号匹配（O（1）空间复杂度），多括号匹配，多括号匹配并返回最近一个不匹配的index

##### 单括号
```js
const fun1 = (arr)=>{
    if(!arr) return false;
    const len = arr.length;
    let count = 0;
    for(let i=0;i<len;i++){
        if(arr[i] === '('){
            count++;
        }else if(arr[i] === ')'){
            count--;
        }

        if(count < 0) return false;
    }

    return count === 0 ? true : false;
}
```

#### 有效的括号 - 进阶版，带正则

```md
问题描述：
请你编写一个函数 isValidHtml(str)，该函数接收一个字符串 str 作为输入。这个字符串可能包含一些类似 HTML 的标签（例如 <h1>, </h1>, <div>, </div>）以及普通文本。
你需要判断字符串中所有的标签是否都正确配对并闭合。如果所有标签都有效，函数返回 true，否则返回 false。

校验规则：
一个开标签的形式为 <tagname>，一个闭标签的形式为 </tagname>。
tagname 仅由小写英文字母组成。
每一个开标签，都必须有一个同名的闭标签与之对应。
标签必须正确嵌套。例如，<a><b></b></a> 是正确的，但 <a><b></a></b> 是错误的。
字符串中的普通文本内容不影响校验结果，可以忽略。
本题不考虑自闭合标签（如 <br/>）和标签属性（如 <div class="main">）。
示例：
isValidHtml("<h1>这是一个标题</h1>")  // 返回 true
isValidHtml("<p>这是一个段落<div></div></p>") // 返回 true
isValidHtml("这是一个没有标签的字符串") // 返回 true
isValidHtml("<a><b></a></b>") // 返回 false (嵌套错误)
isValidHtml("<div>这是一个未闭合的标签") // 返回 false (缺少闭标签)
isValidHtml("这是一个多余的闭标签</h1>") // 返回 false (缺少开标签)
isValidHtml("<h1><h2></h1></h2>") // 返回 false (标签名不匹配)
```