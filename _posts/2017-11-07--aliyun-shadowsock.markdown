---
layout:     post
title:      "阿里云ECS(CenterOS 7.4 64Bit)配置ShadowSocks进行科学上网"
subtitle:   ""
date: 2017-11-07 14:34:00.000000000 +08:00
author:     "范东"
header-img: "img/post-bg-ios9-web.jpg"
catalog:    true
tags:
    - ECS
    - ShadowSocks
    - Center OS
---

### 服务器配置
Center OS 7.4 64Bit

### 第一步:安装Shdowsocks服务端

#### 安装pip
```
yum install python-pip
```

#### 使用pip安装shadowsocks

```
pip install shadowsocks
```

### 第二步:配置Shdowsocks服务,并启动

```
/etc/shadowsocks.json
```

```
{
    "server":"0.0.0.0",
    "server_port":443,
    "local_address":"127.0.0.1",
    "local_port":1080,
    "password":"你的密码",
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open":false,
    "workers":5
}
```


#### ShadowSocks启动

```
ssserver -c /etc/shadowsocks.json -d start 
```

#### ShadowSocks关闭
```
ssserver -c /etc/shadowsocks.json -d stop
```

### 第三步:使用本机Shdowsocks客户端, 连接服务端上网

[Windows版本](https://github.com/shadowsocks/shadowsocks-windows/releases)
[安卓版本](https://github.com/shadowsocks/shadowsocks-android/releases)
[Mac版本](https://github.com/shadowsocks/shadowsocks-iOS/releases)
