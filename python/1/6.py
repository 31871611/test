
'''
# 字典
alien_0 = {"color":"green","points":5}
print(alien_0)
print(alien_0['color'])

# 添加
alien_0['x_position'] = 0
print(alien_0)

# 修改
alien_0['color'] = "yellow"
print(alien_0)

# 删除
del alien_0['points']
'''


user_0 = {
    'username':'efermi',
    'first':'enrico',
    'last':'fermi',
    'username2':'efermi'
}
# 遍历字典
# items()返回一个键值对列表
print(user_0.items())
for key,value in user_0.items():
    print("key：" + key)
    print("value：" + value)
print(user_0.keys())
print(user_0.values())
# for key in user_0.keys():
# set()可以过滤重复的内容，返回独一无二的值
print(set(user_0.values()))
