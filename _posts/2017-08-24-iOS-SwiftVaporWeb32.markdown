---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Core-Overview"
subtitle:   ""
date: 2017-08-24 08:55:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Core/Overview](https://docs.vapor.codes/2.0/core/overview/)

## Core(核心)
Core(核心)为常用任务提供了一些便利
### 后台
用`backgroud()`可以轻松创建一个后台线程

```
print("hello")

try background {
    print("world")  
}
```
### Portal
Protals允许你创建异步任务闭包

```
let result = try Portal.open { portal in
    someAsyncTask { result in
        portal.close(with: result)
    }
}

print(result) // the result from the async task
```
### RFC1123
创建RFC1123类型的日期.

```
let now = Date().rfc1123 // string 
```
你也可以解析RFC1123的字符串

```
let parsed = Date(rfc1123: "Mon, 10 Apr 2017 11:26:13 GMT")
```
