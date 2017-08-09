---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Routing-Overview"
subtitle:   ""
date: 2017-08-09 21:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Routing/Package](https://docs.vapor.codes/2.0/routing/overview/)

## 基础路由
路由是一个网络框架中最关键的模块之一，路由决定了什么样的请求获得什么样的响应.
Vapor有大量的路由功能,包括创建,组策略,和集合,在本章节,我们将介绍路由的基础知识.
### 注册
最基本的路由包含一个方法名,路径和闭包.

```
drop.get("welcome"){ request in
	return "Hello"
}
```
包含GET,POST,PUT,PATCH,DELETE和OPTION的HTTP标准方法都是可用的

```
drop.post("form"){ request in
	return "Submitted with a POST request"
}
```
### 嵌套
要在路径上进行嵌套(URL中的```/```),只需要添加逗号

```
drop.get("foo","bar","baz"){ request in
	return "You requested /foo/bar/baz"
}
```
你也可以使用```/```,但是通过安全路由参数类型,逗号比较容易输入,提升你的工作效率.
### 替代
接受一个方法作为第一个参数的备用语法也是可用的.

```
drop.add(.trace,"welcome"){ request in
	return "Hello"
}
```
如果你要动态地注册路由或者使用一个不大常用的方法可能很有用.
### 请求
每一个路由闭包代表一个请求,这包含所有调用路由闭包请求相关联的数据;
### 响应机制
路由闭包可以通过三种方式返回
 - 响应
 - 响应机制
 - 抛出异常
### 响应
可以返回一个自定义的响应

```
drop.get("vapor"){ request in
	return Response(redirect:"http://vapor.codes")
}
```
这对于创建特殊的响应(比如重定向)非常有用,这对于你需要向响应中添加Cookies或者其他项目的情况也是有用的
### 响应机制
正如你在前面看到的例子一样,路由闭包中可以返回字符串,这是因为他们符合响应机制
Vapor中的很多类型默认遵循这个协议,-String-Int-[JSON](https://docs.vapor.codes/2.0/json/package/)-[Model](https://docs.vapor.codes/2.0/fluent/model/)

```
drop.get("json"){ request in
	var json = JSON()
	try json.set("number",123)
	try json.set("text","unicorns")
	try json.set("bool",false)
	return json
}
```
### 抛出异常
如果你无法返回响应,你可以抛出任何遵循```Error```的对象,Vapo带有默认的错误枚举

```
drop.get("404"){ request in
	throw Abort(.noFound)
}
```
你也可以通过```Abort```来自定义这些错误的信息

```
drop.get("error"){ request in
	throw Abort(.badRequest,reason:"Sorry 😱")
}
```
这些错误会被错误中间件捕获,在这里他们被转成类似下面的JSON响应

```
{
	error:true
	message:"<the message>"
}
```
如果你想重写这个行为,从```Droplet的中间件```中移除错误中间件(key:"error")并且加上你自己的
### 后备
后备路由允许你匹配多层嵌套/

```
app.get("anything","*"){request in
	return "Match anything after /anything"
}
```
例如,上面这个路由可以匹配下面所有的路径或者更多

- /anything
- /anything/foo
- /anything/foo/bar
- /anything/foo/bar/baz
- ...