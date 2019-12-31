import json

# 存储数据

'''
json.dump()
接受两个实参：要存储的数据以及可用于存储的文件对象

json.load()
'''

# 存储
numbers = [2,3,4,5,6,11,13]
filename = 'numbers.json'
with open(filename,'w') as f_obj:
    json.dump(numbers,f_obj)



# 读取
with open(filename) as f_obj:
    num = json.load(f_obj)
print(num)

