---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Routing-Package"
subtitle:   ""
date: 2017-08-07 22:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Routing/Package](https://docs.vapor.codes/2.0/routing/package/)

## 使用路由
### 通过Vapor
这是Vapor默认就包含的包，只需要

```
import Routing
```

### 不通过Vapor
路由提供器是一个可以用在任意Web端Swift框架的纯Swift路由，要将它包含在你的包中，添加如下代码到你的```Package.swift```文件中

```
import PackageDescription
let package = Package{
      name:"Project",
      dependencies:[
      ...  
 .Package(url:"https://github.com/vapor/routing.git",majorVersion:2)
],
exculde:[...]
```

用```import Routing```来获取路由的APIs