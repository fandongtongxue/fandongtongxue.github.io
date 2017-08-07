---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Xcode"
subtitle:   ""
date: 2017-08-06 22:00:00.000000000 +08:00
author:     "范东"
header-img: "img/post-bg-ios9-web.jpg"
catalog:    true
tags:
    - iOS
    - Swift
    - Web
    - Vapor
---
## 前言
之前一直有做Java后台开发的兴趣，可是想到要看好多的Java教程，作为一个iOS开发者，我放弃了，
后来从朋友[韩云智VL](http://www.jianshu.com/u/92f7630a351b)那里知道了这个框架，竟是用Swift写的，不得不说，它燃起了我的兴趣。
[Vapor](http://vapor.codes)是一个基于Swift开发的服务端框架，可以工作于iOS，Mac OS，Ubuntu。
为了配合Swift部署到服务器,我把ECS的服务器系统改为Ubuntu16.04。
> [Vapor 2.0 - 文档目录](http://blog.fandong.me/2017/08/01/iOS-SwiftVaporWeb/)
> 以下文字翻译自[Vapor Docs/Getting started/Xcode](https://docs.vapor.codes/2.0/getting-started/xcode/)

## Xcode
如果你在Mac做开发，你可以在Xocde上开发你的Vapor工程，通过Xcode你可以编译，运行，停止你的服务，当然你也可以用断点来调试你的代码
![](http://om2bks7xs.bkt.clouddn.com/2017-08-06-Swift-Vapor-Web-06-1.png)
你首先需要生成一个*.xcodeproj文件来使用Xcode开发
选择'Run'
在你生成Xcode工程文件之后确保你选择了可执行的运行方式
![](http://om2bks7xs.bkt.clouddn.com/2017-08-06-Swift-Vapor-Web-06-2.png)
### 生成工程文件
#### Vapor 工具箱
用以下命令生成Xcode工程
```
vapor xcode
```
>提示
>如果你希望它生成完工程文件直接打开用```vapor xcode -y```

#### 手动
手动生成一个Xcode工程文件
```
swift package generate-xcodeproj
```
打开工程文件来正常继续


