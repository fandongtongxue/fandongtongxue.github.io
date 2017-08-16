---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）HTTP-Request"
subtitle:   ""
date: 2017-08-16 09:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/HTTP/Request](https://docs.vapor.codes/2.0/http/request/)

## 请求

`HTTP`库中最常用的交互部分就是`Request`类型,这里有一些这种类型中最常用的属性.

```
public var method: Method
public var uri: URI
public var parameters: Node
public var headers: [HeaderKey: String]
public var body: Body
public var data: Content
```
### 方法
HTTP中与请求有关的请求,即:`GET`,`POST`,`PUT`,`PATCH`,`DELETE`.
### URI
与请求关联的URI,我们将使用它来访问请求发送的属性
举个例子,给定以下URI:`http://vapor.codes/example?query=hi#fragments-too`

```
let scheme = request.uri.scheme //http
let host = request.uri.host //Vapor.codes
let path = request.uri.path //example
let query = request.uri.query //query=hi
let fragment = request.uri.fragment // fragments-too
```
### 路由参数

与请求关联的url参数,举个例子,如果我们有一个注册的路径`hello/:name/age/:age`,我们将能够访问请求中的参数.像这样

```
let name = request.parameters["name"] //String
let age = request.parameters["age"]?.int //Int
```
或者,为了自动抛出`nil`或无效的变量,你也可以`extract`

```
let name = try request.parameters.extract("name") as String
let age = try request.parameters.extract("age") as Int
```
这些提取方法可以转换为任何`NodeInitializable`类型,包括您自己的自定义类型.确保查看[节点](https://github.com/vapor/node)了解更多信息
>注意:Vapor还在我们的文档部分提供了类型安全的路由

### Headers(请求头)
这些事与请求相关联的请求头,如果你正在准备外发一个请求,可以使用它来添加自己的密钥.

```
let contentType = request.headers["Content-Type"]  
```
或者对于外发请求

```
let request = Request ...
request.headers["Content-Type"] = "application/json"
request.headers["Authorization"] = ... my auth token
```
#### 扩展头
我们通常会尽可能的删除字符串类型的代码来改进代码库,我们可以使用通用扩展像请求头中添加变量

```
extension HTTP.KeyAccessible where Key == HeaderKey, Value == String {
    var customKey: String? {
      get {
        return self["Custom-Key"]
      }
      set {
        self["Custom-Key"] = newValue
      }
    }
}
```
这种模式的实现,我们的字符串`Custom-Key`已经被包含在我们代码的一个部分中,我们现在可以这样访问

```
let customKey = request.headers.customKey

// or

let request = ...
request.headers.customKey = "my custom value"
```
### 请求体
这是与请求相关联的主体,并且表示通用数据有效载荷,你可以在相关联的[文档](https://docs.vapor.codes/2.0/http/body/)中查看有关正文的更多信息
对于传入的请求,我们经常这样来拉出相关的字节

```
let rawBytes = request.body.bytes
```
## Content(内容)
通常,当我们发送或者接收请求时,我们正在用其作为传输内容的方式吧,为此,Vapor提供了一个方便的`data`变量,这个变量关联的请求要求以一致的方式对内容进行有限排序.
举个例子,我收到一个请求`http://vapor.codes?hello=world`

```
let world = request.data["hello"]?.string
```
如果我收到一个JSON请求,这个相同的代码也会起作用,例如

```
{
  "hello": "world"
}
```
仍然可以通过```data```访问

```
let world = request.data["hello"]?.string
```
>注意:不应该使用强制展开
这也适用于多部分请求,甚至可以通过中间件扩展到新的类型,如XML或者YAML
如果你想要更明确的的访问给定的类型,那是好的,`data`变量就是纯粹为那些想这样做的人提供方便的.
## JSON
想要根据给定的请求直接访问JSON,请使用

```
let json = request.json["hello"]
```
## 查询参数
同样也是为了查询方便

```
let query = request.query?["hello"]  // String?
let name = request.query?["name"]?.string // String?
let age = request.query?["age"]?.int // Int?
let rating = request.query?["rating"]?.double // Double?
```
## 关键路径
关键路径适用于可以进行嵌套值对象的Vapor类型,这里有几个例子,展示如歌访问给定的json

```
{
  "metadata": "some metadata",
  "artists" : {
    "href": "http://someurl.com",
    "items": [
      {
        "name": "Van Gogh",
      },
      {
        "name": "Mozart"
      }
    ]
  }
}
```
我们可以通过以下方式访问数据
### 元数据
访问顶级值

```
let type = request.data["metadata"].string // "some metadata"
```
### 项
访问嵌套值

```
let items = request.data["artists", "items"] // [["name": "Van Gogh"], ["name": "Mozart"]]
```
### 混合数组和对象
获得第一批艺术家

```
let first = request.data["artists", "items", 0] // ["name": "Van Gogh"]
```
数组各项
从数组项中获取密钥

```
let firstName = request.data["artists", "items", 0, "name"] // "Van Gogh"
```
数组解析
我们也可以巧妙的映射一系列键,例如,只需获得所有艺术家的名字,我们可以使用

```
let names = request.data["artists", "items", "name"] // ["Van Gogh", "Mozart"]
```