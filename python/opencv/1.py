
#读取图片中某像素点颜色



im2 = cv2.imread("1.png")
print(im2[4,7])

'''
打印显示方式：[b g r]
第一个黑色在第2排第3个，[1,2]，[0,0,0]
第一个蓝色在第2排第7个，[1,6]，[255,0,0]
第二个黑色在第4排第5个，[3,4]，[0,0,0]
第一个黄色在第5排第8个，[4,7]，[0,255,255]
以些类推
'''

