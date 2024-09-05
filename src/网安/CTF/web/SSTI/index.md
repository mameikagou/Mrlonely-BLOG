# SSTI注入

## 文章

<https://www.freebuf.com/articles/web/331653.html>
<https://www.cnblogs.com/bmjoker/p/13508538.html>

SSTI（Server-Side Template Injection）是一种服务器端模板注入漏洞，它出现在使用模板引擎的Web应用程序中。模板引擎是一种将动态数据与静态模板结合生成最终输出的工具。然而，如果在构建模板时未正确处理用户输入，就可能导致SSTI漏洞的产生。

 Java 的 Thymeleaf，Python 的 Flask , php的smarty