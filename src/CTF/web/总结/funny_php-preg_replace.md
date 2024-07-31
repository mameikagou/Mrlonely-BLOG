# php

<https://www.nssctf.cn/problem/3083>

```php
<?php
    session_start();
    highlight_file(__FILE__);
    if(isset($_GET['num'])){
        if(strlen($_GET['num'])<=3&&$_GET['num']>999999999){
            echo ":D";
            $_SESSION['L1'] = 1;
        }else{
            echo ":C";
        }
    }
    if(isset($_GET['str'])){
        $str = preg_replace('/NSSCTF/',"",$_GET['str']);
        if($str === "NSSCTF"){
            echo "wow";
            $_SESSION['L2'] = 1;
        }else{
            echo $str;
        }
    }
    if(isset($_POST['md5_1'])&&isset($_POST['md5_2'])){
        if($_POST['md5_1']!==$_POST['md5_2']&&md5($_POST['md5_1'])==md5($_POST['md5_2'])){
            echo "Nice!";
            if(isset($_POST['md5_1'])&&isset($_POST['md5_2'])){
                if(is_string($_POST['md5_1'])&&is_string($_POST['md5_2'])){
                    echo "yoxi!";
                    $_SESSION['L3'] = 1;
                }else{
                    echo "X(";
                }
            }
        }else{
            echo "G";
            echo $_POST['md5_1']."\n".$_POST['md5_2'];
        }
    }
    if(isset($_SESSION['L1'])&&isset($_SESSION['L2'])&&isset($_SESSION['L3'])){
        include('flag.php');
        echo $flag;
    }

    
?>
```

```md
MD5值
md5("s1885207154a") => 0e509367213418206700842008763514
md5("s1836677006a") => 0e481036490867661113260034900752
```

二者都是0e开头，在php中0e会被当做科学计数法，就算后面有字母，其结果也是0，所以上面的if判断结果使true，成功绕过

```md
?num=1e9 科学计数法

?num[]=1 数组绕过
str=NSSNSSCTFCTF&md5_1=s1885207154a&md5_2=s1836677006a
md5_1=QNKCDZO&md5_2=240610708
```

session_start(); 是 PHP 中的一个函数调用，用于开始一个会话（session）。在 PHP 中，会话是一种机制，用于存储特定用户的变量或数据，以便在整个应用程序的不同页面之间共享这些数据。

## preg_replace

原文<https://blog.csdn.net/giaogiao123/article/details/121217533>

```php
mixed preg_replace ( mixed $pattern , mixed $replacement , mixed $subject [, int $limit = -1 [, int &$count ]] )
```

preg_replace 是 PHP 中的一个正则表达式替换函数，用于在字符串中搜索符合正则表达式的模式，并用新的字符串替换这些模式。
preg_replace (正则表达式, 替换成什么东西, 目标字符串, 最大替换次数【默认-1，无数次】, 替换次数)

会对双引号里面的东西进行替换 "${phpinfo()}"  单引号则不会 '${phpinfo()}'

### 出现漏洞的条件

```md
1./e修饰符必不可少
2.你必须让 subject 中有 pattern 的匹配。
3.可能跟php版本有关系
4.满足可变变量的条件：也就是双引号里面如果包含有变量，php解释器会将其替换为变量解释后的结果比如说 'strtolower("\1")'
```

特别说明： /e 修正符使 preg_replace() 将 replacement 参数当作 PHP 代码（在适当的逆向引用替换完之后）。

提示：要确保 replacement 构成一个合法的 PHP 代码字符串，否则 PHP 会在报告在包含 preg_replace() 的行中出现语法解析错误。

受用条件也只限于5.5到5.6的php版本

```php
var_dump(phpinfo()); // 结果：布尔 true
var_dump(strtolower(phpinfo()));// 结果：字符串 '1'
var_dump(preg_replace('/(.*)/ie','1','{${phpinfo()}}'));// 结果：字符串'11'
var_dump(preg_replace('/(.*)/ie','strtolower("\\1")','{${phpinfo()}}'));// 结果：空字符串''
var_dump(preg_replace('/(.*)/ie','strtolower("{${phpinfo()}}")','{${phpinfo()}}'));// 结果：空字符串''
```

```php
<?php
$data = $_GET['data']; 
preg_replace('/(.*)/e', '\\1', $data); 
?>
```

第一个/是正则表达式定界符, ()表示子表达式, .表示非换行符的任意字符, *表示匹配前面的

在上述示例中，preg_replace 函数会将 (.*) 匹配到的内容（即 ${phpinfo()}）作为 PHP 代码执行。这里利用了 PHP 的可变变量特性，${phpinfo()} 中的 phpinfo() 会先被执行，然后其返回的结果再被进一步处理。
需要注意的是，这种漏洞可能导致严重的安全问题; 

## 弱类型比较

与强类型比较符相对的是 弱类型比较运算符，弱类型比较运算符是指 PHP 在进行比较操作时，当操作数的数据类型不同时，PHP 将尝试将 依据一定的规则将操作数的数据类型进行统一。

```php
# 强类型比较运算符
var_dump('4949' == 4949);
//在 PHP8 版本中运行
//'4949Hello' == 4949
//得到的结果将为 false
var_dump('4949Hello' == 4949);

# 弱类型比较运算符
var_dump('4949' === 4949);
var_dump('4949Hello' === 4949);
bool(true)
bool(true)
bool(false)
bool(false)
```

## 待学习

一句话木马

<https://blog.csdn.net/giaogiao123/article/details/119513378?spm=1001.2014.3001.5501>