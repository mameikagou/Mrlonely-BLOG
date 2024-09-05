
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