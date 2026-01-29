```js
const PromiseRace = (arr) => {
    const tasks = Array.from(arr);
    return new Promise((resolve, reject) => {
        for (const task of tasks) {
            Promise.resolve(task).then((item) => {
                resolve(item);
            }).catch((e) => {
                reject(e);
            });
        }
    });
};

const PromiseRace = (arr) => {
	const tasks = Array.from(arr);
	return new Promise((resolve, reject) =>{
		for(const task of tasks) {
			Promise.resolve(task).then((item)=>{
				resolve(item);
			}).catch((e)=>{
				reject(e);
			})
		}
	})
}
```

```js
const PromiseAllSettled = (arr) => {
	const tasks = Array.from(arr);
	const len = arr.length;

	return new Promise((resolve) => {
		let count = 0;
		const result = [];
		if (len === 0) {
			resolve([]);
		}
		for (let i = 0; i < len; i++) {
			Promise.resolve(tasks[i])
				.then(
					(value) => {
						result[i] = { status: "fulfilled", value: value };
					},
					(reason) => {
						result[i] = { status: "rejected", reason: reason };
					},
				)
				.finally(() => {
					count++;
					if (count === len) {
						resolve(result);
					}
				});
		}
	});
};
```
