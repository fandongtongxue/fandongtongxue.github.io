---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Redis-Package"
subtitle:   ""
date: 2017-08-12 12:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Redis/Package/](https://docs.vapor.codes/2.0/redis/package/)

## 使用Redis
这章节讲解如何导入Redis包,无论你是否使用Vapor项目
### 使用Vapor
最简单的在Vapor项目中使用Redis的方式包含Redis依赖

```
import PackageDescription

let package = Package(
	name:"Project",
	dependencies:[
		.Package(url: "https://github.com/vapor/vapor.git", majorVersion: 2),
       .Package(url: "https://github.com/vapor/redis-provider.git", majorVersion: 2)
	],
	exclude: [...]
)
```
Redis提供程序包将Redis添加到你的项目中,并将符合Vapor的```CacheProtocol```
使用```import RedisProvider.```

### 仅使用Redis
Redis提供程序的核心是一个纯粹的Swift Redis客户端,软件包本身可以用于将原始缓存查询发送到您的Redis数据库

```
import PackageDescription

let package = Package(
	name:"Project",
	dependencies:[
		.Package(url: "https://github.com/vapor/vapor.git", majorVersion: 2),
       .Package(url: "https://github.com/vapor/redis.git", majorVersion: 2)
	],
	exclude: [...]
```
使用```import Redis```
