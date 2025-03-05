const maxConnect = (list) => {
    let max_count = 0;
    let current = 0;
    const events = []

    for(const value of list){
        const [id, start, end] = value
        events.push([start,1])
        events.push([end,-1])
    }

    events.sort((a,b)=>{
        if(a[0]!==b[0]) return a[0]-b[0]
        return a[1] - b[1]
    })

    for(const value of events){
        const[a, b] = value
        current += b
        max_count = Math.max(current, max_count)
    }
    return max_count
}

function testMaxConnect() {
    const testCases = [
        { input: [[1, 1, 5], [2, 2, 6], [3, 3, 7]], expected: 3 },
        { input: [[1, 1, 2], [2, 3, 4], [3, 5, 6]], expected: 1 },
        { input: [[1, 1, 3], [2, 2, 5], [3, 4, 6]], expected: 2 },
        { input: [[1, 1, 10], [2, 1, 10], [3, 1, 10]], expected: 3 },
        { input: [[1, 1, 4], [2, 2, 3], [3, 3, 5], [4, 4, 6], [5, 5, 7]], expected: 3 },
    ];

    testCases.forEach(({ input, expected }, index) => {
        const result = maxConnect(input);
        console.assert(result === expected, `Test case ${index + 1} failed: expected ${expected}, got ${result}`);
    });

    console.log("All test cases passed!");
}

testMaxConnect();