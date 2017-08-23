---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）Validation-Overview"
subtitle:   ""
date: 2017-08-22 17:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/Validation/Overview](https://docs.vapor.codes/2.0/validation/overview/)
>警告
>本章节可能包含过时的内容

## 验证
Vapor提供了几种不同的方法来验证进入应用程序的数据,让我们从最常见的开始.
### 常见用法
默认情况下包含几个方便有效的验证器,您可以使用这些来验证进入应用程序的数据,或将他们组合起来并且创建自己的数据.
我们来看看最常用的验证数据的方法

```
class Employee {
    var email: Valid<Email>
    var name: Valid<Name>

    init(request: Request) throws {
        name = try request.data["name"].validated()
        email = try request.data["email"].validated()
    }
}
```
在这里,我们有一个典型的成员模型`email`和`name`,通过声明这两个属性`Valid<>`,您确保这些属性只能包含有效的数据,Swift类型检查系统将放置任何不通过验证的内容被存储.
要在某个`Valid<>`属性中存储某些东西,您必须使用`.validate的()`方法,这可用于`request.data`返回的任何数据.
`Email`是一个包含在Vapor中真正的`validator`,但是`Name`不是,我们来看看如何创建一个验证器.

```
Valid<OnlyAlphanumeric>
Valid<Email>
Valid<Unique<T>>
Valid<Matches<T>>
Valid<In<T>>
Valid<Contains<T>>
Valid<Count<T>>
```
#### 验证器和验证套件
验证器,像`Count`或者`Contains`可以有多个配置,例如:

```
let name: Valid<Count<String>> = try "Vapor".validated(by: Count.max(5))
```
这里我们验证的字符串`String`最多是5个字符长,`Valid<Count>`类型告诉我们,被验证的字符串是一定的数量,但是他并没有告诉到底这个数量是多少,被验证的字符串是小于三个字符或者超过一百万个字符.
因此,验证器他们并不想一些应用程序所希望的那样安全,但是验证套件(ValidationSuites)解决了这个问题,他们将多个验证器和验证套件组合在一起表示何种类型的数据应被视为是有效的.
#### 自定义验证器
以下是如何创建自定义`ValidationSuite`.

```
class Name: ValidationSuite {
    static func validate(input value: String) throws {
        let evaluation = OnlyAlphanumeric.self
            && Count.min(5)
            && Count.max(20)

        try evaluation.validate(input: value)
    }
}
```
你只需要实现一种方法,在这个方法中,使用其他验证器或逻辑来创建自定义验证器,这里我们定义一个`Name`只接受5到20个字母数字字符串.
现在我们可以确定任何`Valid<Name>`类型的内容遵循这些规则.
#### 组合验证器
在`Name`验证器中,你可以看到`&&`被用来组合验证器,您可以使用`&&`以及`||`来将任意验证器组合起来,正如你使用`if`语句和布尔值一样使用.
你也可以使用`!`来反转验证器.

```
let symbols = input.validated(by: !OnlyAlphanumeric.self)
```
#### 验证测试
虽然`validated() throw`是最常用的验证方法,但还有另外两种.

```
let passed = input.passes(Count.min(5))
let valid = try input.tested(Count.min(5))
```
`passes()`会返回一个布尔值来表示是否通过验证测试,如果没有用过验证,`tested()`将会抛出异常,但是不像`validated()`会返回`Valid<>`类型,`tested()`将会返回所调用项目的原始类型.
#### 验证失败
Vapor的验证中间件会自动捕获验证失败,但是你可以自己捕获或者对于某些特定失败类型自定义响应.

```
do {
    //validation here
} catch let error as ValidationErrorProtocol {
    print(error.message)
}
```