
var tree2 = {
	name: "page.js",
	require: [
		{
			name: "A.js",
			require: [
				{
					name: "B.js",
					require: [
						{
							name: "C.js",
						},
					],
				},
			],
		},
		{
			name: "D.js",
			require: [
				{
					name: "C.js",
				},
				{
					name: "E.js",
				},
			],
		},
	],
};

const resolve=(tree)=>{

	let visited = new Set();
	let res = [];

	const dfs = (node) => {
		if(node.require){
			for(let item of node.require){
				if(!visited.has(item.name)){
					dfs(item);
				}
			}
		}
		if(!visited.has(node.name)){
			visited.add(node.name);
			res.push(node.name);
		}
	}

	dfs(tree);

	return res;
}
console.log(resolve(tree2)) // ['C.js', 'E.js', 'D.js', 'B.js', 'A.js', 'page.js']
