---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）HTTP-Middleware"
subtitle:   ""
date: 2017-08-18 08:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/HTTP/Middle](https://docs.vapor.codes/2.0/http/middleware/)

## 中间件
中间件是任何现代Web框架的重要组成部分,它允许你在客户端和服务器之间经过时修改请求和响应.
您可以将中间件看作连接您的服务器和请求您的网络应用程序的客户端的逻辑.
### 版本中间件
例如,让我们创建一个中间件,对每个响应添加我们的API版本,中间件看起来会是这样的:

```
import HTTP

final class VersionMiddleware: Middleware {
    func respond(to request: Request, chainingTo next: Responder) throws -> Response {
        let response = try next.respond(to: request)

        response.headers["Version"] = "API v1.0"

        return response
    }
}
```
我们将这个中间件提供给我们的`Droplet`容器

```
import Vapor

let config = try Config()

config.addConfigurable(middleware: VersionMiddleware(), name: "version")

let drop = try Droplet(config)
```
>你现在可以再配置文件中启用和禁用此中间件,只需要添加`version`到您的`droplet.json`中的`middleware`数组,请查看配置文件章节

你可以想见,我们的版本中间件就在连接客户端和我们的服务器中间,访问我们的服务器每一个请求和响应都必须经过这个中间件链.
![](http://om2bks7xs.bkt.clouddn.com/2017-08-18-iOS-SwiftVaporWeb22-01.png)

#### 分解
我们一行一行的分解中间件

```
let response = try next.respond(to: request)
```
由于`VersionMiddleware`在这个例子中没有修改请求,所以我们要求下一个中间件来响应该请求,链条一直下降到`Droplet`,然后回到发送给客户端的响应.

```
response.headers["Version"] = "API v1.0"
```
然后我们定义一个包含版本的请求头的响应.

```
return response
```
返回响应,并将备份任何剩余的中间件,返回给客户端.

### 请求
中间件也可以被修改或与请求交互

```
func respond(to request: Request, chainingTo next: Responder) throws -> Response {
    guard request.cookies["token"] == "secret" else {
        throw Abort(.badRequest)
    }

    return try next.respond(to: request)
}
```
这个中间件将要求该请求的cookie具有一个`token`键值等于`secret`或其他的,请求将被终止.

### 错误
中间件是捕获程序中任意位置错误的完美地方,当您让中间件捕获错误时,您可以从路由闭包中删除大量重复的逻辑,看看下面的例子:

```
enum FooError: Error {
    case fooServiceUnavailable
}
```
假设您定义了自定义错误或您正在使用的的其中一个API`throws`,抛出的错误必须被捕获,否则最终将作为用户意外的内部服务器错误(500),最明显的解决方案就是在路由闭包中捕获错误

```
app.get("foo") { request in
    let foo: Foo
    do {
        foo = try getFooFromService()
    } catch {
        throw Abort(.badRequest)
    }

    // continue with Foo object
}
```
这个解决方案是有效的,但是如果有多个路由需要处理这个错误,他将会产生重复代码,幸运的是,这个错误可以在中间件中捕获

```
final class FooErrorMiddleware: Middleware {
    func respond(to request: Request, chainingTo next: Responder) throws -> Response {
        do {
            return try next.respond(to: request)
        } catch FooError.fooServiceUnavailable {
            throw Abort(
                .badRequest,
                reason: "Sorry, we were unable to query the Foo service."
            )
        }
    }
}
```
我们只需要添加这个中间件到我们的Droplet的配置文件中.

```
config.addConfigurable(middleware: FooErrorMiddleware(), name: "foo-error")
```
>提示
>不要忘记在`droplet.json`文件中启用中间件

现在我们的路由闭包看起来好多了,我们也不必担心代码的重复了

```
app.get("foo") { request in
    let foo = try getFooFromService()

    // continue with Foo object
}
```
### 路由组
更细致的来说,中间件可以应用于特定的路由组.

```
let authed = drop.grouped(AuthMiddleware())
authed.get("secure") { req in
    return Secrets.all().makeJSON()
}
```
添加到`authed`组的任何内容都必须通过`AuthMiddleware`.因此,我们可以假定所有访问`/secure`的流量已经被授权了,了解更多请查看[路由](http://blog.fandong.me/2017/08/12/iOS-SwiftVaporWeb11/)
### 配置
你可以使用[配置](https://docs.vapor.codes/2.0/configs/config/)文件来启用或禁用中间件,如果你有中间件,例如,仅在生产环境中运行,这将非常有用.
添加可配置的中间件,像下面这样

```
let config = try Config()

config.addConfigurable(middleware: myMiddleware, name: "my-middleware")

let drop = Droplet(config)
```
然后,在`Config/droplet.json`文件中,添加`my-middleware`到`middleware`数组中.

```
{
    ...
    "middleware": {
        ...
        "my-middleware",
        ...
    },
    ...
}
```
如果添加的中间件的名称出现在中间件阵列中,那么当应用程序启动时,它将被添加到服务器的中间件.
按照中间件中的顺序
### 手动
如果你不想使用配置文件,你也可以对中间件进行硬编码.

```
import Vapor

let versionMiddleware = VersionMiddleware()
let drop = try Droplet(middleware: [versionMiddleware])
```
### 高级
#### 扩展
中间件需要与请求/响应的扩展和存储有很好的配对关系,这个例子给你还在那时了如何根据客户端的类型为模型动态的返回HTML或JSON响应

##### 中间件
```
final class PokemonMiddleware: Middleware {
    let view: ViewProtocol
    init(_ view: ViewProtocol) {
        self.view = view
    }

    func respond(to request: Request, chainingTo next: Responder) throws -> Response {
        let response = try next.respond(to: request)

        if let pokemon = response.pokemon {
            if request.accept.prefers("html") {
                response.view = try view.make("pokemon.mustache", pokemon)
            } else {
                response.json = try pokemon.makeJSON()
            }
        }

        return response
    }
}

extension PokemonMiddleware: ConfigInitializable {
    convenience init(config: Config) throws {
        let view = try config.resolveView()
        self.init(view)
    }
}
```
##### 响应
延伸到`Response`.

```
extension Response {
    var pokemon: Pokemon? {
        get { return storage["pokemon"] as? Pokemon }
        set { storage["pokemon"] = newValue }
    }
}
```
在这个例子中,我们给响应添加一个新的属性来持有一个口袋对象,如果中间件发现了一个包含口袋对象的响应,它将动态的检查客户端是否是支持HTML的,如果客户端是一个像Safari的浏览器,支持HTML,它将会发挥一个Mustache视图,,如果客户端不支持HTML,它将会返回JSON

##### 使用方法
你的闭包现在应该看起来这样

```

import Vapor

let config = try Config()
config.addConfigurable(middleware: PokemonMiddleware.init, name: "pokemon")

let drop = try Droplet(config)

drop.get("pokemon", Pokemon.self) { request, pokemon in
    let response = Response()
    response.pokemon = pokemon
    return response
}
```
>提示
>别忘记添加`pokemon`到你的`droplet.json`的中间件数组

##### Response Representable
如果你想更进一步,你可以使`Pokemon`遵循`ResponseRepresentable`

```
import HTTP

extension Pokemon: ResponseRepresentable {
    func makeResponse() throws -> Response {
        let response = Response()
        response.pokemon = self
        return response
    }
}
```
现在你的闭包就大大简化了

```
drop.get("pokemon", Pokemon.self) { request, pokemon in
    return pokemon
}
```
中间件是非常强大的.结合扩展,它允许您添加对框架本身的功能.