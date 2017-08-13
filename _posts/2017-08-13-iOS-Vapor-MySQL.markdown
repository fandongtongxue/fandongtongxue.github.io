---
layout:     post
title:      "基于Swift的Web框架Vapor2.0之MySQL模板"
subtitle:   ""
date: 2017-08-13 08:00:00.000000000 +08:00
author:     "范东"
header-img: "img/post-bg-ios9-web.jpg"
catalog:    true
tags:
    - iOS
    - Swift
    - Web
    - Vapor
    - MySQL
---
## 前言
在[Toolbox章节](http://www.jianshu.com/p/0c336c3ca8c7)我们已经讲了Vapor的几种模板,可以点击以上链接去看.
## MySQL模板
### 创建基于API模板的Vapor项目
这篇文章我们来讲下,如何改造一个默认API模板成为一个MySQL模板

```
vapor new VaporTemplateMySQL
```
或者

```
vapor new VaporTemplateMySQL --template=api
```
都是创建基于API模板的hello项目
### 改造成MySQL模板
#### Package.swift
改完之后的文件看起来应该是这样的

```
import PackageDescription

let package = Package(
    name: "VaporTemplateMySQL",
    targets: [
        Target(name: "App"),
        Target(name: "Run", dependencies: ["App"]),
    ],
    dependencies: [
        .Package(url: "https://github.com/vapor/vapor.git", majorVersion: 2),
        //重点是把原来的fluent-provider换成下面这个
        .Package(url: "https://github.com/vapor/mysql-provider.git", majorVersion: 2)
    ],
    exclude: [
        "Config",
        "Database",
        "Localization",
        "Public",
        "Resources",
    ]
)
```
>重要!!!

>更改完Package.swift文件之后记得运行```swift package update```命令,下载最新依赖包

### Config+Setup.swift
在配置提供程序那行

```
	import FluentProvider
    /// Configure providers
    private func setupProviders() throws {
        try addProvider(FluentProvider.Provider.self)
    }
```
换成

```
	import MySQLProvider
    /// Configure providers
    private func setupProviders() throws {
        try addProvider(MySQLProvider.Provider.self)
    }
```
### Config目录的配置文件
#### fluent.json
改完应该是这样的

```
{
    "driver": "mysql"
}

```
#### mysql.json
原有Config目录下没有这个文件,你需要新建这个文件

```
{
    "hostname": "你MySQL数据库的主机地址",
    "user": "你MySQL数据库的用户名",
    "password": "你MySQL数据库的密码",
    "database": "你MySQL数据库的数据库名字"
}

```

#### Route.swift
添加引入代码

```
import MySQLProvider
```
添加以下代码获取数据库数据(仅作为示例添加,可自行书写修改)

```
	get("userinfo") { req in
            let name = req.data["name"]
            if name == nil {
                return try JSON(node: [
                    "data":"",
                    "msg" : "用户名为空",
                    "state":0
                    ])
            }
	let mysqlDriver = try self.mysql()
            
    let result = try mysqlDriver.raw("select * from users where username='" + (name?.string)! + "';")
    let userinfo = result[0]
    return try JSON(node: [
                    "data":userinfo,
                    "state":1,
                    "msg":"请求成功"
                ])
        }
```
