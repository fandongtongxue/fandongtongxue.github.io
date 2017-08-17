---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）HTTP-Response"
subtitle:   ""
date: 2017-08-17 08:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/HTTP/Response](https://docs.vapor.codes/2.0/http/response/)

## 响应
当我们构建结束点时,我们通常会返回请求的响应,如果我们正在发出请求,我们将受到.

```
public let status: Status
public var headers: [HeaderKey: String]
public var body: Body
public var data: Content
```
### 状态
与事件关联的http状态,例如`.ok`==200 ok
### 请求头
这些是与请求相关的头,如果你正在准备一个传出的响应,这可以用来添加你的密钥.

```
let contentType = response.headers["Content-Type"]  
```
或者外发响应

```
let response = response ...
response.headers["Content-Type"] = "application/json"
response.headers["Authorization"] = ... my auth token
```
#### 扩展头


