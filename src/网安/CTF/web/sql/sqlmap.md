# sqlmap常见使用

-u url; 注意url要写出注入点, 比如/?id=1"

--dbs 数据库

## 常见使用流程

先找注入点, 然后列出库名, 再列出表名; 直接--dump就行; 

```bash
sqlmap -u "http://node5.anna.nssctf.cn:26770/?id=1" -D ctftraining --tables
```

```bash
sqlmap -u "http://node5.anna.nssctf.cn:26770/?id=1" -D ctftraining -T flag  --dump
```

-forms 选项
当使用 -forms 选项时，sqlmap 会自动提交表单（form）以查找潜在的 SQL 注入点。这对于那些通过 POST 请求或者表单参数传递数据的应用程序特别有用。

--crawl=2 选项
--crawl 选项用于爬取网站并递归地寻找其他可能存在 SQL 注入的页面。--crawl 后面的数字代表爬取的深度。

--crawl=1 表示只爬取与初始 URL 直接链接的页面。
--crawl=2 表示除了与初始 URL 直接链接的页面之外，还会爬取那些页面链接到的第二层页面。
因此，-forms --crawl=2 的组合意味着 sqlmap 将执行以下操作：

自动提交表单（使用 -forms）以查找潜在的 SQL 注入点。
爬取网站，并递归地访问直到第二层级的页面（使用 --crawl=2），以查找更多的潜在 SQL 注入点。

## 级别

--level 参数定义了扫描的深度，即sqlmap将尝试多少种不同的技术来发现和利用SQL注入漏洞。更高的级别通常会导致更全面的扫描，但也可能增加误报率和扫描所需的时间。

Level 1：仅执行最基本的测试。
Level 2：执行更多的测试，包括对布尔盲注的支持。
Level 3：执行更深入的测试，包括时间延迟盲注。
Level 4：执行非常深入的测试，可能需要更多的时间。
Level 5：执行最深入的测试，包括一些不常用的或非常慢的技术。
--risk
--risk 参数定义了扫描过程中愿意承担的风险级别。较高的风险级别可能导致服务器负载增加，或者可能导致网站暂时不可用（例如，由于使用了时间延迟技术）。

Risk 1：只使用那些不太可能导致服务器负载增加的测试。
Risk 2：使用可能稍微增加服务器负载的测试。
Risk 3：使用可能导致服务器负载显著增加的测试。
Risk 4：使用可能导致服务器负载极大增加的测试，甚至可能导致网站暂时不可用。

sqlmap 包含了许多内置的--tamper脚本，例如：

addamp：
将有效载荷中的&字符替换为&amp;。
bluecoat：
用于绕过Blue Coat WebFilter。
chardoubleencode：
对有效载荷进行双重URL编码。
comment：
在有效载荷的末尾添加SQL注释。
nullbyte：
在有效载荷中插入空字节。
randomcase：
随机改变有效载荷中的字母大小写。
space2comment：
将有效载荷中的空格转换为SQL注释。
timebased：
用于时间延迟盲注技术。

## 别的命令

-flush-session 清楚缓存, 重新测试


