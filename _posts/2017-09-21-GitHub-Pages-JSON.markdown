---
layout:     post
title:      "GitHub Pages 博客文章导出JSON供App使用方法"
subtitle:   ""
date: 2017-09-21 11:32:00.000000000 +08:00
author:     "范东"
header-img: "img/post-bg-ios9-web.jpg"
catalog:    true
tags:
    - GitHub
    - GitHub.io
    - GitHub Pages
---

## 前言
很多人在github.io上寄存了自己的博客,比如[我](http://fandongtongxue.github.io)

同时还有这么一小撮人,想在App展示博客文章的列表,比如[我](http://fandongtongxue.github.io)

那么问题来了,如何使用GitHub生成的文章列表生成可用于App上呢,这里使用了常用的JSON数据额格式

### 第一步
在根目录创建.json格式文件
比如getArticleList.json

### 第二步
开始书写代码

因为我的文章头部一般都写这几个参数

```
---
layout:     post
title:      "GitHub Pages 博客文章导出JSON供App使用方法"
subtitle:   ""
date: 2017-09-21 11:32:00.000000000 +08:00
author:     "范东"
header-img: "img/post-bg-ios9-web.jpg"
catalog:    true
tags:
    - GitHub
    - GitHub.io
    - GitHub Pages
---
```

所以我们获取字段的时候一般也就获取这些字段


```
---
layout: nil
---

[{% for post in site.posts limit:1000 %}
    {
        "title":"{{post.title}}",
        "url":"{{site.url}}{{post.url}}",
        "date":"{{post.date|date_to_string}}",
        "author":"{{post.author}}",
        "header-img":"{{post.header-img}}",
        "subtitle":"{{post.subtitle}}",
        "tags":"{{post.tags}}",
        "catalog":"{{post.catalog}}"
    }{% if forloop.last == false %},{% endif %}
{% endfor %}
]
```

### 第三步
上传getArticleList.json到你github.io的仓库地址

### 第四步
验证

点击如下链接

[http://fandongtongxue.github.io/getArticleList.json](http://fandongtongxue.github.io/getArticleList.json)

### 第五步: 大功告成