
'''
# if语句
car = "bmw"
# 区分大小写
print(car == "bmw")
# 不相等 !=
# >（大于）、<(小于)、==（等于）、>=（大于等于）、<=（小于等于）
# and、or

# 检查特定的值是否包含在列表中
requested_toppings = ['mushrooms','onions','pineapple']
print('mushrooms' in requested_toppings)
print('pepper' in requested_toppings)

# 检查特定的值是否不包含在列表中
print('pepper' not in requested_toppings)


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