
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

    let visited = new Set()
	let result = []

	let dfs = (node) => {
		if(node.require){
			for(const dep of node.require){
				if(!visited.has(dep.name)){
					dfs(dep)
				}
			}
		}
		if(!visited.has(node.name)){
			visited.add(node.name)
			result.push(node.name)
		}
	}

	dfs(tree)

	return result
}
console.log(resolve(tree2)) // ['C.js', 'E.js', 'D.js', 'B.js', 'A.js', 'page.js']
