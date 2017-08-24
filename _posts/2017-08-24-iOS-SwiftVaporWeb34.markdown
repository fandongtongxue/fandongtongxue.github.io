---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Debugging-Overview"
subtitle:   ""
date: 2017-08-24 09:09:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Debugging/Overview](https://docs.vapor.codes/2.0/debugging/overview/)

## 调试
确认你的错误类型可以被调试,并且允许Vapor创建更丰富的错误消息,使调试变得更容易.

```
import Debugging

extension FooError: Debuggable {
    // conform here
}
```
现在当抛出一个`FooError`,你会得到一个很好的消息在您的控制台.

```
Foo Error: You do not have a `foo`.

Identifier: DebuggingTests.FooError.noFoo

Here are some possible causes: 
- You did not set the flongwaffle.
- The session ended before a `Foo` could be made.
- The universe conspires against us all.
- Computers are hard.

These suggestions could address the issue: 
- You really want to use a `Bar` here.
- Take up the guitar and move to the beach.

Vapor's documentation talks about this: 
- http://documentation.com/Foo
- http://documentation.com/foo/noFoo
```