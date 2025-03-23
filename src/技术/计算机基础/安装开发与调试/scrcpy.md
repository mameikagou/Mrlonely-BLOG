

##

额，因为公司电脑屏蔽了一些域名，并且不允许使用任何网盘类软件，所以我就有了一个串流使用电脑来访问手机上的软件的需求；

工具：
adb，scrcpy

mac上系统下载：
```
brew install scrcpy
brew install android-platform-tools
```

然后要先配对，再连接到手机，配对方式：

1. 手机上打开开发者选项，开启无线调试;
不同手机的开发者选项不一样，探索一下就行；

2. 配对：电脑和手机连接到同一个wifi，然后选择一个配对方式

电脑上：
```
adb pair <device_id>:port
```

3. 连接：
```
adb connect <device_id>:port
```

4. 启动scrcpy：
```
scrcpy --tcpip
```




