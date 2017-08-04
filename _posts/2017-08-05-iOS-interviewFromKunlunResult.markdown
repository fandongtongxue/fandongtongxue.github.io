---
layout:     post
title:      "iOS面试题(答案) - 来自昆仑万维"
subtitle:   ""
date: 2017-08-05 12:00:00.000000000 +08:00
author:     "范东"
header-img: "img/post-bg-ios9-web.jpg"
catalog:    true
tags:
    - iOS
    - C
    - 面试
---

### property的描述有哪些 并说明各个描述的意义
### weak在runtime中的实现
### Autorelease Pool在ARC下的使用场景
### Autorelease Pool的倾倒时机，AutoreleasePool的本身实现
### KVO在使用场景KVO在runtime中的实现
### KVC在使用场景KVC在runtime中的实现
### RunLoop在一个循环中处理了哪些内容
### C++已知类User，写出该类的构造以及，拷贝构造函数，并写出调用方式
```
class User{
	const int32_t _id;
	const std::string _name;
}
```
### C++11中，lambda捕获形式有哪些
### UIScrollView添加子视图，并为子视图打好约束后，是否需要更新scrollView的contentSize
### Category的特性，为什么能有这样的特性
### UITableView的性能优化
### UIImage是否是延迟解码的，如果是能否提早解码
### 如何在RunLoop空闲时启动特定任务