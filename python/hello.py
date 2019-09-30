#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#为了让它按UTF-8编码读取，我们通常在文件开头写上这两行：

'''

print("hello")
print(100+200+200)

print('Thequickbrownfox','jumps over', 'the lazy dog')
#逗号“,”会输出一个空格


#input()，可以让用户输入字符串，并存放到一个变量里
name = input()
print(name)

'''

#字符串
#Python允许用'''...'''的格式表示多行内容

#布尔值
# 用True、False表示布尔值（请注意大小写）
# 可以用and、or和not运算。

#空值
# 用None表示。None不能理解为0，因为0是有意义的，而None是一个特殊的空值。

#常量：通常用全部大写的变量名表示常量

# /除法计算结果是浮点数，即使是两个整数恰好整除，结果也是浮点数：
# //，称为地板除，两个整数的除法仍然是整数，整数的地板除//永远是整数


'''
#ord()获取字符的整数
#chr()把编码转换为字符
print('包含中文的str')
print(ord('中'))#20013
print(chr(20013))#中
'ABC'.encode('ascii')
'中文'.encode('utf-8')
len('ABC')#3
len('中文')#2
len('中文'.encode('utf-8'))#6
'''


'''
#格式化
#%运算符就是用来格式化字符串的。在字符串内部，%s表示用字符串替换，%d表示用整数替换，有几个%?占位符，后面就跟几个变量或者值，顺序要对应好。如果只有一个%?，括号可以省略。
'Hello, %s' % 'world'
'Hi, %s, you have $%d.' % ('Michael', 1000000)
#如果你不太确定应该用什么，%s永远起作用，它会把任何数据类型转换为字符串：
'Age: %s. Gender: %s' % (25, True)
'''

'''
#列表：list
classmates = ['Michael', 'Bob', 'Tracy']
print(len(classmates))
classmates[0]
classmates[1]
classmates[-1]#最后一个
classmates[-2]#倒数第2个
classmates.append('Adam')#追加元素到末尾
classmates.insert(1, 'Jack')#把元素插入到指定的位置
classmates.pop()#删除list末尾的元素
classmates.pop(1)#删除指定位置的元素
classmates[1] = 'Sarah'#修改
L = ['Apple', 123, True]#不同元素的数据类型
s = ['python', 'java', ['asp', 'php'], 'scheme']

#元组：tuple
#但是tuple一旦初始化就不能修改
classmates = ('Michael', 'Bob', 'Tracy')
#最后来看一个“可变的”tuple：
t = ('a', 'b', ['A', 'B'])
'''

'''
#条件判断
age = 20
if age >= 18:
    print('your age is', age)
    print('adult')


age = 3
if age >= 18:
    print('your age is', age)
    print('adult')
else:#注意不要少写了冒号:
    print('your age is', age)
    print('teenager')

if <条件判断1>:
    <执行1>
elif <条件判断2>:
    <执行2>
elif <条件判断3>:
    <执行3>
else:
    <执行4>
#if语句执行有个特点，它是从上往下判断，如果在某个判断上是True，把该判断对应的语句执行后，就忽略掉剩下的elif和else

'''
#int()函数

'''
#循环
#可以直接作用于for循环的数据类型有以下几种：
#一类是集合数据类型，如list、tuple、dict、set、str等；
#一类是generator，包括生成器和带yield的generator function。

names = ['Michael', 'Bob', 'Tracy']
for name in names:
    print(name)

print(list(range(5)))#range(5)生成的序列是从0开始小于5的整数

sum = 0
n = 99
while n > 0:
    sum = sum + n
    n = n - 2
print(sum)

#break语句可以提前退出循环
#continue语句，跳过当前的这次循环，直接开始下一次循环
'''

'''
#字典：dict，在其他语言中也称为map
#使用键-值（key-value）存储
d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
d['Michael']
#in判断key是否存在
'Thomas' in d
#get()方法，如果key不存在，可以返回None
d.get('Thomas')#None
d.get('Thomas', -1)#-1
#要删除一个key，用pop(key)方法，对应的value也会从dict中删除：
d.pop('Bob')

#set
s = set([1, 2, 3])#{1, 2, 3}
#重复元素在set中自动被过滤：
s = set([1, 1, 2, 2, 3, 3])#{1, 2, 3}
#通过add(key)方法可以添加元素到set中
s.add(4)#{1, 2, 3, 4}
#通过remove(key)方法可以删除元素
s.remove(4)#{1, 2, 3}
'''

