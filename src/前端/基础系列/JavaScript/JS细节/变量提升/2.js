var x = 1;
function outer() {
    console.log(x);  // undefined
    var x = 2;
    function inner() {
        console.log(x);  // 2
    }
    inner();
}
outer();