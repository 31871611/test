# 模块是扩展名为.py的文件
import pizza
pizza.make_pizz(35)


# 导入特定的函数
from module_name import function_name


# 函数

'''
# 使用关键字def来定义一个函数
def greet_user(username):
    print(username.title())

greet_user("jesse")
# 在代码greet_user("jesse")中，值'jesse'是一个实参
# greet_user(username)，username是形参


# 关键字实参：传递给函数的是名称=值对
def describe_pet(animal_type,pet_name):
    print(animal_type + "&" + pet_name)
describe_pet(animal_type="type",pet_name="name")
describe_pet(pet_name="name",animal_type="type")


# 默认值
def describe_pet2(animal_type,pet_name='ddd'):
    print(animal_type + "&" + pet_name)


# 传递列表
def greet_user2(names):
    for name in names:
        print(name)
username = ['hannah','ty','margot']
greet_user2(username)


# 将列表副本传递给函数
greet_user2(username[:])


# 传递任意数量的实参，打印成元组
def make_pizza(*toppings):
    print(toppings)
make_pizza('pepperoni')
make_pizza('mushrooms','green peppers','extra cheese')

'''



