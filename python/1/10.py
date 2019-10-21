
# 文件和异常


# 函数open()接受一个参数：要打开的文件名称
# 关键字with在不再需要访问文件后将其关闭
# read()读取这个文件的全部内容
# 在windows系统中，文件路径中使用反斜杠（\）而不是斜杠（/）
#path = 'pi_digits.txt'
path = 'D:\\www\\test\\python\\1\\pi_digits.txt'

'''
# 读取文件
with open(path) as file_object:
    contents = file_object.read()
    print(contents)

# 写入文件
# 参数二：读取模式（'r'）、写入模式（'w'）、附(追)加模式（'a'）
# 写入模式（'w'）会清空文件
with open(path,'w') as file_object:
    file_object.write("写入一行1\n")
    file_object.write("写入一行2\n")
'''


# 异常
try:
    print(5/0)
except ZeroDivisionError:
    print("异常处理")

# 文件异常
try:
    with open("a.txt") as f_obj:
        contents = f_obj.read()
except FileNotFoundError:
    print("找不到文件1")

try:
    with open(path) as f_obj:
        contents = f_obj.read()
except FileNotFoundError:
    print("找不到文件2")
else:
    print(contents)

try:
    with open("a.txt") as f_obj:
        contents = f_obj.read()
except FileNotFoundError:
    #pass不提示报错信息，什么都不做
    pass