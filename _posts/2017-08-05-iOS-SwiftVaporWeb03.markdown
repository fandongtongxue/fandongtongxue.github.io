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
> [Vapor 2.0 - 文档目录](http://blog.fandong.me/2017/08/01/iOS-SwiftVaporWeb/)
> 以下文字翻译自[Vapor Docs/Getting started/Toolbox](https://docs.vapor.codes/2.0/getting-started/toolbox/)

## 工具箱
### 安装工具箱
Vapor的命令行界面提供了一般任务的入口和一些快捷方式
![](http://om2bks7xs.bkt.clouddn.com/2017-08-03-Swift-Vapor-Web-03-1.png)
> 提示
> 如果你不想用Toolbox或者模板,请移步[Manual](https://docs.vapor.codes/2.0/getting-started/manual/)来快速开始

### 帮助
帮助命令会打印出关于可用的命令和flags有用的信息,你也可以运行```--help```在任何工具箱命令行中
```
vapor --help
```
### Vapor命令行工具
```vapor run```这个命令是一个可以直达你的Vapor应用程序的特殊工具箱命令
你可以使用```vapor run serve```来启动你的Vapor应用程序，或者```vapor run help```来查看所有可以使用的应用程序级的命令，这里面包含了你可以添加到你应用程序中的自定义的命令
>警告
>用```vapor run --help```这条命令会提供关于run命令的有关信息而且不会直接指向你的Vapor应用程序

### 更新
当依赖包管理器安装完之后应该更新下工具箱
#### Homebrew
```
brew upgrade vapor
```
#### APT
```
sudo apt-get update
```
```
sudo apt-get install vapor
```
### 模板
工具箱可以创建基于Vapor基础模板的工程或者其他的git仓库
```
vapor new <name> [--template]
```
>example
>```vapor new test --template=api```创建一个基于api模板的test项目

名称 | 标记 | 详细描述
------- | ------- | ------
API | --template=api | 基于Fluent数据库的JSON API
Web | --template=web | 基于Leaf模板的HTML网站

##### 查看在Github上所有的[模板](https://github.com/search?utf8=✓&q=topic%3Avapor+topic%3Atemplate&type=Repositories)
>笔记
>如果你不指定模板标记选项，你将会使用默认的API模板，以后也可以进行修改

#### 其他选项
工具箱将会建立一个基于你所选择的模板标记选项的绝对路径

- ```--template=web```克隆```https://github.com/vapor/web-template```
- ```--template=user/repo```克隆```https://github.com/user/repo```
- ```--template=http://example.com/repo-path```克隆给到的完整url
- ```--branch=foo```可以用于标记一个master之外的其他分支



