---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Hello,World"
subtitle:   ""
date: 2017-08-04 12:00:00.000000000 +08:00
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
> [Vapor 2.0 - 文档目录](http://www.jianshu.com/p/155866779a8e)
> 以下文字翻译自[Vapor Docs/Getting started/Hello,World](https://docs.vapor.codes/2.0/getting-started/hello-world/)
## Hello,World
这个章节需要你已经安装了Swift3.1以及Vapor工具箱并且确认他们正在工作
>提示
>如果你不想要使用工具箱，请移步[手动指引](https://docs.vapor.codes/2.0/getting-started/manual/)

### 新工程
让我们开始常见一个叫“Hello,World的新工程”
```
vapor new Hello --template=api
```
如果你已经使用过其他网络框架之后，你会对Vapor的目录结构很熟悉。
