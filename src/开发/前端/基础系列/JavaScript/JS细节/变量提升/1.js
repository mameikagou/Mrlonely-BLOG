// 

var a = 1; 
function b() { 
    a = 10; 
    return; 
    // function a() {} // 即使return之后，它依然会被提升。提升
} 
b(); 
console.log(a);   // 输出10，因为