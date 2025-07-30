// 给定一个具有父子层级关系的数组，数组中每项都有字符串类型id和数组 children字段(如下定义)，
// 要求实现一个process方法，对其进行处理，
// 给每一项都增加parentId和path字段，
// 其中parentId表示其父元素id，path为一个数组，
// 包含了从根节点到当前节点的路径

const process=(arr)=>{
	let dfs = (arr, parentId, parentPath) =>{
		for(let item of arr){
			let currentPath = [...parentPath, item.id];
			item.parentId = parentId;
			item.path = parentPath
			if(item.children){
				dfs(item.children,item.id, currentPath);
			}
		}		
	}
	dfs(arr,null,[]);
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