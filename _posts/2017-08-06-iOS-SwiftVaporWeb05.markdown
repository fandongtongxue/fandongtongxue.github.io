---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Manual"
subtitle:   ""
date: 2017-08-06 21:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Getting started/manual](https://docs.vapor.codes/2.0/getting-started/manual/)

## 手动快速开始
学习不用工具箱只用Swift3.1和Swift包管理器（SPM）创建一个Vapor工程
这篇文档需要你已经安装了Swift3.1，如果没有,在继续之前请移步[Swift。org](https://swift.org/getting-started/#installing-swift)
>提示
>如果你愿意使用工具箱，请移步[工具箱指引](http://www.jianshu.com/p/e75e62138ebd)

### 用Swift包管理器创建新工程
打开你的终端
>笔记
>举例使用，我们将会使用桌面作为根目录

```
cd ~/Desktop
```
```
mkdir Hello
```
```
cd Hello
```
```
swift package init --type executable
```
你的目录结构应该看起来是这样的
```
├── Package.swift
├── Sources
│   └── main.swift
└── Tests
```
### 编辑Package.swift
打开你的Package.swift
```
open Package.swift
```
并且添加Vapor作为依赖，这里展示的是你```Package.swift```应该的样子
```
//swift-tools-version:3.1
import PackageDescription
let package = Package(
	name:"Hello"
	dependencies:[
		.Package(url:"https://github.com/vapor/vapor.git",majorVersion:2)
	]
)
```
>警告
>我们尽量保持这个文档的持续更新，然而，你也可以在[这里](https://github.com/vapor/vapor/releases)查看到最新的发布版本

### 编辑main.swift
一个简单的hello world:
```
import Vapor
let drop = try Droplet()
drop.get("hello"{ req in
	return "Hello Vapor"
})
try drop.run()
```
### 编译和运行（开发环境）
第一次```build```命令会花费较长的时间来获取依赖库
```
swift build
```
```
.build/debug/Hello serve
```
>警告
>如果名字不同，在以上所有的文件中替换```Hello```（与```Package.swift```中定义的一样）

### 生产环境
在Swift的发布模式下编译和运行将会使你的app更安全和提供更好的体验
```
swift build --configuration release
```
```
.build/release/Hello serve --env=production
```
### 查看
打开你最喜欢的浏览器并且访问```http://localhost:8080/hello```

