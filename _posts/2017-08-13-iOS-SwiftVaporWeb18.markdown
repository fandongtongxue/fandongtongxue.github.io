---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）JWT-Package"
subtitle:   ""
date: 2017-08-13 20:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/JWT/Package](https://docs.vapor.codes/2.0/jwt/package/)

## 使用JWT
这章节讲述怎么导入JWT包,不论你使用Vapor或者不使用Vapor
### 使用Vapor
最简单使用Vapor使用JWT就是包含JWT provider

```
import PackageDescription

let package = Package(
    name: "Project",
    dependencies: [
        .Package(url: "https://github.com/vapor/vapor.git", majorVersion: 2),
        .Package(url: "https://github.com/vapor/jwt-provider.git", majorVersion: 1)
    ],
    exclude: [ ... ]
)
```

JWT提供程序包会添加JWT到你的工程,并且会添加额外的,比如Vapor特别方便的就像```drop.signers```
使用```import JWTProvider```

### 仅使用JWT
JWT提供程序包的核心是一个快速的,纯Swift的JWT对于解码,序列化和验证JSON Web令牌的实现

```
import PackageDescription

let package = Package(
    name: "Project",
    dependencies: [
        ...
        .Package(url: "https://github.com/vapor/jwt.git", majorVersion: 2)
    ],
    exclude: [ ... ]
)
```
使用```import JWT```来使用JWT类