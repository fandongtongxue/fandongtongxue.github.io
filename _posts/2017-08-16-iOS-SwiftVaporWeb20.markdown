---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）HTTP-Request"
subtitle:   ""
date: 2017-08-15 09:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/HTTP/Request](https://docs.vapor.codes/2.0/http/request/)

## 请求
```HTTP```库中最常用的交互部分就是```Request```类型,这里有一些这种类型中最常用的属性.

```
public var method: Method
public var uri: URI
public var parameters: Node
public var headers: [HeaderKey: String]
public var body: Body
public var data: Content
```
### 方法
HTTP中与请求有关的请求,即:```GET```,```POST```,```PUT```,```PATCH```,```DELETE```.
### URI
与请求关联的URI,我们将使用它来访问请求发送的属性
举个例子,给定以下URI:```http://vapor.codes/example?query=hi#fragments-too```

```
let scheme = request.uri.scheme //http
let host = request.uri.host //Vapor.codes
let path = request.uri.path //example
let query = request.uri.query //query=hi
let fragment = request.uri.fragment // fragments-too
```
### 路由参数
与请求关联的url参数,举个例子,如果我们有一个注册的路径```hello/:name/age/:age```,我们将能够访问请求中的参数.像这样


