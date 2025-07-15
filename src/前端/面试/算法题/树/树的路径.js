
const findPath = (treeData, targetName) =>{
    const treeMap = new Map();
    treeData.map(node=>{
        treeMap.set(node.id,node);
    })

    const targetNode = treeData?.find(item=>item.name === targetName);
    if (!targetNode) return [];
    let currentNode = targetNode;
    const path = [];

    while(currentNode){
        path.unshift(currentNode.name);
        if(currentNode.pid===null || currentNode.pid===0){
            break
        }
        currentNode = treeMap.get(currentNode.pid)
    }
    return path;
}


const treeData = [
  { id: 1, name: '根目录', pid: null },
  { id: 2, name: '文档', pid: 1 },
  { id: 3, name: '图片', pid: 1 },
  { id: 4, name: '工作文档', pid: 2 },
  { id: 5, name: '个人文档', pid: 2 },
  { id: 6, name: '风景照', pid: 3 },
  { id: 7, name: '项目报告.docx', pid: 4 },
  { id: 8, name: '会议记录.docx', pid: 4 },
  { id: 9, name: '日记.txt', pid: 5 },
  { id: 10, name: '山景.jpg', pid: 6 }
];


console.log(findPath(treeData,'会议记录.docx'))