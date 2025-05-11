```js
const nodes = {
    tag: "div",
    attrs: {
        id: "app",
    },
    children: [{
        tag: "h1",
        attrs: {
            className: "title",
        },
        children: [
            "俺是一个标题",
        ],
    }, {
        tag: "ul",
        children: [{
            tag: "li",
            children: ["苹果", "香蕉"],
        }, {
            tag: "li",
            children: ["土豆", "白菜"],
        }],
    }],
};

//   思路就是：处理当前节点，递归遍历子节点
const render = (node) => {
    if (typeof node === "string") {
        return document.createTextNode(node);
    }
    if (typeof node === "number") {
        return String(node);
    }

    const dom = documet.createElement(node.tag);
    if (node.attrs) {
        Object.keys(node.attrs).map((item) => {
            dom.setAttribute(item, node.attrs[item]);
        });
    }

    if (node.childen) {
        console.log("node.childen", node.childen);
        node.childen?.map((item) => {
            render(item);
        });
    }
    return dom;
};

render(nodes)
```
