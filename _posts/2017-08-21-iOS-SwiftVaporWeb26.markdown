---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）HTTP-Client"
subtitle:   ""
date: 2017-08-21 21:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/HTTP/Client](https://docs.vapor.codes/2.0/http/client/)

## 客户端
`HTTP`提供的客户端用于向远程服务器发出请求,我们来看看一个简单的外发请求.
### 快速开始
让我们进入一个简单的HTTP请求,这是一个使用Vapor`Droplet`的基础`GET`请求.

```
let query = "..."
let res = try drop.client.get("https://api.spotify.com/v1/search?type=artist&q=\(query)")
print(res)
```
#### 清理
上面的URL可读性较差,让我们用query参数来使它简化一点

```
let res = try drop.client.get("https://api.spotify.com/v1/search", query: [
    "type": "artist", 
    "q": query
])
```
#### 继续
除了`GET`请求外,Vapor客户端还支持大多数常用的HTTP功能,`GET`,`POST`,`PUT`,`PATCH`,`DELETE`
#### 请求头
你还可以向请求中添加额外的请求头信息

```
try drop.client.get("http://some-endpoint/json", headers: [
    "API-Key": "vapor123"
])
```
#### 自定义请求
你可以要求客户端对你创建的任意`Request`响应,如果您需要将JSON或者URLEncoded数据添加到请求中,这很有用.

```
let req = Request(method: .post, uri: "http://some-endpoint")
req.formURLEncoded = Node(node: [
    "email": "mymail@vapor.codes"
])

try drop.client.respond(to: req)
```
### 可用的
到目前为止,我们一直在使用`drop.client`它就是一个`客户端工厂`,这为每个请求创建一个新的客户端和TCP连接
为了获得更好的性能,你可以创建一个可以重复使用的单个客户端.

```
let pokemonClient = try drop.client.makeClient(
    scheme: "http", 
    host: "pokeapi.co",
    securityLayer: .none
)

for i in 0...1 {
    let response = try pokemonClient.get("/api/v2/pokemon/", query: [
        "limit": 20, 
        "offset": i
    ])
    print("response: \(response)")
}
```
>笔记
>使用`.makeClient`进行初始化后使用的客户端无法连接到不同的服务器(代理服务器是个例外)

### 代理
`drop.client`可被配置为默认使用代理

```
Config/client.json
```

```
{
    "proxy": {
        "hostname": "google.com", 
        "port": 80,
        "securityLayer": "none"
    }
}
```
对于以上的例子,发送到`drop.client.get(...)`的请求都将通过google.com代理.