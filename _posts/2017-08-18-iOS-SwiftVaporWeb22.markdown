---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）HTTP-Middleware"
subtitle:   ""
date: 2017-08-18 08:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/HTTP/Middle](https://docs.vapor.codes/2.0/http/middleware/)

## 中间件
中间件是任何现代Web框架的重要组成部分,它允许你在客户端和服务器之间经过时修改请求和响应.
您可以将中间件看作连接您的服务器和请求您的网络应用程序的客户端的逻辑.
### 版本中间件
例如,让我们创建一个中间件,对每个响应添加我们的API版本,中间件看起来会是这样的:

```
import HTTP

final class VersionMiddleware: Middleware {
    func respond(to request: Request, chainingTo next: Responder) throws -> Response {
        let response = try next.respond(to: request)

        response.headers["Version"] = "API v1.0"

        return response
    }
}
```
我们将这个中间件提供给我们的`Droplet`容器

```
import Vapor

let config = try Config()

config.addConfigurable(middleware: VersionMiddleware(), name: "version")

let drop = try Droplet(config)
```
>你现在可以再配置文件中启用和禁用此中间件,只需要添加`version`到您的`droplet.json`中的`middleware`数组,请查看配置文件章节

你可以想见,我们的版本中间件就在连接客户端和我们的服务器中间,访问我们的服务器每一个请求和响应都必须经过这个中间件链.
![](http://om2bks7xs.bkt.clouddn.com/2017-08-18-iOS-SwiftVaporWeb22-01.png)

### 分解
我们一行一行的分解中间件

```
let response = try next.respond(to: request)
```
由于


