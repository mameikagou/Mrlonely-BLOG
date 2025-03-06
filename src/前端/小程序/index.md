


文章
<https://mp.weixin.qq.com/s?__biz=MzI3OTE3ODk4MQ==&mid=2247487727&idx=1&sn=3e19ba5866173117d2bacb997e5789f5&chksm=eb4aeb65dc3d6273a3c4508cd2c46b9dae1e1a664ce58091d44c403d99b742841cfe00ad25d3&cur_album_id=2126792242496405506&scene=189#wechat_redirect>

## onLaunch 全局对象

一切的入口是app.js, 在其中可以定义几个初始化函数:

- onLaunch(小程序初始化)

在这里有个全局对象this, 其内容如下

```
configLoadOK: ƒ ()
getUserApiInfo: ƒ ()
globalData: {>
    apiUserInfoMap: undefined
desc: "这是app.js的wx.getSystemInfo方法设置的全局信息"
isConnected: true
menuButtonObject: {width: 87, height: 32, left: 296, top: 51, right: 383, …}
navHeight: 87
navTop: 51
res: "114514"
sdkAppID: 1400450467
windowHeight: 844
}
initNickAvatarUrlPOP: ƒ ()
loginOK: ƒ ()
onHide: ƒ ()
onLaunch: ƒ ()
onShow: ƒ ()
onUnlaunch: ƒ ()
__proto__: Object
```

其中有个全局对象globalData, 你可以在onLaunch的任何位置通过`this.globalData.{变量名}`来"新增"和"初始化"全局变量

不是非要在app.js的globalData中定义

- onShow(小程序切前台)

- Hide(小程序切后台)

## MVVM数据绑定

在Data中定义数据, (就像vue中那样)
然后`this.setData({ var1: 1 })`来在函数中修改变量