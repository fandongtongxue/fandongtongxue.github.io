---
layout: post
title: iOS集成第三方登录可能会遇到的问题
date: 2017-07-09 11:00:00.000000000 +08:00
---

---
最近突然萌生了做FDXXXX系列的想法
那首先把之前删掉的Social相关的再重做一下吧!
- 项目地址:[https://github.com/fandongtongxue/FDSocialDemo](https://github.com/fandongtongxue/FDSocialDemo)
遇到的问题如下

---
### 1.您所访问的站点在微博认证失败,错误号:21322
![](http://om2bks7xs.bkt.clouddn.com/2017-07-09-iOS-social_question_1.png)
- 解决方案:
- 安全域名设置为否
![](http://om2bks7xs.bkt.clouddn.com/2017-07-09-iOS-social_answer_1_1.png)
- 或者填上回调地址,同时在项目中设置
![](http://om2bks7xs.bkt.clouddn.com/2017-07-09-iOS-social_answer_1_2.png)


