---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Redis-Provider"
subtitle:   ""
date: 2017-08-12 13:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Redis/Provider/](https://docs.vapor.codes/2.0/redis/provider/)

## Redis提供商
在你添加[Redis提供程序包](http://blog.fandong.me/2017/08/12/iOS-SwiftVaporWeb13/)到你的项目里之后，在代码中设置提供程序将会变得很简单。
### 添加到Droplet
第一步，在容器中注册```RedisProvider.Provider```

```
import Vapor
import RedisProvider

let config = try Config()
try config.addProvider(RedisProvider.Provider.self)

let drop = try Droplet(config)
```
### 配置Vapor
一旦添加提供程序包添加到你的Droplet中,你就可以配置Vapor使用Redis来缓存.

```
Config/droplet.json
```

```
{
	"cache":"redis"
}
```

>更多

>学习更多的配置信息[设置引导](http://blog.fandong.me/2017/08/07/iOS-SwiftVaporWeb07/)

### 配置Redis
如果你现在运行你的应用程序,你将会看到一个Redis配置文件找不到的错误,让我们现在来添加它
#### 基础
这里有一个Redis配置文件的例子

```
Config/redis.json
```

```
{
	"hostname":"127.0.0.1"
	"port":6379,
	"password":"secret",
	"database":2
}
```

密码(password)和数据库(database)是可选项
>笔记
> 如果配置文件中包含敏感信息,最好把Redis配置文件放到```Config/secret```文件夹中

#### URL
你也可以通过URL来通过Redis验证

```
Config/Redis.json
```

```
{
	"url":"redis://:secret@127.0.0.1:6379/2"
}
```
密码(password)和数据库(database)是可选项

### 完成
你现在已经准备好了通过Redis数据库[使用缓存](http://blog.fandong.me/2017/08/12/iOS-SwiftVaporWeb13/)