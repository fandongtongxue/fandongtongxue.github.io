---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Routing-Group"
subtitle:   ""
date: 2017-08-12 08:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Routing/Group](https://docs.vapor.codes/2.0/routing/group/)

## 路由组
将路由分组可以很方便的将公用前缀,中间件,主机添加到多个路由.
路由组有两种不同的形式,Group和Grouped.
### Group
Group(没有"ed"的那个)需要通过一个```RouteBuilder```闭包

```
drop.group("v1"){ v1 in
	v1.get("users"){ request in
		//get the user
	}
}
```
### Grouped
Grouped会返回一个你可以用来传递的```RouteBuilder```

```
let va = drop.grouped("v1")
v1.get("users"){ request in
	//get the users
}
```
### 中间件
你可以像一组路由中添加中间件,这对于身份验证特别有用.

```
drop.group(AuthMiddleware()){ authorized in
	authorized.get("token"){ request in
		//has been authorized
	}
}
```
### 主机
你可以限制一组路由的主机

```
drop.group(host:"vapor.codes"){ vapor in
	vapor.get {request in
		//only responds to requests to vapor.codes
	}
}
```
### 链
组可以被链在一起

```
drop.grouped(host:"vapor.codes").grouped(AuthMiddleware()).group("v1"){ authedSecureV1 in
	//add routes here
}
```