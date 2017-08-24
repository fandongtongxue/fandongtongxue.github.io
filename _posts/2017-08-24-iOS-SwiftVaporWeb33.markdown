---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Debugging-Package"
subtitle:   ""
date: 2017-08-24 09:05:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Debugging/Package](https://docs.vapor.codes/2.0/debugging/package/)

## 使用调试
### 通过Vapor
默认情况下,调试包已经包含在Vapor中,只需要添加

```
import Debugging
```
### 没有Vapor
调试是一个便利的协议,用于提供有关错误消息的更多信息,你可以在任何Swift项目中使用它.

```
import PackageDescription

let package = Package(
    name: "Project",
    dependencies: [
        ...
        .Package(url: "https://github.com/vapor/debugging.git", majorVersion: 1)
    ],
    exclude: [ ... ]
)
```
使用`import Debugging`来访问调试的API.

