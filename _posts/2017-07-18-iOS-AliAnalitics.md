---
layout:     post
title:      "iOS集成阿里云移动数据分析遇到的问题"
subtitle:   ""
date: 2017-07-18 12:00:00.000000000 +08:00
author:     "范东"
header-img: "img/post-bg-ios9-web.jpg"
catalog:    true
tags:
    - iOS
    - 阿里云
    - 移动数据分析
---

### 集成阿里云移动数据分析
#### 1.集成移动数据分析SDK后与支付宝SDK发生符号冲突
[https://help.aliyun.com/knowledge_detail/39075.html](https://help.aliyun.com/knowledge_detail/39075.html)

#### 2.统计页面进入事件
每个页面都需要统计,对于一个项目来说工作量不小,我们可以利用Runtime里的方法替换来完成所有页面的统计
新建类别
UIViewController+MYExtension
````
#import "UIViewController+MYExtension.h"
#import <AlicloudMobileAnalitics/ALBBMAN.h>

@implementation UIViewController (MYExtension)

- (void)my_viewWillAppear:(BOOL)animated{
    ALBBMANPageHitHelper *helper = [ALBBMANPageHitHelper getInstance];
    [helper pageAppear:self];
    [self my_viewWillAppear:animated];
}

+ (void)load{
    NSString *className = NSStringFromClass(self.class);
    MYLog(@"%@",className);
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken,^{
        Class class=[self class];
        //生成两个SEL
        SEL originalSelector = @selector(viewWillAppear:);
        SEL swizzledSelector = @selector(my_viewWillAppear:);
        //生成两个Method
        Method originalMethod = class_getInstanceMethod(class,originalSelector);
        Method swizzledMethod = class_getInstanceMethod(class,swizzledSelector);
        //对UIViewController类添加方法
        BOOL didAddMethod =
        class_addMethod(class,
                        originalSelector,
                        method_getImplementation(swizzledMethod),
                        method_getTypeEncoding(swizzledMethod));
        //如果添加成功,替换方法,否则交换方法实现
        if(didAddMethod){
            class_replaceMethod(class,
                                swizzledSelector,
                                method_getImplementation(originalMethod),
                                method_getTypeEncoding(originalMethod));
        }else{
            method_exchangeImplementations(originalMethod,swizzledMethod);
        }
    });
}
````

