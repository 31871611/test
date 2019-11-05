import re
import requests
import os

urlPath = "https://www.jisuysw.com/"
getPwd = os.getcwd()#查看当前所在路径


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
  
        #print(path+' 创建成功')
        return True
    else:
        # 如果目录存在则不创建，并提示目录已存在
        #print(path+' 目录已存在')
        return False
# 调用函数（定义要创建的目录）
#mkdir("d:\\qttc\\web\\")


# 下载文件
# 1.文件url
# 2.保存文件夹路径
def downFile(url,filePath):
    res = requests.get(url)
    with open(filePath,'wb') as file_url:
        # 下载保存文件
        file_url.write(res.content)
    file_url.close()
    return res


# 拼合join背景图片完整路径
def joinObjPath(cssPath,num):
    arr = cssPath.split('/')
    arr2 = arr[:-num]
    return "/".join(arr2)


# 提取背景图片路径
def getObjPath(path):
    # 第一个是什么格式：.（./img）、..（../img）、''（/img）、（http）、（base64）
    arr = path.split('/')
    cout = 0
    ret = []
    for value in arr:
        if value == "..":
            cout = cout+1
            continue
        else:
            ret.append(value)
    url = os.path.dirname(path)
    name = os.path.basename(path)
    name = name.split('?')
    # 后缀名
    suffix = name[0].split('.')[-1]
    retPath = "/".join(ret)
    retDir = os.path.dirname(retPath)
    #(1, '../img', 'play.png', 'img', 'img/play.png','.png')
    return (cout,url,name[0],retDir,retPath,suffix)


'''--------------------------------------------------------------------------------------------------------------------------'''

# 下载html文件文件
# 结束是index.html？
downFile(urlPath,getPwd + '/' + 'index.html')


# 打开文件
with open('index.html','r', encoding='UTF-8') as file_object:
    contents = file_object.read()
    # link、样式等
    link_pattern = re.compile(r'<link.*?href=[\'\"]?([^\'\"]*)[\'\"]?.*?>')
    link_result = link_pattern.findall(contents)
    # js
    js_pattern = re.compile(r'<script.*?src=[\'\"]?([^\'\"]*)[\'\"]?.*?>')
    js_result = js_pattern.findall(contents)
    # 页面图片
    img_pattern = re.compile(r'<img.*?src=[\'\"]?([^\'\"]*)[\'\"]?')
    img_result = img_pattern.findall(contents)
    # 页面样式

#print(link_result)

# 样式文件
for link_value in link_result:
    # 判断是不是使用cdn文件
    if re.match(r'^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$',link_value) != None:  
        continue
    # 获取路径
    link_url_path = getObjPath(link_value)
    # 创建文件夹
    mkdir(getPwd + link_url_path[1])
    # 下载文件并保存文件
    link_url_res = downFile(urlPath + link_value, getPwd + link_url_path[1] + '/' + link_url_path[2])
    # 只需要样式文件
    if link_url_path[5] != 'css':
        continue
    # 样式中的背景图片、字体
    background_url = re.compile(r'url\([\"\']?([^\'|\"|\)]*)[\"\']?\)')
    background_url_path = background_url.findall(str(link_url_res.content,'utf-8'))
    for background_url_item in background_url_path:
        # 第一个是什么格式：.（./img）、..（../img）、''（/img）、（http）、（base64）
        a4 = background_url_item[0:4]
        if a4 == "data":
            continue
        background_url_arr = getObjPath(background_url_item)
        if background_url_arr[1] != '':
            background_url_join = joinObjPath(link_url_path[1],background_url_arr[0])
            # 创建文件夹
            mkdir(getPwd + background_url_join + '/' + background_url_arr[3])
            # 下载文件并保存
            downFile(urlPath + background_url_join + '/' + background_url_arr[3] + "/" + background_url_arr[2], getPwd + background_url_join + '/' + background_url_arr[3] + '/' + background_url_arr[2])
        else:
            # 如：url('iconfont.eot?t=1513950066096')
            # 下载到，就在当前目录。
            downFile(urlPath + link_url_path[1] + "/" + background_url_arr[2] , getPwd + link_url_path[1] + "/" + background_url_arr[2])


# js文件
for js_value in js_result:
    if js_value == '':
        continue
    # 判断是不是使用cdn文件
    if re.match(r'^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$',js_value) != None:  
        continue
    # 判断结尾文件格式
    if re.search(r'\.js',js_value) == None:  
        continue
    # 获取路径
    js_url_path = getObjPath(js_value)
    print(js_url_path)
    # 创建文件夹
    mkdir(getPwd + js_url_path[1])
    # 下载文件并保存文件
    js_url_res = downFile(urlPath + js_value, getPwd + js_url_path[1] + '/' + js_url_path[2])


# img文件
for img_value in img_result:
    # 判断是不是使用cdn文件
    if re.match(r'^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$',img_value) != None:  
        continue
    # 判断结尾文件格式

    # 获取路径
    img_url_path = getObjPath(img_value)
    # 创建文件夹
    mkdir(getPwd + img_url_path[1])
    # 下载文件并保存文件
    js_url_res = downFile(urlPath + img_value, getPwd + img_url_path[1] + '/' + img_url_path[2])
''''''

