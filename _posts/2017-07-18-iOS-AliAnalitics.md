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
    - Runtime
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

#define AliAnalitics [ALBBMANPageHitHelper getInstance]

@implementation UIViewController (MYExtension)

- (void)my_viewDidAppear:(BOOL)animated{
    [AliAnalitics pageAppear:self];
    [self my_viewDidAppear:animated];
}

- (void)my_viewDidDisappear:(BOOL)animated{
    [AliAnalitics pageDisAppear:self];
    [self my_viewDidDisappear:animated];
}

+ (void)load{
    NSString *className = NSStringFromClass(self.class);
    MYLog(@"%@",className);
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken,^{
        [UIViewController replaceOrExchangeMethodOriginSelector:@selector(viewDidAppear:) SwizzledSelector:@selector(my_viewDidAppear:)];
        [UIViewController replaceOrExchangeMethodOriginSelector:@selector(viewDidDisappear:) SwizzledSelector:@selector(my_viewDidDisappear:)];
    });
}

+ (void)replaceOrExchangeMethodOriginSelector:(SEL)originSelector SwizzledSelector:(SEL)swizzledSelector{
    Class class=[self class];
    
    Method originalMethod = class_getInstanceMethod(class,originSelector);
    Method swizzledMethod = class_getInstanceMethod(class,swizzledSelector);
    
    BOOL didAddMethod =
    class_addMethod(class,
                    originSelector,
                    method_getImplementation(swizzledMethod),
                    method_getTypeEncoding(swizzledMethod));
    
    if(didAddMethod){
        class_replaceMethod(class,
                            swizzledSelector,
                            method_getImplementation(originalMethod),
                            method_getTypeEncoding(originalMethod));
    }else{
        method_exchangeImplementations(originalMethod,swizzledMethod);
    }
}
````

