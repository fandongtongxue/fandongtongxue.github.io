---
layout: post
title: iOS使用OpenCV进行图像切割你可能需要的Demo
date: 2017-03-09 18:03:07.000000000 +08:00
---

![](http://om2bks7xs.bkt.clouddn.com/2017-03-09-iOS-opencv.jpeg)
突如其来的来了一个App亮点 

在拍摄身份证图片准备上传的时候,直接裁减掉除身份证外多余的部分!
 
好吧!
 
废话不多说!
 
先看效果
![](http://om2bks7xs.bkt.clouddn.com/2017-03-09-iOS-cropidcarddemo.gif)
现在开始!

#第一步:获取图片
移动设备获取图片有两种方式
1.拍照 2.从相册中选取  如果以上你不会,那请关闭页面,去看吐槽大会(本人最近特别喜欢的综艺节目)
[吐槽大会直达链接](http://v.qq.com/detail/5/50133.html)

#第二步:操作图片
主要用到了Stackflow大神的一些代码

```
//寻找范围
void find_squares(cv::Mat& image, std::vector<std::vector<cv::Point>>&squares) {
    // blur will enhance edge detection
    cv::Mat blurred(image);
    //    medianBlur(image, blurred, 9);
    GaussianBlur(image, blurred, cvSize(11,11), 0);//change from median blur to gaussian for more accuracy of square detection
    cv::Mat gray0(blurred.size(), CV_8U), gray;
    std::vector<std::vector<cv::Point> > contours;
    // find squares in every color plane of the image
    for (int c = 0; c < 3; c++){
        int ch[] = {c, 0};
        mixChannels(&blurred, 1, &gray0, 1, ch, 1);
        // try several threshold levels
        const int threshold_level = 2;
        for (int l = 0; l < threshold_level; l++)
        {
            // Use Canny instead of zero threshold level!
            // Canny helps to catch squares with gradient shading
            if (l == 0){
                Canny(gray0, gray, 10, 20, 3); //
                //                Canny(gray0, gray, 0, 50, 5);
                 
                // Dilate helps to remove potential holes between edge segments
                dilate(gray, gray, cv::Mat(), cv::Point(-1,-1));
            }
            else{
                gray = gray0 >= (l+1) * 255 / threshold_level;
            }
            // Find contours and store them in a list
            findContours(gray, contours, CV_RETR_LIST, CV_CHAIN_APPROX_SIMPLE);
            // Test contours
            std::vector<cv::Point> approx;
            for (size_t i = 0; i < contours.size(); i++){
                // approximate contour with accuracy proportional
                // to the contour perimeter
                approxPolyDP(cv::Mat(contours[i]), approx, arcLength(cv::Mat(contours[i]), true)*0.02, true);
                // Note: absolute value of an area is used because
                // area may be positive or negative - in accordance with the
                // contour orientation
                if (approx.size() == 4 &&
                    fabs(contourArea(cv::Mat(approx))) > 1000 &&
                    isContourConvex(cv::Mat(approx))){
                    double maxCosine = 0;
                    for (int j = 2; j < 5; j++){
                        double cosine = fabs(angle(approx[j%4], approx[j-2], approx[j-1]));
                        maxCosine = MAX(maxCosine, cosine);
                    }
                    if (maxCosine < 0.3)
                        squares.push_back(approx);
                }
            }
        }
    }
}
//寻找最大范围
void find_largest_square(const std::vector<std::vector<cv::Point> >& squares, std::vector<cv::Point>& biggest_square){
    if (!squares.size()){
        // no squares detected
        return;
    }
    int max_width = 0;
    int max_height = 0;
    int max_square_idx = 0;
    for (size_t i = 0; i < squares.size(); i++){
        // Convert a set of 4 unordered Points into a meaningful cv::Rect structure.
        cv::Rect rectangle = boundingRect(cv::Mat(squares[i]));
        //        cout << "find_largest_square: #" << i << " rectangle x:" << rectangle.x << " y:" << rectangle.y << " " << rectangle.width << "x" << rectangle.height << endl;
        // Store the index position of the biggest square found
        if ((rectangle.width >= max_width) && (rectangle.height >= max_height))
        {
            max_width = rectangle.width;
            max_height = rectangle.height;
            max_square_idx = i;
        }
    }
    biggest_square = squares[max_square_idx];
}
//获取角度
double angle( cv::Point pt1, cv::Point pt2, cv::Point pt0 ) {
    double dx1 = pt1.x - pt0.x;
    double dy1 = pt1.y - pt0.y;
    double dx2 = pt2.x - pt0.x;
    double dy2 = pt2.y - pt0.y;
    return (dx1*dx2 + dy1*dy2)/sqrt((dx1*dx1 + dy1*dy1)*(dx2*dx2 + dy2*dy2) + 1e-10);
}
```
第三步:获取结果图片 
更多详细内容请查看GitHub
[https://github.com/fandongtongxue/FDOpenCVDemo](https://github.com/fandongtongxue/FDOpenCVDemo)

