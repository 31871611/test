
'''
# 列表。是可以修改的；元组不可修改
bicycles = ["trek","cannondale","redline","specialized"]

print(bicycles)
print(bicycles[0])
print(bicycles[0].title())
# 最后一个，包括-2、-3...
print(bicycles[-1])

# 修改列表元素
bicycles[0] = "ducati"
print(bicycles)

# 末尾添加
bicycles.append("end")
print(bicycles)

# 插入元素
bicycles.insert(1,"1")
print(bicycles)

# 删除元素
del bicycles[0]
print(bicycles)

# 删除末尾元素，并使用它
popped_bicycles = bicycles.pop()
print(bicycles)# 删除specialized
print(popped_bicycles)# 返回specialized
# 任何位置
popped_bicycles = bicycles.pop(2)

# 删除redline。不需要知道索引位置，只需要知道要删除的值
bicycles.remove("redline")
print(bicycles)


# 按字母排序。对列表永久性排序
bicycles.sort()
print(bicycles)
# 按字母相反的顺序排序。向sort() 方法传递参数reverse=True
bicycles.sort(reverse=True)
print(bicycles)

# sorted()对列表进行临时排序
print(sorted(bicycles))
print(sorted(bicycles,reverse=True))

# 反转。reverse()永久性修改列表排序顺序
bicycles.reverse()
print(bicycles)

# 列表长度
print(len(bicycles))

# 遍历整个列表
for val in bicycles:
    print(val)

# range()从指定的第一个值开始数，并在到达你指定的第二个值后停止
for val in range(1,5):
    #打印：1-4
    print(val)


# list()生成列表
numbers = list(range(1,5))
print(numbers)
# 指定步长
even_numbers = list(range(1,6,2))
print(even_numbers)#[1, 3, 5]


digits = [1,2,3,4,5,6,7,8,9,0]
# 最小的值
print(min(digits))
# 最大的值
print(max(digits))
# 相加的值
print(sum(digits))


# 切片
# 按0开始
# 指定索引0~3，将输出0、1、2的元素
print(bicycles[0:3])
# 输出列表2~4的元素
print(bicycles[1:4])
# 没有指定第一个索引，自动从列表开头开始
print(bicycles[:3])
# 终止于列表末尾
print(bicycles[2:])


# 复制列表
my_foods = ['pizza','falafel','carrot cake']
# 会报错，在不使用切片的情况下复制只是引用
#friend_foods = my_foods
friend_foods = my_foods[:]
'''


# 元组：不可变的列表称为元组
# 使用圆括号来标识
dimensions = (200,50)
print(dimensions)
print(dimensions[0])
#dimensions[0] = 250 #报错，不可修改
for val in dimensions:
    print(val)
# 可以给存储元组的变量赋值，如果要修改，可重新定义整个元组
dimensions = (400,10)
print(dimensions)
