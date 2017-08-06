---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Hello,World"
subtitle:   ""
date: 2017-08-04 16:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Getting started/Hello,World](https://docs.vapor.codes/2.0/getting-started/hello-world/)

## Hello,World
这个章节需要你已经安装了Swift3.1以及Vapor工具箱并且确认他们正在工作
>提示
>如果你不想要使用工具箱，请移步[手动指引](https://docs.vapor.codes/2.0/getting-started/manual/)

### 新工程
让我们开始常见一个叫“Hello,World的新工程”
```
vapor new Hello --template=api
```
如果你已经使用过其他网络框架之后，你会对Vapor的目录结构很熟悉。
```Hello
├── Config
│   ├── app.json
│   ├── crypto.json
│   ├── droplet.json
│   ├── fluent.json
│   └── server.json
├── Package.pins
├── Package.swift
├── Public
├── README.md
├── Sources
│   ├── App
│   │   ├── Config+Setup.swift
│   │   ├── Controllers
│   │   │   └── PostController.swift
│   │   ├── Droplet+Setup.swift
│   │   ├── Models
│   │   │   └── Post.swift
│   │   └── Routes.swift
│   └── Run
│       └── main.swift
├── Tests
│   ├── AppTests
│   │   ├── PostControllerTests.swift
│   │   ├── RouteTests.swift
│   │   └── Utilities.swift
│   └── LinuxMain.swift
├── circle.yml
└── license```
对于我们的Hello，World工程，我们将会关注```Route.swift```文件
```
Hello
└── Sources
    └── App
        └── Routes.swift
```
>提示
>```vapor new```这个命令会创建一个包含例子和描述怎么使用这个框架的新工程，如果你愿意你也可以删除它

### 代码
#### Droplet
在Routes.swift文件中看下面这行
```
func setupRoutes() throws
```
这是所有访问我们应用程序的路由都会添加的方法
#### 路由
在```build```方法的范围内，查找以下的陈述
```
get("plaintext"){ req in
	return "Hello,world!"
}
```
这行代码创建了一个新的路由，这个路由会匹配所有的到/plaintext的GET请求
所有的路由闭包都传递一个包含所请求的URI和发送的数据等信息的[请求](https://docs.vapor.codes/2.0/http/request/)的实例
这个路由只是简单的返回了一个字符串，但是任何一个[可以表示响应](https://docs.vapor.codes/2.0/http/response-representable/)的都可以被返回，在指引的[路由章节](Routing)学习更多
>提示
>Xcode会自动完成添加外部类型信息到你的闭包的输入参数中，如果你愿意保持原有类型信息,在文件顶部添加```import HTTP```

### 编译&运行
#### Building
Swift最先进的编译器是使得Vapor变得很强大的重要部分，让我们动起来，确保你在工程的根目录，运行下面的程序进行编译
```
vapor build
```
>笔记
>```vapor build```会在后台运行```swift build```

Swift包管理器会在第一时间从git上下载相关联的依赖，接下来一起编译和链接这些依赖
当完成的时候你会看到```Building Project[Done]```
>提示
>如果你看到```unable to execute command: Killed```这条消息，你需要增加你的交换空间的大小，这只有在你运行在一个有限的内存空间的机器上才会出现

#### Release
在release模式下编译会消耗更多的时间，但是提升了体验
```
vapor build --release
```
#### Serving
运行如下命令启动这个服务
```
vapor run serve
```
你应该会看到```Server starting....```这条消息
你现在可以在浏览器访问```localhost:8080/plaintext```或者运行
```
curl localhost:8080/plaintext
```
>笔记
>指定一个端口号需要管理员权限，你可以通过运行```sudo vapor run```来获取权限，如果你决定运行在80之外的其他端口，请确保你的浏览器也按照这个端口进行访问

#### Hello,World
你应该可以在你的浏览器窗口中看到如下的输出
```
Hello,world!
```
>成功
>到现在，你喜欢上Vapor了吗？点击下面的按钮来star这个仓库帮助发扬光大

[Github](https://ghbtns.com/github-btn.html?user=vapor&repo=vapor&type=star&count=true&size=large)
#### 生产环境
在生产环境运行服务会增强他的安全性和体验
```
vapor run serve --env=production
```
再生产环境，debug消息会静默，所以错误可以通过查看日志来发现
>警告
>如果你是在```--release```flag标记下编译的，确保你也在```vapor run```的时候添加上此flag，```vapor run serve --env=production --release```

更多关于部署代码的更多信息，请移步[部署（Deploy）](https://docs.vapor.codes/2.0/deploy/nginx/)章节