# vim信息泄露

啥都没有, dirsearch 扫描;

扫出了 .index.php.swp

vim信息泄露的文件;

直接url访问就能下载到;

vim编辑的index.php文件，在编辑状态强制退出终端，会在同目录下产生一个.index.php.swp文件，我们可以使用vim -r .index.php.swp恢复文件

访问：.index.php.swp，下载下来

恢复文件：vim -r .index.php.swp或者vi -r .index.php.swp

 error_reporting(0);
            $password = "Give_Me_Your_Flag";
            echo "<p>can can need Vim </p>";
            if ($_POST['password'] === base64_encode($password)) {
                echo "<p>Oh You got my password!</p>";
                eval(system($_POST['cmd']));
            }
            ?>

然后根据这个构造请求即可: NSSCTF{17c1f8e8-1a56-4731-bf2d-238c8af70799}
