---
layout:     post
title:      "Markdown高级用法(嵌套音视频)"
subtitle:   ""
date: 2017-08-25 23:00:00.000000000 +08:00
author:     "范东"
header-img: "img/post-bg-ios9-web.jpg"
catalog:    true
tags:
    - Markdown
---
## 前言
众所周知,markdown是一个很方便的编辑器了,基本的用法
比如

### 1.标题类用法
# 标题1
## 标题2
### 标题3
#### 标题4
##### 标题5
###### 标题6

```
# 标题1
## 标题2
### 标题3
#### 标题4
##### 标题5
###### 标题6
```
### 2.插入图片或超链接
![图片描述](http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Video.jpg)

[超链接描述](http://blog.fandong.me/2017/08/25/Markdown-Advance/)

```
![图片描述](http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Video.jpg)

[超链接描述](http://blog.fandong.me/2017/08/25/Markdown-Advance/)
```
### 3.插入表格

第一列 | 第二列
------- | -------
第一行第一列 | 第一行第二列
第二行第一列 | 第二行第二列
第三行第一列 | 第三行第二列

```
第一列 | 第二列
------- | -------
第一行第一列 | 第一行第二列
第二行第一列 | 第二行第二列
第三行第一列 | 第三行第二列
```
### 4.列表

- 第一条
- 第二条

```
- 第一条
- 第二条
```
### 5.代码块
```
printf("Hello world!")
```
![代码块](http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Code.png)

### 6.引用
>引用

```
>引用
```

### 7.Markdown嵌套视频(厉害了)
<video id="video" controls="" preload="none" poster="http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Video.jpg">
      <source id="mp4" src="http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Video.mp4" type="video/mp4">
      </video>
      
      
```
<video id="video" controls="" preload="none" poster="http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Video.jpg">
      <source id="mp4" src="http://img.blog.fandong.me/2017-08-26-Markdown-Advance-Video.mp4" type="video/mp4">
      </video>
```
### 8.Markdown嵌套音频(厉害了)
<audio id="audio" controls="" preload="none">
      <source id="mp3" src="http://![代码块](http://qiniu.cloud.fandong.me/2017-08-26-Markdown-Advance-Code.png)
/Music_iP%E8%B5%B5%E9%9C%B2%20-%20%E7%A6%BB%E6%AD%8C%20%28Live%29.mp3">
      </audio>
      
      
```
<audio id="audio" controls="" preload="none">
      <source id="mp3" src="http://qiniu.cloud.fandong.me/Music_iP%E8%B5%B5%E9%9C%B2%20-%20%E7%A6%BB%E6%AD%8C%20%28Live%29.mp3">
      </audio>
```
### 9.想在别的地方让别人给你的仓库Star的美好方式(厉害了)
#### 参数

参数 | 必传 | 类型 | 备注 
------- | ------- | ------- | -------
user | true | String | 用户名
repo | true | String | 仓库名字
type | true | String | star
count | true | String | 数量

<iframe
                        style="margin-left: 2px; margin-bottom:-5px;"
                        frameborder="0" scrolling="0" width="100px" height="20px"
                        src="https://ghbtns.com/github-btn.html?user=fandongtongxue&repo=fandongtongxue.github.io&type=star&count=true" >
                    </iframe>
                    

```
<iframe
                        style="margin-left: 2px; margin-bottom:-5px;"
                        frameborder="0" scrolling="0" width="100px" height="20px"
                        src="https://ghbtns.com/github-btn.html?user=fandongtongxue&repo=fandongtongxue.github.io&type=star&count=true" >
                    </iframe>
```
