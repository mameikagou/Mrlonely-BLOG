
### Monorepo

<https://mp.weixin.qq.com/s/IyGnceMl-vmQ_cGUxy7isw?poc_token=HC_Mv2ejNE0fAk_-8A8EL7w7J8N3gOZTKU_FAZhd>

常见两种方式：

- 本地资源引入

优点是：本地引入，比较便捷； 并且可以使用稳定版，组件迭代挂了，也不影响使用；
缺点是：权限管控问题（非组件提供方也能修改代码）以及，变更要重新构建、信息同步方面的问题；

- Micro Frontend远程引入（服务端加载）

优点是：host更新，使用者能马上用到；并且有host权限才能开发组件；
缺点是：本地调试需要起两个服务，如果host挂了，会连带着你的项目一起出问题；

最佳实践：
- 权限问题：在不获取主系统权限的情况，仍然能使用部分组件服务
- 降级预案：引入新组件的时候，不会影响现有的服务；（避免，”一颗老鼠史，坏了一锅粥“）
- 埋点上报：应用方将新业务引入自己的系统的时候，希望这一部分的数据，上报到自己的应用监控系统中


### 具体方案

后面好像都涉及一些umi的解决方案了，没太看明白；
#### 鉴权

<https://mmbiz.qpic.cn/mmbiz_png/AAQtmjCc74DQYRqcHQW6rs8Eymyia8np2n1OUibb2Ch1a23FcRniaibcRfOdFQ2b2Qa0JyHql5dP2CDIHZO02L6FZQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1>

