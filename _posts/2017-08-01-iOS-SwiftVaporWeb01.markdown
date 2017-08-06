---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Install: Mac OS"
subtitle:   ""
date: 2017-08-03 12:00:00.000000000 +08:00
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
> [Vapor 2.0 - 文档目录](http://blog.fandong.me/2017/08/01/iOS-SwiftVaporWeb/)
> 以下文字翻译自[Vapor Docs/Getting started/Install:Mac OS](https://docs.vapor.codes/2.0/getting-started/install-on-macos/)

## 在Mac OS上安装
想要在Mac OS上用Vapor，你只需要确保已安装Xcode 8。

### 安装Xcode
*  从Mac App Store 安装[Xcode 8](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
![Xcode 8](http://om2bks7xs.bkt.clouddn.com/2017-08-03-Swift-Vapor-Web-01-1.png)

#### 打开Xcode
* 当Xcode 8 下载完之后，你必须打开它完成安装，这可能会花费一定的时间。

#### 确认Swift的安装
（按回车两次再次检查Swift的安装）
```
eval "$(curl -sL check.vapor.sh)"
```
### 安装Vapor
#### 安装HomeBrew
如果你还没有安装HomeBrew，那就安装它吧，对于安装类似OpenSSL，MySQL，Postgres，Redis，SQLite等软件依赖特别有用。
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
更多信息请移步[Homebrew](https://brew.sh)
#### 添加Homebrew Tap(这个Tap怎么翻译😂)
Vapor的Homebrew Tap(这个Tap怎么翻译😂)可以让你安装所有Vapor的Mac OS依赖包
```
brew tap vapor/homebrew-tap
```
```
brew update
```
#### 安装
现在你已经添加了Vapor的Homebrew Tap(这个Tap怎么翻译😂)，你可以安装Vapor的ToolBox和依赖了。
```
brew install vapor
```
### 下一步
想要学习更多关于Vapor Toolbox CLI在[ToolBox章节](https://docs.vapor.codes/2.0/getting-started/toolbox/)在准备开始章节中

### Swift.org
对于安装Swift3.0的更多细节请到[Swift.org](https://swift.org/)获取更多指引


