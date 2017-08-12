---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Cache-Overview"
subtitle:   ""
date: 2017-08-12 11:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Cache/Overview](https://docs.vapor.codes/2.0/cache/overview/)

## 缓存
Vapor的```CacheProtocol```允许你使用可选的过期日期从缓存中存储和检索条目
默认情况下,Droplet的缓存设置为```MemoryCache```,看下下面的[供应商](http://www.jianshu.com/p/155866779a8e/#供应商)
### 存储
可以直接存错数据到缓存中

```
try drop.cache.set("Hello","world")
```
### 过期时间
当你存储数据是,你也可以设置过期时间

```
try drop.cache.set("ephemeral",42,expiration: Date(timeIntervalSinceNow:30))
```
在上面的示例中,设置的键值对将在30秒之后过期
### 检索
你可以使用.get()方法从缓存中检索数据
### 删除
可以使用.delete()方法从缓存中删除键

```
try drop.cache.delete("hello")
```
### 供应商
这是官方缓存提供商的列表,你可以从[GitHub](https://github.com/search?utf8=%E2%9C%93&q=topic%3Avapor-provider+topic%3Acache&type=Repositories)获取更多包

类型 | 键 | 描述 | 包 | 类型
------- | ------- | ------- | ------- | -------
Memory | memory | 在内存中,不持久 | Vapor | MemoryCache
Fluent | fluent | 使用Fluent数据库 | [Fluent 提供商](http://www.jianshu.com/p/5a2f6965f73b) | FluentCache
Redis | redis | 使用Redis数据库 | [Redis提供商](https://docs.vapor.codes/2.0/redis/package/) | RedisCache

### 如何使用
要使用除默认值```MemoryCache```以外的其他缓存提供商,确保你已经添加提供商到你的包了

```
import Vapor
import <package>Provider

let config = try Config()
try config.addProvider(<package>Provider.Provider.self)

let drop = try Droplet(config)

...

```
然后更改Droplet的配置文件

```
Config/droplet.json
```

```
{
	"cache":"<key>"
}
```