---
layout:     post
title:      "基于Swift的Web框架Vapor2.0文档（翻译）HTTP-Server"
subtitle:   ""
date: 2017-08-21 22:00:00.000000000 +08:00
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
> 以下文字翻译自[Vapor Docs/HTTP/Server](https://docs.vapor.codes/2.0/http/server/)

## 服务器
服务器负责接受来自客户端的连接,解析他们的请求,并给他们发送响应
### 默认
使用默认服务器启动Droplet很简单

```
import Vapor

let drop = try Droplet()
try drop.run()
```
默认服务器将`0.0.0.0`主机绑定到`8080`端口.
### 配置文件
如果你正在使用`Config/server.json`文件,那么你可以轻松地更改你的主机和端口

```
{
    "port": "$PORT:8080",
    "host": "0.0.0.0",
    "securityLayer": "none"
}
```
以上就是`server.json`的默认形式,端口试图解决环境变量`$PORT`或者回退到`8080`.

### TLS
TLS(以前成为SSL)可以配置各种不同的证书和签名类型.
### 验证
可以禁用主机和证书的验证,默认情况下它们是启用的.
>注意:禁用这些选项时请格外小心

```
"tls": {
    "verifyHost": false,
    "verifyCertificates": false
}
```
#### 证书
##### 无证书

```
"tls": {
    "certificates": "none"
}
```
##### 链

```
"tls": {
    "certificates": "chain",
    "chainFile": "/path/to/chainfile"
}
```
##### 文件

```
"tls": {
    "certificates": "files",
    "certificateFile": "/path/to/cert.pem",
    "privateKeyFile": "/path/to/key.pem"
}
```
##### 认证机构

```
"tls": {
    "certificates": "ca"
}
```
#### 签名
##### 自己签名

```
"tls": {
    "signature": "selfSigned"
}
```
##### 文件签名

```
"tls": {
    "signature": "signedFile",
    "caCertificateFile": "/path/to/file"
}
```
##### 目录签名

```
"tls": {
    "signature": "signedDirectory",
    "caCertificateDirectory": "/path/to/dir"
}
```
### 示例
以下是使用自己签名签名和主机冗余设置为真的证书文件的`server.json`文件的示例.

```
{
    "port": "8443",
    "host": "0.0.0.0",
    "securityLayer": "tls",
    "tls": {
        "verifyHost": true,
        "certificates": "files",
        "certificateFile": "/vapor/certs/cert.pem",
        "privateKeyFile": "/vapor/certs/key.pem",
        "signature": "selfSigned"
    }
}
```
### Nginx
强烈建议您在生产环境中运行您的Vapor项目时依托于Nginx,在[部署Nginx](http://www.jianshu.com/p/e211efa92785)章节中了解更多.