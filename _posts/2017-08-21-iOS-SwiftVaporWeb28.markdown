---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）HTTP-CORS"
subtitle:   ""
date: 2017-08-21 23:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/HTTP/CORS](https://docs.vapor.codes/2.0/http/cors/)

## CORS
默认情况下,Vapor提供了一个实现源代码资源共享(CORS - Cross-ORigin Resource Sharing)叫`CORSMiddleware`中间件
CORS - Cross-ORigin Resource Sharing是一种能够跨平台的开源的访问规范,如果你提供公共内容,请考虑使用CORS打开通用的JavaScript浏览器访问,[http://enable-cors.org/](http://enable-cors.org/)
想要了解更多关于中间件的信息,请访问文档中的 [中间件章节](http://blog.fandong.me/2017/08/18/iOS-SwiftVaporWeb22/)
![](http://om2bks7xs.bkt.clouddn.com/2017-08-22-SwiftVaporWeb-29-01.svg)
图片作者:[维基百科](https://commons.wikimedia.org/wiki/File:Flowchart_showing_Simple_and_Preflight_XHR.svg)
### 基础
首先,添加CORS中间件到你的Droplet中间件数组中.

```
Config/droplet.json
```

```
{
    ...,
    "middleware": [
        ...,
        "cors",
        ...,
    ],
    ...,
}
```
下次你启动你的应用程序的时候,系统将提示你添加`Config/cors.json`文件

```
Config/cors.json
```

```
{
    "allowedOrigin": "*",
    "allowedMethods": ["GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"],
    "allowedHeaders": [
       "Accept",
       "Authorization",
       "Content-Type",
       "Origin",
       "X-Requested-With"
    ]
}
```
>笔记
>确保你在抛出其他中间件之前插入CORS中间件,想AbortMiddleware或类似的,否则,正确的请求头可能不会添加到响应中.

`CORSMiddleware`具有适合绝大多数用户的默认配置,它们的值像下面这样

- 允许原始的
- 请求中的原始请求头
- 允许的方法
- `GET`,`POST`,`PUT`,`OPTIONS`,`DELETE`,`PATCH`
- 允许的请求头
- `Accept`,`Authorization`,`Content-Type`,`Origin`,`X-Requested-With`

### 高级
高级用户可以自定义所有的设置和预设,有两种方法,可以通过编程方式创建和配置`CORSConfiguration`文件,也可以将你的配置放入Vapor的JSON配置文件.
看看如下的设置的两种方法.
#### 配置
`CORSConfiguration`结构体用于配置`CORS中间件`.你可以这样来初始化

```
let config = try Config()
config.addConfigurable(middleware: { config in
    return CORSConfiguration(
        allowedOrigin: .custom("https://vapor.codes"),
        allowedMethods: [.get, .post, .options],
        allowedHeaders: ["Accept", "Authorization"],
        allowCredentials: false,
        cacheExpiration: 600,
        exposedHeaders: ["Cache-Control", "Content-Language"]
    )
}, name: "custom-cors")
```
然后设置`custom-cors`到你的Droplet的中间件数组.

```
Config/droplet.json
```

```
{
    ...,
    "middleware": [
        ...,
        "custom-cors",
        ...,
    ],
    ...,
}
```
>笔记
>有关设置`CORSConfiguration`可用值的更多信息,请参阅源代码中的文档.