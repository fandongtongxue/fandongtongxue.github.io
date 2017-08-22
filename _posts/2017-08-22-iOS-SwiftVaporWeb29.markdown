---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Validation-Package"
subtitle:   ""
date: 2017-08-22 16:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Validation/Package](https://docs.vapor.codes/2.0/validation/package/)

## 使用验证
本概述章节讲解如何导入Validation软件包,无论你是否使用Vapor项目.
### 使用Vapor
使用Vapor来使用验证软件包最简单的方法就是包含验证包的提供程序.

```
import PackageDescription

let package = Package(
    name: "Project",
    dependencies: [
        .Package(url: "https://github.com/vapor/vapor.git", majorVersion: 2),
        .Package(url: "https://github.com/vapor/validation-provider.git", majorVersion: 1)
    ],
    exclude: [ ... ]
)
```
验证提供程序添加验证包到你的Vapor工程,并且添加了一些Vapor特定的便利,比如验证的中间件.
使用`import ValidationProvider`将会导入验证中间件和验证模块.
### 仅使用验证
验证提供程序的核心是验证模块.

```
import PackageDescription

let package = Package(
    name: "Project",
    dependencies: [
        ...
        .Package(url: "https://github.com/vapor/validation.git", majorVersion: 1)
    ],
    exclude: [ ... ]
)
```
使用`import Validation`来访问核心验证的类