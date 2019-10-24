# 模块是扩展名为.py的文件

# import pizza让python打开文件pizza.py，并将其中的所有函数都复制到这个程序中，python在幕后复制这些代码
import pizza
# 调用方式
pizza.make_pizz(35)


# 导入特定的函数
from module_name import function_name
# 用逗号分隔函数名，可根据需要从模块中导入任意数量的函数
from module_name import function_0,function_1,function_2


# 若使用这种语法，调用函数时就无需使用句点
from pizza import make_pizz
make_pizz(15)

# 使用as给函数指定别名
from pizza import make_pizz as mp
mp(15)

# 使用as给模块指定别名
import pizza as p
p.make_pizz(35)

# 最佳的做法是，要么只导入你需要使用的函数，要么导入整个模块并使用句点表示法






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



