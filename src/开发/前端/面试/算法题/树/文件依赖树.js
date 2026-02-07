
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

	// 说白了就是后续遍历从后往前

	let res = [];
	let set = new Set();

	const dfs = (node) => {
		if(set.has(node.name)) return;

		if(node.require){
			for(let item of node.require){
				dfs(item);
			}
		}

		set.add(node.name);
		res.push(node.name);
	}
	dfs(tree);
	return res;
}
console.log(resolve(tree2)) // ['C.js', 'E.js', 'D.js', 'B.js', 'A.js', 'page.js']
