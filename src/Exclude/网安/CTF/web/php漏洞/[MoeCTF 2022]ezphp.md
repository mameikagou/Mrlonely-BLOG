# php源码如下

<https://www.nssctf.cn/problem/3348>

```php
<?php

highlight_file('source.txt');
echo "<br><br>";

$flag = 'xxxxxxxx';
$giveme = 'can can need flag!';
$getout = 'No! flag.Try again. Come on!';
if(!isset($_GET['flag']) && !isset($_POST['flag'])){
    exit($giveme);
}

if($_POST['flag'] === 'flag' || $_GET['flag'] === 'flag'){
    exit($getout);
}

foreach ($_POST as $key => $value) {
    $$key = $value;
}
// 这里将$value的值, 作为变量名, 赋值给$key的值所指向的变量; 所以直接构造/?b=flag$flag=b
// 第一次
// $value = flag $key = b
// $$value = $flag $$key = $b
// $b = $flag

// 第二次
// $key = flag $value = b
// $$key = $flag $$value = $b
// $flag = $b
foreach ($_GET as $key => $value) {
    $$key = $$value;
}

echo 'the flag is : ' . $flag;

?>
```

<!-- 变量覆盖, 构造playload /? -->