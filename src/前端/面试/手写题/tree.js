

const flatArray = [
  { id: 1, parentId: null, name: 'root1' },
  { id: 2, parentId: 1, name: 'child1' },
  { id: 3, parentId: 1, name: 'child2' },
  { id: 4, parentId: 2, name: 'grandchild1' },
  { id: 5, parentId: 3, name: 'grandchild2' },
];

const arrayToTree = (flatArray)=>{
  const myMap = new Map();

  flatArray.map(item=>{
    myMap.set(item.id, {...item, children: []});
  })

  let tree = [];

  flatArray.map(item => {
    const curNode = myMap.get(item.id);

    if(item.parentId){
      const parentNode = myMap.get(item.parentId);

      if(parentNode){
        parentNode.children.push(curNode);
      }
    }else{
      tree.push(curNode);
    }
  })

  return tree;
}



console.log("arrayToTree",arrayToTree(flatArray))

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

const treeToArray = (treeData) => {

  let flatArray = [];

  const dfs = (tree) => {
    if(!tree) return;

    for(let node of tree){
      const {children, ...rest} = node;
      flatArray.push(rest);
      if(children){
        dfs(children)
      }
    }
  }

  dfs(treeData);

  return flatArray;
}
console.log('treeToArray',treeToArray(treeData))




// 树形取值

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

const findPath = (data, target) => {
  
  let result = [];
  const dfs = (nodes,path) => {
    if(result.length>0 || !nodes) return;
    const curPath = path.concat(nodes.id);

    if(nodes.id === target){
      result = curPath;
    }
    if(nodes.children){
      for(let node of nodes.children){
        dfs(node, curPath);
      }
    }
  }

  dfs(data, []);

  return result;
}

console.log('findPath',findPath(data, 4))
console.log('findPath',findPath(data, 3))
console.log('findPath',findPath(data, 2))
console.log('findPath',findPath(data, 5))