'''
#函数
help(abs)#查看abs函数的帮助信息
abs(100)
max()#可以接收任意多个参数
int('123')
float('12.34')
str(1.23)
bool(1)

#定义函数
#定义一个函数要使用def语句，依次写出函数名、括号、括号中的参数和冒号:，然后，在缩进块中编写函数体，函数的返回值用return语句返回。
def my_abs(x):
    if x >= 0:
        return x
    else:
        return -x
#如果没有return语句，函数执行完毕后也会返回结果，只是结果为None。return None可以简写为return
#如果你已经把my_abs()的函数定义保存为abstest.py文件了，那么，可以在该文件的当前目录下启动Python解释器，用from abstest import my_abs来导入my_abs()函数，注意abstest是文件名（不含.py扩展名）

#空函数
#定义一个什么事也不做的空函数，可以用pass语句
def nop():
    pass
#pass语句什么都不做，那有什么用？实际上pass可以用来作为占位符，比如现在还没想好怎么写函数的代码，就可以先放一个pass，让代码能运行起来。

'''

'''
#切片
L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']
L[0:3]#取前3个元素，从索引0开始取，直到索引3为止，但不包括索引3
L[:3]#如果第一个索引是0，还可以省略
L[-2:]#['Bob', 'Jack']
L[-2:-1]#['Bob']


#迭代
d = {'a': 1, 'b': 2, 'c': 3}
for key in d:
    print(key)

for value in d.values():
    print(value)

for k, v in d.items():
    print(k,v)#同时迭代key和value

#如何判断一个对象是可迭代对象呢？方法是通过collections模块的Iterable类型判断：
from collections import Iterable

isinstance('abc', Iterable) # str是否可迭代
isinstance([1,2,3], Iterable) # list是否可迭代
isinstance(123, Iterable) # 整数是否可迭代

#enumerate函数可以把一个list变成索引-元素
for i, value in enumerate(['A', 'B', 'C']):
    print(i, value)#0 A    1 B     2 C


#列表生成式
L = []
for x in range(1, 11):
    L.append(x * x)
#列表生成式则可以用一行语句代替循环生成上面的list
[x * x for x in range(1, 11)]

import os # 导入os模块，模块的概念后面讲到
[d for d in os.listdir('.')] # os.listdir可以列出文件和目录

d = {'x': 'A', 'y': 'B', 'z': 'C' }
[k + '=' + v for k, v in d.items()]

L = ['Hello', 'World', 'IBM', 'Apple']
[s.lower() for s in L]



#生成器
'''

'''
#高阶函数
#map()函数接收两个参数，一个是函数，一个是Iterable，map将传入的函数依次作用到序列的每个元素，并把结果作为新的Iterator返回
#reduce()把一个函数作用在一个序列[x1, x2, x3, ...]上，这个函数必须接收两个参数，reduce把结果继续和序列的下一个元素做累积计算
#filter()也接收一个函数和一个序列。和map()不同的是，filter()把传入的函数依次作用于每个元素，然后根据返回值是True还是False决定保留还是丢弃该元素。
#sorted()可以接收一个key函数来实现自定义的排序，例如按绝对值大小排序
sorted([36, 5, -12, 9, -21])#[-21, -12, 5, 9, 36]

#关键字lambda表示匿名函数

def now():
    print('2015-3-25')
f = now

#函数对象有一个__name__属性，可以拿到函数的名字
now.__name__#'now'
f.__name__#'now'

#functools.partial的作用就是，把一个函数的某些参数给固定住（也就是设置默认值），返回一个新的函数，调用这个新函数会更简单。
'''


#模块
#在Python中，一个.py文件就称之为一个模块（Module）
#选择一个顶层包名，比如mycompany，按照如下目录存放
#每一个包目录下面都会有一个__init__.py的文件，这个文件是必须存在的，否则，Python就把这个目录当成普通目录，而不是一个包。__init__.py可以是空文件，也可以有Python代码，因为__init__.py本身就是一个模块，而它的模块名就是mycompany

#_xxx和__xxx这样的函数或变量就是非公开的（private），不应该被直接引用，比如_abc，__abc等
