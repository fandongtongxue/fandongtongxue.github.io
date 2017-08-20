---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）HTTP-Body"
subtitle:   ""
date: 2017-08-20 12:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/HTTP/Body](https://docs.vapor.codes/2.0/http/body/)

## 请求体
`HTTP.Body`表示的是`HTTP.Message`的有效载荷,并用于传递底层数据,在这次练习中的一些例子是`JSON`,`HTML`文本或者二进制图像,我们来看一下具体实现

```
public enum Body {
    case data(Bytes)
    case chunked((ChunkStream) throws -> Void)
}
```
### 数据案例
`Data Case`是一个目前最常见的`Body`中的`HTTP.Message`.它只是一个字节数组,与这些字节数组关联的序列化协议或类型通常由`Content-Type`请求头定义,我们来看些例子
#### Application/JSON
如果我们的`Content-Type`请求头包含`application/json`,那么底层二级制数据表示序列化的JSON

```
if let contentType = req.headers["Content-Type"], contentType.contains("application/json"), let bytes = req.body.bytes {
  let json = try JSON(bytes: bytes)
  print("Got JSON: \(json)")
}
```
#### Image/PNG
如果我们的`Content-Type`包含`image/png`,则底层二进制数据表示编码的png.

```
if let contentType = req.headers["Content-Type"], contentType.contains("image/png"), let bytes = req.body.bytes {
  try database.save(image: bytes)
}
```
### 分块案例
分块案例只适用于Vapor的外发的`HTTP.Message`,传统意义上,响应者的角色是在传递之前收集整个分块编码,我们可以使用它来异步发送一个正文.

```
let body: Body = Body.chunked(sender)
return Response(status: .ok, body: body)
```
我们也可以手动实现,也可以使用Vapor的内置便利的初始化器来进行对请求体进行分块.

```
return Response(status: .ok) { chunker in
  for name in ["joe", "pam", "cheryl"] {
      sleep(1)
      try chunker.send(name)
  }

  try chunker.close()
}
```
>确保在分块离开范围之前调用`close()`

### BodyRepressentable

除了具体的`Body`类型,就像在Vapor中常见,我们也广泛的支持`BodyRepresentable`.这意味着我们通常转换的类型的对象可以互换使用,举个栗子

```
return Response(body: "Hello, World!")
```
在上面的例子中,字符串被转换成二进制,并且添加到了请求体中
>作为练习,最好使用`Hello,World!`Vapor会自动设置`Content-Type`为合适的值

我们来看看它是如何实现的:

```
public protocol BodyRepresentable {
    func makeBody() -> Body
}
```
#### 自定义
我们也可以在适用的情况下遵照我们自己的类型,假设我们有一个自定义的数据类型,`.vpr`让我们符合我们的`VPR`文件类型

```
extension VPRFile: HTTP.BodyRepresentable {
  func makeBody() -> Body {
    // collect bytes
    return .data(bytes)
  }
}
```
>你可能已经注意到,协议抛出,但是我们没有实现,这在Swift中完全有效,如果你曾经手动调用过这个方法,那你将无法抛出.

现在我们可以直接在我们的`Responses`中包含我们的`VPR`文件.

```
drop.get("files", ":file-name") { request in
  let filename = try request.parameters.extract("file-name") as String
  let file = VPRFileManager.fetch(filename)
  return Response(status: .ok, headers: ["Content-Type": "file/vpr"], body: file)
}
```
作为练习,如果我们经常重复这些过程,我们可能会让`VPRFile`直接遵循`ResponseRepresentable`

```
extension VPRFile: HTTP.ResponseRepresentable {
  func makeResponse() -> Response {
    return Response(
      status: .ok,
      headers: ["Content-Type": "file/vpr"],
      body: file
    )
  }
}
```
这是我们上面的例子

```
drop.get("files", ":file-name") { request in
  let filename = try request.parameters.extract("file-name") as String
  return VPRFileManager.fetch(filename)
}
```
我们也可以使用类型安全的路由使其更简洁:

```
drop.get("files", String.self) { request, filename in
  return VPRFileManager.fetch(filename)
}
```