---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Config"
subtitle:   ""
date: 2017-08-07 22:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Configs/Config](https://docs.vapor.codes/2.0/configs/config/)

## 配置文件
一个应用程序的配置设置，云应用通常需要可以根据其环境进行调整的复杂设置，Vapor打算提供可以为给定的用户定制化的灵活配置交互
### 快速开始
对于Vapor的应用程序，配置文件需要放到名为Config的顶级目录，这里是一个简单的```server```配置文件的例子

```
./
├── Config/
│   ├── server.json
```

server.json的样子应该是下面这样的

```
{
    "host": "0.0.0.0",
    "port": 8080,
    "securityLayer": "none"
}
```
这就表示我们的应用程序会在主机IP为```0.0.0.0```，端口号为```8080```启动服务，这就代表访问的URL为```http://localhost:8080```
#### 自定义键
让我们添加一个自定义的键到```server.json```文件中

```
{
	"host":"0.0.0.0",
	"port": 8080,
	"securityLayer": "none"	,
	"custom-key":"custom-value"
}
```
这些键值可以在你的应用程序中用以下的代码获取到
```
let customValue = drop.config["server","custom-key"]?.string ?? "default"
```
就是这样，自由地去添加和必要的利用这些键来让你的应用程序配置更加简单
### 配置语法
用下面这个配置语法你可以获取Config目录```app.config[fileName,path,to,key]```，举个例子，假设除了```server.json```前面提到的文件之外，还有一个```key.json```如下所示的文件

```
{ 
  “test-names” ： [ 
    “joe” ，
    “jane” ，
    “sara” 
  ]，
  “mongo” ： { 
    “url”  ： “www.customMongoUrl.com” 
  } 
}
```
我们要确保第一个参数是keys才能获取到文件

```
let name = drop.config["keys", "test-names", 0]?.string ?? "default"
```
或者我们的mango url

```
let mongoUrl = drop.config["keys", "mongo", "url"]?.string ?? "default"
```
### 高级配置
有一个默认的```server.json```文件就可以了，但是如果需要复杂的使用场景呢？举个例子，如果你在开发环境和生产环境有不同的主机地址，这些复杂的场景设置可以通过增加额外的目录到```Config/```目录，下面是一个为了设置开发和生产环境的文件目录的例子

```
WorkingDirectory/
├── Config/
│   ├── servers.json
│   ├── production/
│   │   └── servers.json
│   ├── development/
│   │   └── servers.json
│   └── secrets/
│       └── servers.json
```
>在命令行中用```--env=.Custome environment```来指定你的运行环境，Vapor已经提供了很少一部分默认的模式，生产环境，开发环境，测试环境。

```
vapor run --env=production
```
#### 优先级

配置文件将会在以下的优先级中获取

1.CLI(看下方)
2.Config/secret
3.Config/name-of-environment
4.Config/
这就表示，如果一个用户访问了```app.config["server","host"]```，这些键将会首先在CLI中搜索，然后是```secret/```目录，然后是默认配置的顶级目录
>```secret/```目录应该添加到.gitignore忽略文件中

#### 举个例子
让我们从下面这个JSON文件
```
server.json
```
```
{
    "host": "0.0.0.0",
    "port": 9000
}
```
```
production/server.json
```
```
{
    "host": "127.0.0.1",
    "port": "$PORT"
}
```
>这个"$NAME"语法对于所有获取环境变量的值都是可用的

请注意```server.json```和```production/server.json```都包含了同样的键```host```和```port```在应用程序中，我们将会这样访问

```
// will load 0.0.0.0 or 127.0.0.1 based on above config
let host = drop.config["server" "host"]?.string ?? "0.0.0.0"
// will load 9000, or environment variable port.
let port = drop.config["server", "port"]?.int ?? 9000
```
#### 命令行
除了嵌套在```Config/```目录中的json文件外，我们还可以使用命令行将参数传递到我们的配置文件中，默认情况下，这些值将会设置为CLI文件，当然也可以使用更复杂的选项
如果你希望将命令行设置为除CLI之外的文件，则可以使用此更高级的规范，比如下面这个CLI命令

```
--config:keys.analytics = 124ZH61F
```
可以通过以下方式在你的应用程序中访问

```
let analyticsKey = drop.config["keys", "analytics"]?.string
```