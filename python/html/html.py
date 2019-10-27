import re
import requests
import os

urlPath = "http://157.demo.mytheme.cn/"
getPwd = os.getcwd()#查看当前所在路径



'''
# 下载文件
url="http://157.demo.mytheme.cn/"
path="index.html"
res_url=requests.get(url)
with open(path,"wb") as file_url:
    # 保存文件
    file_url.write(res_url.content)
    # 打开文件
f.close()
'''

# 打开文件
with open('index.html','r', encoding='UTF-8') as file_object:
    contents = file_object.read()
    # link、样式等
    link_pattern = re.compile(r'<link.+>')
    link_result = link_pattern.findall(contents)
    # js
    js_pattern = re.compile(r'<script.+></script>')
    js_result = js_pattern.findall(contents)
    # 页面样式

#print(link_result)
#print(js_result)
for link_value in link_result:
    link_url = re.search(r'href=\"(.+?)\"', link_value).group()[6:-1]
    # 获取路径，创建文件夹
    link_url_path = os.path.dirname(link_url)
    pathDir = getPwd + link_url_path
    #mkdir(pathDir)
    # 获取文件名
    link_url_file = os.path.basename(link_url)
    # 分割123.css?v=1
    link_url_file_arr = re.split(r'\?',link_url_file)
    # 下载
    link_url_file_res = requests.get(urlPath + link_url)
    with open(pathDir + link_url_file_arr[0],'wb') as file_url2:
        file_url2.write(link_url_file_res.content)

    
    


'''
# 读取css里的背景图片
path = 'C:\\Users\\Administrator\\Downloads\\157.demo.mytheme.cn\\templets\\mytheme\\statics\\css\\mytheme-font.css'

with open(path,'r', encoding='UTF-8') as file_object:
    contents = file_object.read()
    pattern = re.compile(r'url(\([^\)]*\))')
    result1 = pattern.findall(contents)
    for item in result1:
        print(item[1:-1])

'''

# 创建目录
def mkdir(path):
    # 引入模块
    import os
  
    # 去除首位空格
    path=path.strip()
    # 去除尾部 \ 符号
    path=path.rstrip("\\")
  
    # 判断路径是否存在
    # 存在     True
    # 不存在   False
    isExists=os.path.exists(path)
  
    # 判断结果
    if not isExists:
        # 如果不存在则创建目录
        # 创建目录操作函数
        os.makedirs(path)
  
        print(path+' 创建成功')
        return True
    else:
        # 如果目录存在则不创建，并提示目录已存在
        print(path+' 目录已存在')
        return False


# 调用函数（定义要创建的目录）
#mkdir("d:\\qttc\\web\\")






#https://blog.csdn.net/weixin_44662612/article/details/89407625
