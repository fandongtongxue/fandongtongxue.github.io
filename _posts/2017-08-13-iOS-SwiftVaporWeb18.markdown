---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）JWT-Overview"
subtitle:   ""
date: 2017-08-13 20:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/JWT/Overview](https://docs.vapor.codes/2.0/jwt/overview/)

## JWT概述
这份指导提供了使用JWT提供程序包的概述

### 配置

```JWTProvider```可以通过三种方式来初始化

* 定制的自定义签名者```jwt.json```
* 支持(私有/公共)```hmac``` ```rsa``` ```esdca```
* 传统的自定义签名者定义```jwt.json```
* 支持(私有/公共)```hmac``` ```rsa``` ```esdca```
* 远程```jwt.json```远程文件链接
* 支持(私有/公共)```rsa```

如果你的Vapor应用程序作为身份验证程序,您可能需要使用```Legacy custom signer```安装程序或```Custom signers```设置,如果要执行证书更换,那这应该是比较好的.
唯一的区别是```JWT```头中```Custom signers```的```kid```值不被忽略,并且它必须与相关联的签名者匹配才能验证签名.
如果你的Vapor应用程序是将认证委托给第三方(auth0,stormpath等)的资源提供者,则可能需要使用```Remote JSON Web Key Set```设置,在此配置中,JWT令牌由提供JSONWeb密钥集格式的第三方生成,Vapor仅负责验证```JWT```使用第三方提供的密钥集.

#### 远程JSON Web密钥集

```
Config/jwt.json
```

```
{
	"jwks-url" : "http://my-domain.com/well-known/jwks.json"
}
```
#### 自定义签名者
这允许指定一组签名者,特别适用于替换证书,自定义签名者不能向后兼容,并且必须在配置中指定一个附加的```kid```值

* type:```unsigned```,```hmac```,```esdca```
* kid:一个唯一的标识符
* algorithm
* type[hmac]:hs256,hs384,hs512
* type[rsa]:rs256,rs384,rs512
* type[esdca]:es256,es384,es512


```
Config/jwt.json
```
```
{
	"signers":[
	{
		"type":"rsa",
		"kid":"1234",
		"algorithm":"rs256",
		"key":"yourkeyhere"
	}
	]
}
```

#### 传统自定义签名者
这和以前的实现向后兼容

* type:```unsigned```,```hmac```,```esdca```
* algorithm
* type[hmac]:hs256,hs384,hs512
* type[rsa]:rs256,rs384,rs512
* type[esdca]:es256,es384,es512


```
Config/jwt.json
```

```
{ 
  “signer” ： { 
    “type” ： “rsa” ，
    “algorithm” ： “rs256” ，
    “key” ： “yourkeyhere” 
  } 
}
```