#

这里其实直接向别的服务器进行获取数据, 并且没有任何过滤;

那你也能向它的内网直接拿东西, 所以构造playload:

```bash
file:///fl4g
```

一凡引导之后来到了:

```php
<?php

highlight_file(__FILE__);
error_reporting(0);

$file = $_GET["file"];
if (stristr($file, "file")){
 die ("你败了.");
}

//flag in /flag
echo file_get_contents($file);
```

## 代码解释

在 PHP 中，stristr 函数用于执行不区分大小写的字符串查找。它返回字符串首次出现的位置，如果未找到则返回 false。

die 函数：
die 函数用于终止脚本的执行，并输出指定的消息作为最后一个输出。如果脚本中没有其他代码要执行，这通常用于提前结束脚本。

file_get_contents 是 PHP 中的一个内置函数，用于读取整个文件到一个字符串中。这是一个非常方便的函数，可以用来加载文件的内容到内存中以便进行处理。

## 解决

他这里其实只是禁用了参数里面带fild的写法, 你可以不带;

相当于只是禁用了file协议, 也就是根目录下file:///flag的写法

所以直接在出现该代码的该目录下 ?file=/flag即可

## 待学习

filter伪协议

```zsh
http://node2.anna.nssctf.cn:28560/ha1x1ux1u.php?file=php://filter/read=convert.base64-encode/resource=/flag
```
