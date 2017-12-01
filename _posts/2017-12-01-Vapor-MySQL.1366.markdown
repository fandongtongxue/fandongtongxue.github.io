---
layout:     post
title:      "MySQL插入中文报错.1366问题解决办法"
subtitle:   ""
date: 2017-11-01 21:06:00.000000000 +08:00
author:     "范东"
header-img: "img/post-bg-ios9-web.jpg"
catalog:    true
tags:
    - MySQL
---

### MySQL Error .1366

```
[MySQL Error: Incorrect string value: '\xE5\x88\x9 A\xE5\x88\x9 A.. ’for column 'nickName' at row 1]  [Identifier: MySQL.MySQLError.1366  (truncatedWrongValueForField)]  [Documentation Links: https://dev.mysql.com/doc/refman/5.7/en/error-messages-client.html,
https://dev.mysql.com/doc/refman/5.7/en/error-messages-server.html]
```

### MySQL Error .1366解决办法

```
alter table app_userInfo convert to character set utf8
```
```
其中app_userinfo是报错的表名
```