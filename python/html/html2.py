import re
import requests
import os

urlPath = "http://qxnfu.com/"
urlDown = "http://qxnfu.com/index.html?code=1000003"    #内页.实际要下载的页面
getPwd = os.getcwd() #查看当前所在路径



# 创建目录
def mkdir(path): 
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


# 提取路径
def getFilePath(path):
    # 第一个是什么格式：
    #                   './images/apple-touch-icon-precomposed.png'
    #                   '../images/apple-touch-icon-precomposed.png'
    #                   'css/swiper.4.3.3.min.css'
    #                   http://www.x.com/cdn/css.css
    #                   base64
    arr = path.split('/')
    # 文件目录：./images/、css/
    filePath = path[0:path.find(arr[-1])]
    url = os.path.dirname(path)
    # 文件名如：css.css
    name = os.path.basename(path)
    name = name.split('?')
    # 后缀名：css、js、jpg
    suffix = name[0].split('.')[-1]
    # ../../../images/、../../images/、./images/ 替换成 images/
    fPath = re.sub(r'(\.\/|\.\.\/)', "", filePath)
    # 统计路径多少层
    cout = 0
    for value in arr:
        if value == "..":
            cout = cout+1
            continue
    #
    return (filePath,fPath,name[0],suffix,url,cout)


# 验证
def verifyPathFormat(path):
    if path == '':
        return True
    a4 = path[0:4]
    if a4 == "data":
        return True
    if a4 == "http":
        return True
    if path[0:2] == "//":
        return True
    return False


# 拼合join背景图片完整路径
def joinObjPath(cssPath,num):
    cssPath = cssPath.rstrip("\/")
    arr = cssPath.split('/')
    arr2 = arr[:-num]
    return "/".join(arr2)


##############################################################################################################################


# 下载html文件文件
# 结束是index.html？
downFile(urlDown,getPwd + '/' + 'index.html')

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



# 样式文件与背景图片
for link_value in link_result:
    if verifyPathFormat(link_value):
        continue
    # 文件路径
    filePath = getFilePath(link_value)
    # 创建文件夹
    mkdir(getPwd + '/' + filePath[1])
    # 下载文件并保存文件
    # print(urlPath + filePath[1] + filePath[2],getPwd + '/' + filePath[1])
    link_url_res = downFile(urlPath + filePath[1] + filePath[2],getPwd + '/' + filePath[1] + filePath[2])
    # 准备下载样式中的背景图片，只需要样式文件
    if filePath[3] != 'css':
        continue
    # 样式中的背景图片、字体
    background_url = re.compile(r'url\([\"\']?([^\'|\"|\)]*)[\"\']?\)')
    background_url_path = background_url.findall(str(link_url_res.content,'utf-8'))
    for background_url_item in background_url_path:
        # 第一个是什么格式：.（./img）、..（../img）、''（/img）、（http）、（base64）
        if verifyPathFormat(background_url_item):
            continue
        background_url_arr = getFilePath(background_url_item)
        if background_url_arr[4] != '':
            background_url_join = joinObjPath(getPwd + '/' + filePath[1],background_url_arr[5])
            # 创建文件夹
            mkdir(background_url_join + '/' + filePath[1])
            # 下载文件并保存
            #print(urlPath + background_url_arr[1] + background_url_arr[2], background_url_join + '/' + background_url_arr[1] + background_url_arr[2])
            downFile(urlPath + background_url_arr[1] + background_url_arr[2], background_url_join + '/' + background_url_arr[1] + background_url_arr[2])
        '''
        else:
            # 如：url('iconfont.eot?t=1513950066096')
            # 下载到，就在当前目录。
            downFile(urlPath + background_url_arr[1] + background_url_arr[2] , getPwd + link_url_path[1] + "/" + background_url_arr[2])
        '''


# js文件
for js_value in js_result:
    if verifyPathFormat(js_value):
        continue
    # 判断结尾文件格式
    if re.search(r'\.js',js_value) == None:  
        continue
    # 获取路径
    js_url_path = getFilePath(js_value)
    # 创建文件夹
    mkdir(getPwd + '/' + js_url_path[1])
    # 下载文件并保存文件
    # print(urlPath + js_url_path[1] + js_url_path[2],getPwd + '/' + js_url_path[1] + js_url_path[2])
    js_url_res = downFile(urlPath + js_url_path[1] + js_url_path[2],getPwd + '/' + js_url_path[1] + js_url_path[2])


# img文件
for img_value in img_result:
    if verifyPathFormat(img_value):
        continue
    # 获取路径
    img_url_path = getFilePath(img_value)
    # 创建文件夹
    mkdir(getPwd + '/' + img_url_path[1])
    # 下载文件并保存文件
    # print(urlPath + img_url_path[1] + img_url_path[2],getPwd + '/' + img_url_path[1] + img_url_path[2])
    img_url_res = downFile(urlPath + img_url_path[1] + img_url_path[2],getPwd + '/' + img_url_path[1] + img_url_path[2])





