---
layout:     post
title:      "Nginx强制使用https访问(http跳转到https)"
subtitle:   ""
date: 2017-03-29 21:02:40.000000000 +08:00
author:     "范东"
header-img: "img/post-bg-ios9-web.jpg"
catalog:    true
tags:
    - Nginx
    - HTTP
    - HTTPS
---

阿里云提供了免费的SSL证书（见下图）
![](http://om2bks7xs.bkt.clouddn.com/2017-03-29-aliyun-ca.jpg)
然后申请了SSL证书，配置好
这时候发现通过非https地址同样能访问成功，才想起忘记设置强制跳转。
方法如下

### 第一步：修改nginx安装目录下的nginx.conf

```
server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        rewrite ^(.*)$ https://fandong.studio$1 permanent;
        root         /usr/share/nginx/html;
        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
 
        location / {
        }
 
        error_page 404 /404.html;
            location = /40x.html {
       }
 
        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
       }
    }

```

我的域名是fandong.studio,所以我设置了https://fandong.studio

### 第二步：重启Nginx

```
cd /etc/nginx/
```
到安装目录

```
ps -ef|grep nginx
```
看nginx master process

```
root      5086     1  0 13:44 ?        00:00:00 nginx: master process nginx
nginx     5087  5086  0 13:44 ?        00:00:00 nginx: worker process
root      7337  7317  0 20:44 pts/0    00:00:00 grep --color=auto nginx
```
master process 5086
```
kill -QUIT 5086
```
杀掉进程

```
nginx
```
启动nginx

### 第三步：清除浏览器缓存，重新试试吧
![](http://om2bks7xs.bkt.clouddn.com/2017-03-29-aliyun-https.jpg)


