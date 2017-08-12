---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Routing-Collection"
subtitle:   ""
date: 2017-08-12 09:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Routing/Collection](https://docs.vapor.codes/2.0/routing/collection/)

## 路由集合
路由集合允许将多个路由和路由组组织在不同的文件和模块中.
### 示例
这是```v1```API部分的路由集合示例

```
import Vapor
import HTTP
import Routing

class V1Collection: RouteCollection{
	func build(_builder:RouteBuilder){
		let v1 = builder.grouped("v1")
		let users = v1.grouped("users")
		let articles = v1.grouped("articles")
		
		users.get{ request in
			return "Requested all users."
		}
		
		articles.get(Article.init){ request, article in
			return "Requested \(article.name)"
		}
	}
}
```
这个类可以放到任何文件中,我们也可以把它添加到我们的Droplet甚至另一个路由组.

```
let v1 = V1Collection()
drop.collection(v1)
```
Droplet将会被传递给您的路由集合的```build(_:)```方法,并添加各种路由.
### 空的初始化方法
你可以添加```EmptyInitializable```到你的路由集合,并且如果路由集合有一个空的初始化方法,这就允许你通过其类型名称添加路由集合

```
class V1Collection: RouteCollection,EmptyInitiallizable {
	init(){}
	...
}
```
现在我们可以添加路由集合而不初始化它