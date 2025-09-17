


### 数组转树和树转数组


#### 数组转树
对于数组，建立一个从id到子数组的set，然后建树的时候从set里面获取然后塞进children里面就行。

```js
const flatArray = [
  { id: 1, parentId: null, name: 'root1' },
  { id: 2, parentId: 1, name: 'child1' },
  { id: 3, parentId: 1, name: 'child2' },
  { id: 4, parentId: 2, name: 'grandchild1' },
  { id: 5, parentId: 3, name: 'grandchild2' },
];

const arrayToTree = (flatArray)=>{
    const myMap = new Map();

    flatArray.map(item=>{myMap.set(item.id,{...item, children:[]})});

    let tree = [];
    flatArray.map(item=>{
        if(item.parentId){
            const parent = myMap.get(item.parentId);

            if(parent){
                parent.children.push(item);
            }
        }else{
            tree.push(item)
        }
    })

    return tree;
}

console.log(arrayToTree(flatArray))
```

#### 树转数组 

dfs 遍历一下就行，顶多加一点回溯。

```js
const treeData = [
  {
    "id": 1,
    "parentId": null,
    "name": "root1",
    "children": [
      {
        "id": 2,
        "parentId": 1,
        "name": "child1",
        "children": [
          {
            "id": 4,
            "parentId": 2,
            "name": "grandchild1",
            "children": []
          }
        ]
      },
      {
        "id": 3,
        "parentId": 1,
        "name": "child2",
        "children": [
          {
            "id": 5,
            "parentId": 3,
            "name": "grandchild2",
            "children": []
          }
        ]
      }
    ]
  }
];

const treeToArray = (tree) => {

    const flatArray = [];
    const dfs = (nodes) => {
        if(!nodes||nodes.length===0){
            return;
        }

        for(const node of nodes){
        
            const {children, ...rest} = node;

            flatArray.push(rest);
            if(children){
                dfs(children);
            }
        }
    }

    dfs(tree);
    return flatArray;
}
console.log(treeToArray(treeData))
```


#### 树中找目标id: dfs + 回溯

```js
const data = {
  id: 1,
  children: [
    {
      id: 2,
      children: [
        { id: 4, children: [] }
      ],
    },
    {
      id: 3,
      children: null
    }
  ]
};

const findNode = (data, targetId) => {

    let ans = [];
    let path = [];
    const dfs = (tree,path)=>{
        const currentPath = path.concat(tree.id);
        if(tree.id === targetId){
            ans = currentPath;
            return;
        }
        if(tree.children){
            for(let item of tree.children){
                dfs(item, currentPath)
            }
        }
    }
    dfs(data,path);
    return ans;
}

console.log("findNode 4",findNode(data, 4));
console.log("findNode 5",findNode(data, 5));
console.log("findNode 3",findNode(data, 3));

// 如果非要用path.pop()来回溯，这样写：

const findNode2 = (data, targetId) => {

    let ans = [];
    let path = [];
    const dfs = (tree,path)=>{
        path.push(tree.id);
        if(tree.id === targetId){
            ans = path.slice();
            return;
        }
        if(tree.children){
            for(let item of tree.children){
                dfs(item, path)
            }
        }
        path.pop();
    }
    dfs(data,path);
    return ans;
}

console.log("findNode 4",findNode2(data, 4));
console.log("findNode 5",findNode2(data, 5));
console.log("findNode 3",findNode2(data, 3));
```


#### 树形结构取值

给定以下树形结构，实现一个函数，当输入节点 `id` 时，返回从根节点到该节点的路径 `id` 数组。

数据结构：

```javascript
const data = {
  id: 1,
  children: [
    {
      id: 2,
      children: [
        { id: 4, children: [] }
      ],
    },
    {
      id: 3,
      children: null
    }
  ]
};
```

#### 