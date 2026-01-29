
### webview

<https://mp.weixin.qq.com/s?__biz=MzI3OTE3ODk4MQ==&mid=2247487727&idx=1&sn=3e19ba5866173117d2bacb997e5789f5&chksm=eb4aeb65dc3d6273a3c4508cd2c46b9dae1e1a664ce58091d44c403d99b742841cfe00ad25d3&cur_album_id=2126792242496405506&scene=189#wechat_redirect>

#### 概念
- 原生：安卓或者ios的原生开发，发布需要打包整个app，效率较低但是性能更好；
- webH5：跨平台开发，性能较差，但是开发方便，兼容性好；

#### 核心机制：
- 解析 html，css，js
- 隔离的JS Runtime，可以与移动端原生进行通信
- 沙盒，限制调用原生api，比如文件网络等等
- 适配多个平台，比如安卓、ios等等

#### 通信机制

- JSBridge（核心机制）
    - 双向通信：调用原生功能、进行数据传递、触发回调函数
- webSockets
    - 需要频繁更新的通道
    - 建立长通信机制

#### JSBridge 实现原理

##### Native -> JS
解释性语言，拼接代码直接调用；

##### JS -> Native
- URL Schema
Native可以直接通过解析url来获取数据，进行相关的操作；
```sh
<protocol>://<host>/<path>?<qeury>#fragment
  
// 我们可以自定义JSBridge通信的URL Schema，比如：
hellobike://showToast?text=hello
```
```java
// Android端
webView.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        if (url.startsWith("myapp://")) {
            // 解析URL参数并执行相应操作
            Uri uri = Uri.parse(url);
            String action = uri.getHost();
            String param = uri.getQueryParameter("param");
            // 处理相应逻辑
            return true; // 拦截URL
        }
        return super.shouldOverrideUrlLoading(view, url);
    }
});

// JS端调用
location.href = "myapp://showToast?text=hello";
```

- 安卓平台的webview组件`@JavascriptInterface`也是通过“桥”

```java
// Android端
class JsBridge {
    @JavascriptInterface
    public void showToast(String text) {
        Toast.makeText(context, text, Toast.LENGTH_SHORT).show();
    }
}

webView.addJavascriptInterface(new JsBridge(), "NativeBridge");

// JS端调用
window.NativeBridge.showToast("hello");
```