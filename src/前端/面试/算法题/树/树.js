// 给定一个具有父子层级关系的数组，数组中每项都有字符串类型id和数组 children字段(如下定义)，
// 要求实现一个process方法，对其进行处理，
// 给每一项都增加parentId和path字段，
// 其中parentId表示其父元素id，path为一个数组，
// 包含了从根节点到当前节点的路径

const process=(arr)=>{

	const dfs = (arr, parentId=null, path=[]) =>{
		for(let node of arr){
			const curpath = path.concat(node.id);
			if(parentId){
				node.parentId = parentId;
				node.path = curpath;
			}
			if(node.children){
				dfs(node.children, node.id, curpath);
			}
			
		}
	}
	dfs(arr);
	return arr;
}

let arr = [
	{
		id: "1",
		children: [
			{
				id: "1-1",
				children: [
					{
						id: "1-1-1",
					},
				],
			},
		],
	},
	{
		id: "2",
		children: [
			{
				id: "2-1",
				children: [
					{
						id: "2-1-1",
					},
				],
			},
		],
	},
];

console.log(JSON.stringify(process(arr), null, 2));


