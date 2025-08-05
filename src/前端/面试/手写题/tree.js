

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
        const currentNode = myMap.get(item.id);

        if(item.parentId){
            const parentNode = myMap.get(item.parentId);

            if(parentNode){
                parentNode.children.push(item);
            }
        }else{
            tree.push(currentNode)
        }
    })

    return tree;
}

console.log(arrayToTree(flatArray))

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