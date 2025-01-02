# Dockerfile

Dockerfile文件：它是一个文本文件，用来配置image。Docker根据该文件生成二进制的image文件。

# 创建Dockerfile文件

在一个空白目录中，建立一个文本文件，并命名为 Dockerfile

```bash
$ mkdir mynginx
$ cd mynginx
$ touch Dockerfile
```

## 编辑Dockerfile文件

```bash
FROM node:8.4
# 该 image 文件继承官方的 node image，冒号表示标签，8.4版本的node
COPY . /app
# 将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入 image 文件的/app目录
WORKDIR /app
# 指定接下来的工作路径为/app
RUN npm install --registry=https://registry.npm.taobao.org
# 在/app目录下，运行npm install命令安装依赖。注意，安装后所有的依赖，都将打包进入 image 文件
EXPOSE 3000
# 将容器3000端口暴露出来，允许外部连接这个端口
```

## 例2

```bash
# 设置基础镜像
FROM daocloud.io/library/node:latest
# 维护者信息
MAINTAINER wuming wuming@maihaoche.com
# 在容器中新建一个myDocker文件中
RUN mkdir myDocker
# 将Dockerfile所在目录中myDocker文件夹的内容加到目标容器中的myDocker文件夹中
ADD myDocker  /myDocker
# 设置工作目录
WORKDIR /myDocker
# 执行安装项目依赖包的命令
RUN npm install
# 容器启动时，执行node app.js
CMD node app.js
```

## 例3

```bash
# 从 docker hub 拉取 node.js docker 镜像
FROM node:8
# 设置镜像中的工作目录，可以与下面的命令一起使用： COPY，RUN 和 CMD
WORKDIR /app
# 将 package.json 从宿主机的 my-node-app 目录复制到了镜像中的 /app 目录
COPY package.json /app
# 在镜像中运行此命令来安装 node 包
RUN npm install
# 复制 my-node-app 目录中的所有文件到镜像中的 /app 目录
COPY . /app
# 这条命令告诉 container 要暴露一个端口号，这个端口号正是我们在 index.js 中写的那个。默认情况下，容器会忽略对它所有的请求。
EXPOSE 8081
# 容器启动时，执行node app.js
CMD node index.js
```

在 COPY 和 ADD 指令中选择的时候，可以遵循这样的原则，所有的文件复制均使用 COPY 指令，仅在需要自动解压缩的场合使用 ADD

# 排除文件

在项目的根目录下，新建一个文本文件.dockerignore，写入下面的内容。

语法与.gitignore一样

```bash
.git
node_modules
npm-debug.log
```

这三个路径要排除，不要打包进入 image 文件。

如果你没有路径要排除，这个文件可以不新建。

# 构建镜像

使用 docker build 命令进行**镜像**构建。其格式为：

```bash
docker build [选项] <上下文路径/URL/->
docker build -t nginx:v3 .
```

nginx:v3为创建的image镜像名称

.为当前路径