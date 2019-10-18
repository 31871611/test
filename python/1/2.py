'''
# 字符串
name = "ada lovelace"
# 首字母转大写
print(name.title())
# 转大写
print(name.upper())
# 转小写
print(name.lower())

# 拼接字符串
first_name = "ada"
last_name = "lovelace"
full_name = first_name + last_name + "!"
print(full_name)

# \t制表符.tab键
print("\tPython1")
# \n换行符
print("\nPython2")
print("\t\nPython3")

# 去除头尾的空白
favorite_language = "  python  "
#favorite_language = favorite_language.rstrip()
# 去除头部空白
favorite_language = favorite_language.lstrip()
# 去除尾部空白
favorite_language = favorite_language.strip()
print(favorite_language)


# 整数：可对整数执行加（+）、减（-）、乘（*）、除（/）运算、%（求模运算符）
# 两个乘号表示乘方运行
print(3 ** 2)#9

print(4%3) #余1
print(5%3) #余2
print(3%3) #0

# 浮点数
print(0.2 +0.1)#0.30000000000000004


age = 23
#print("happy" + age + "rd birthday")#会报错age是int需要转成字符串
# str()转字符串
print("happy" + str(age) + "rd birthday")

'''

