from PIL import Image,ImageFilter

# 打开一个jpg图像文件，注意是当前路径:
im = Image.open("test.jpg")
print(im)
# 获得图像尺寸:
w, h = im.size
# 缩放到50%:
im.thumbnail((w//2, h//2))
print(w//2, h//2)
# 把缩放后的图像用jpeg格式保存:
im.save('thumbnail.jpg', 'jpeg')

#其他功能如切片、旋转、滤镜、输出文字、调色板等一应俱全。

# 应用模糊滤镜:
im2 = im.filter(ImageFilter.BLUR)
im2.save('blur.jpg', 'jpeg')