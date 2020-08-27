#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#为了让它按UTF-8编码读取，我们通常在文件开头写上这两行：

'''

http://www.itkeyword.com/doc/5953539907335337x640/python
https://cloud.tencent.com/developer/article/1514844
https://www.jianshu.com/u/3a9c4bdfc82f

去除边框
灰度转换
二值化
去除干扰线
去噪点
高斯滤波


'''


import cv2
import numpy as np



# 转成灰度图
def setGray(img):
  img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
  return img

#二值化
def setThreshold(img,num):
    # cv2.THRESH_BINARY_INV：大于阈值部分被置为0，小于部分被置为255
    # 127(num)是设定的阈值，像素值大于127(num)被置成了0，小于127的被置成了255
    ret, im_inv = cv2.threshold(img,num,255,cv2.THRESH_BINARY_INV)
    return im_inv



#去噪


#去除干扰线

#高斯滤波




img = cv2.imread('1111.jpg')
#print(im)
image = setGray(img)
image = setThreshold(image,155)
# 显示图片
cv2.imshow('code',image)
cv2.waitKey(0)
# 保存图片
cv2.imwrite('11111234.jpg',image)


'''


# 高斯滤波器.根据情况可以不要
#gauss = cv2.GaussianBlur(im_gray, (3, 3), 1)

# 高斯模糊对图片进行降噪
kernel = 1/16*np.array([[1,2,1], [2,4,2], [1,2,1]])
im_blur = cv2.filter2D(im_inv,-1,kernel)


# 切割图片
contours, hierarchy = cv2.findContours(im_inv, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
#print(contours, hierarchy)
flag = 1
for cnt in contours:
    # 最小的外接矩形
    x, y, w, h = cv2.boundingRect(cnt)
    print((x,y,w,h))
    if x != 0 and y != 0 and w*h >= 40:
        # 保存图片
        cv2.imwrite('d://char%s.jpg'%flag, im_inv[y:y+h, x:x+w])
        flag += 1


'''