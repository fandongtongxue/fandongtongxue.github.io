---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Toolbox"
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
> 以下文字翻译自[Vapor Docs/Getting started/Toolbox](https://docs.vapor.codes/2.0/getting-started/toolbox/)

## 工具箱
### 安装工具箱
Vapor的命令行界面提供了一般任务的入口和一些快捷方式
![](http://om2bks7xs.bkt.clouddn.com/2017-08-03-Swift-Vapor-Web-03-1.png)
> 提示
> 如果你不想用Toolbox或者模板,请移步[Manual](https://docs.vapor.codes/2.0/getting-started/manual/)来快速开始

### 帮助
帮助命令会打印出关于可用的命令和flags有用的信息,你也可以运行--help在任何工具箱命令行中
```
vapor --help
```
### Vapor命令行工具



