# php源代码

```php
<!-- 题目给的index.php -->
<?php

namespace app\controller;

use app\BaseController;
use think\facade\Db;

class Index extends BaseController
{
    protected $middleware = ['think\middleware\AllowCrossDomain', 'think\middleware\CheckRequestCache', 'think\middleware\LoadLangPack', 'think\middleware\SessionInit'];
    public function index($isCache = false, $cacheTime = 3600)
    {

        if ($isCache == true) {
            // $config 通常是一个变量或数组，用于存储配置信息
            // __DIR__ 表示当前文件所在目录
            // 如果文件不存在或无法读取，require 会导致一个致命错误
            // 点号 . 是 PHP 中的字符串连接运算符，用于将两个字符串连接在一起
            $config = require __DIR__ . '/../../config/route.php';
            $config['request_cache_key'] = $isCache;
            // intval 是 PHP 中的一个内置函数，用于将变量转换为整数。它尝试将给定的值转换为整数类型。如果转换成功，intval 函数将返回整数值；如果失败，则返回 0。
            $config['request_cache_expire'] = intval($cacheTime);
            $config['request_cache_except'] = [];
            // file_put_contents(string $filename, mixed $data[, flags = 0[, context = null[, lock_type = 0]]]): int|false
            // 将字符串写入文件或更新文件内容
            // string var_export(mixed $expression, bool $return = false)
            // $expression：要导出的表达式或变量。
            // $return：可选参数，如果设置为 true，var_export 将返回一个字符串而不是输出它。
            file_put_contents(__DIR__ . '/../../config/route.php', '<?php return ' . var_export($config, true) . ';');
            return 'cache is enabled';
        } else {
            return 'Welcome ,cache is disabled';
        }
    }
}
```