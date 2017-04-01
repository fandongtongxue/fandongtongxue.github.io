---
layout: post
title: 阿里云虚拟主机和二级域名你可能不知道的事！
date: 2017-02-25 16:28:57.000000000 +08:00
---

一直有做网站的这个情怀，才有了这个网站。
用主站做了一年博客，才知道可以用二级域名来做很多事情，没必要非得用主站!
然后，我就百度、百度。
终于百度到了！
在这里分享给大家！
#第一步：新建一个.htaccess文件
在网站的根目录上新建一个.htaccess文件
```
RewriteEngine on
RewriteCond %{HTTP_HOST} ^(www.)?api.fandong.me$
RewriteCond %{REQUEST_URI} !^/api/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /api/$1
RewriteCond %{HTTP_HOST} ^(www.)?api.fandong.me$
RewriteRule ^(/)?$ api/index.php [L]
```
#第二步：创建二级子目录
在网站的根目录上新建一个api目录
#第三步：主机空间绑定二级域名
![](http://om2bks7xs.bkt.clouddn.com/2016-02-26-aliyun-bind.jpg)
#第四步：二级域名绑主机空间
![](http://om2bks7xs.bkt.clouddn.com/2016-02-26-aliyun_dns.jpg)
#第五步：浏览器打开设置好的二级域名
点击链接：[http://api.fandong.me](http://api.fandong.me "http://api.fandong.me")


