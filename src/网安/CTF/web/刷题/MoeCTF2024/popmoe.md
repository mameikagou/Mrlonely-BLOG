# php代码审计, 反序列化

```php
class class000 {
    private $payl0ad = 0;
    protected $what;

    public function __destruct()
    {
        $this->check();
    }

    public function check()
    {
        if($this->payl0ad === 0)
        {
            die('FAILED TO ATTACK');
        }
        $a = $this->what;
        $a();
    }
}
// 如果payload不为0, 执行$what

class class001 {
    public $payl0ad;
    public $a;
    public function __invoke()
    {
        $this->a->payload = $this->payl0ad;
    }
}
// $x = new class001()
// $x()

class class002 {
    private $sec;
    public function __set($a, $b)
    {
        $this->$b($this->sec);
    }

    public function dangerous($whaattt)
    {
        $whaattt->evvval($this->sec);
    }

}
// 

// $whaattt = new class003();
// $instance2 = new class002();
// $instance2->dangerous($whaattt)

// 比如$instance2->unknown = func22
// 那么 就有执行func22($sec)

// 所以可以设置$sec为任意值

class class003 {
    public $mystr;
    public function evvval($str)
    {
        eval($str);
    }

    public function __tostring()
    {
        return $this->mystr;
    }
}
// evvval()执行文件
// $str11 = new class003();
// $str11->evvval("ls /")
```

__invoke() 方法在将对象当作函数来调用时被触发。

__set($a, $b) 魔术方法用于处理对私有属性的赋值操作。
当尝试为不可访问（私有或不存在）的属性进行赋值时，__set 方法会被自动调用。
第一个值是属性名, 第二个是值; 别管内容, 触发的时候已经创建了; 
