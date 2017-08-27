---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档目录（翻译）"
subtitle:   ""
date: 2017-08-01 16:00:00.000000000 +08:00
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
## 目录
### [概述（Overview）](http://www.jianshu.com/p/0c0c6554e472)
### 准备开始（Getting started）
#### [在Mac上安装](http://blog.fandong.me/2017/08/03/iOS-SwiftVaporWeb01/)
#### [在Ubuntu上安装](http://blog.fandong.me/2017/08/04/iOS-SwiftVaporWeb02/)
#### [工具箱](http://blog.fandong.me/2017/08/04/iOS-SwiftVaporWeb03/)
#### [Hello World](http://blog.fandong.me/2017/08/04/iOS-SwiftVaporWeb04/)
#### [手动](http://blog.fandong.me/2017/08/06/iOS-SwiftVaporWeb05/)
#### [Xcode](http://blog.fandong.me/2017/08/06/iOS-SwiftVaporWeb06/)
### Vapor
#### [文件夹结构](http://www.jianshu.com/p/a5681ecd0c43)
#### [Droplet](http://www.jianshu.com/p/a7df79df30b7)
#### [视图](http://www.jianshu.com/p/eff525cad446)
#### [控制器](http://www.jianshu.com/p/2db6fe8579d8)
#### [Provider](http://www.jianshu.com/p/f97612a271b1)
#### [哈希](http://www.jianshu.com/p/d07092711b3f)
#### [日志](http://www.jianshu.com/p/84558b3de9e5)
#### [命令](http://www.jianshu.com/p/1655275acfa8)
### Configs（配置文件）
#### [Configs](http://blog.fandong.me/2017/08/07/iOS-SwiftVaporWeb07/)
### JSON
#### [Package](http://www.jianshu.com/p/87a42c06df7d)
#### [Overview](http://www.jianshu.com/p/95430b8e6026)
### Routing（路由）
#### [Package](http://blog.fandong.me/2017/08/08/iOS-SwiftVaporWeb08/)
#### [Overview](http://blog.fandong.me/2017/08/09/iOS-SwiftVaporWeb09/)
#### [Parameters](http://blog.fandong.me/2017/08/09/iOS-SwiftVaporWeb10/)
#### [Group](http://blog.fandong.me/2017/08/12/iOS-SwiftVaporWeb11/)
#### [Collection](http://blog.fandong.me/2017/08/12/iOS-SwiftVaporWeb12/)
### Fluent
#### [Package](http://www.jianshu.com/p/5a2f6965f73b)
#### [Get Started](http://www.jianshu.com/p/f590e6449e47)
#### [Model](http://www.jianshu.com/p/a919cd994f5b)
#### [Database](http://www.jianshu.com/p/04d803ffb666)
#### [Query](http://www.jianshu.com/p/fb6d1a9949c7)
#### [Relations](http://www.jianshu.com/p/905239375d19)
### Cache
#### [Package](http://blog.fandong.me/2017/08/12/iOS-SwiftVaporWeb13/)
#### [Overview](http://blog.fandong.me/2017/08/12/iOS-SwiftVaporWeb14/)
### MySQL
#### [Package](http://www.jianshu.com/p/6f7a45138787)
#### [Provider](http://www.jianshu.com/p/406cecd2d742)
#### [Driver](http://www.jianshu.com/p/3bc2bfcbe26a)
### Redis
#### [Package](http://blog.fandong.me/2017/08/12/iOS-SwiftVaporWeb15/)
#### [Provider](http://blog.fandong.me/2017/08/12/iOS-SwiftVaporWeb16/)
### Auth
#### [Package](http://www.jianshu.com/p/0d4344e0f1a0)
#### [Provider](http://www.jianshu.com/p/900e80cce498)
#### [Getting Started](http://www.jianshu.com/p/11c941b24724)
#### [Helper](http://www.jianshu.com/p/5d2905c605e8)
#### [Password](http://www.jianshu.com/p/4b24584fb033)
#### [Persist](http://www.jianshu.com/p/1c197ef8ddbb)
#### [Redirect Middleware](http://www.jianshu.com/p/d09dba0684b3)
### JWT
#### [Package](http://blog.fandong.me/2017/08/13/iOS-SwiftVaporWeb17/)
#### [Overview](http://blog.fandong.me/2017/08/13/iOS-SwiftVaporWeb18/)
### Session
#### [Package](http://www.jianshu.com/p/30d8c92a98a5)
#### [Overview](http://www.jianshu.com/p/11b9178f64ed)
### HTTP
#### [Package](http://blog.fandong.me/2017/08/15/iOS-SwiftVaporWeb19/)
#### [Request](http://blog.fandong.me/2017/08/16/iOS-SwiftVaporWeb20/)
#### [Response](http://blog.fandong.me/2017/08/17/iOS-SwiftVaporWeb21/)
#### [Middleware](http://blog.fandong.me/2017/08/18/iOS-SwiftVaporWeb22/)
#### [Body](http://blog.fandong.me/2017/08/20/iOS-SwiftVaporWeb23/)
#### [ResponseRepresentable](http://blog.fandong.me/2017/08/20/iOS-SwiftVaporWeb24/)
#### [Responder](http://blog.fandong.me/2017/08/21/iOS-SwiftVaporWeb25/)
#### [Client](http://blog.fandong.me/2017/08/21/iOS-SwiftVaporWeb26/)
#### [Server](http://blog.fandong.me/2017/08/21/iOS-SwiftVaporWeb27/)
#### [CORS](http://blog.fandong.me/2017/08/21/iOS-SwiftVaporWeb28/)
### Leaf
#### [Package](http://www.jianshu.com/p/5f631eac999f)
#### [Provider](http://www.jianshu.com/p/7e6c2c587899)
#### [Overview](http://www.jianshu.com/p/53c9477eda83)
### Validation
#### [Package](http://blog.fandong.me/2017/08/22/iOS-SwiftVaporWeb29/)
#### [Overview](http://blog.fandong.me/2017/08/22/iOS-SwiftVaporWeb30/)
### Node
#### [Package](http://www.jianshu.com/p/9156c55afe84)
#### [Getting Started](http://www.jianshu.com/p/33c0544aa9ac)
### Core
#### [Package](http://blog.fandong.me/2017/08/24/iOS-SwiftVaporWeb31/)
#### [Overview](http://blog.fandong.me/2017/08/24/iOS-SwiftVaporWeb32/)
### Bits
#### [Package](http://www.jianshu.com/p/d119e9939d1e)
#### [Overview](http://www.jianshu.com/p/7af1d3dbbd78)
### Debugging
#### [Package](http://blog.fandong.me/2017/08/24/iOS-SwiftVaporWeb33/)
#### [Overview](http://blog.fandong.me/2017/08/24/iOS-SwiftVaporWeb34/)
### Deploy
#### [Nginx](http://www.jianshu.com/p/e211efa92785)
#### [Supervisor](http://www.jianshu.com/p/ac02861cba4d)
### Version(2.0)
#### [1.5](https://docs.vapor.codes/2.0/version/1_5/)
#### [2.0](https://docs.vapor.codes/2.0/version/2_0/)
#### [Support](https://docs.vapor.codes/2.0/version/support/)

