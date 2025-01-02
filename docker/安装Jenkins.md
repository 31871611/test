# 安装Jenkins

1.启动docker，下载Jenkins镜像文件

```python
docker pull jenkins/jenkins
```

2.创建Jenkins挂载目录并授权权限（在服务器上先创建一个jenkins工作目录 /var/jenkins_mount，赋予相应权限，稍后我们将jenkins容器目录挂载到这个目录上，这样我们就可以很方便地对容器内的配置文件进行修改。 如果我们不这样做，那么如果需要修改容器配置文件，将会有点麻烦，因为虽然我们可以使用docker exec -it --user root 容器id /bin/bash 命令进入容器目录，但是连简单的 vi命令都不能使用）

```python
mkdir -p /var/jenkins_mount

chmod 777 /var/jenkins_mount
```

3.创建并启动Jenkins容器

**-d 后台运行镜像**

**-p 10240:8080 将镜像的8080端口映射到服务器的10240端口。**

**-p 10241:50000 将镜像的50000端口映射到服务器的10241端口**

**-v /var/jenkins_mount:/var/jenkins_mount /var/jenkins_home目录为容器jenkins工作目录，我们将硬盘上的一个目录挂载到这个位置，方便后续更新镜像后继续使用原来的工作目录。这里我们设置的就是上面我们创建的 /var/jenkins_mount目录**

**-v /etc/localtime:/etc/localtime让容器使用和服务器同样的时间设置。**

**--name myjenkins 给容器起一个别名**

```python
docker run -d -p 10240:8080 -p 10241:50000 -v /var/jenkins_mount:/var/jenkins_home -v /etc/localtime:/etc/localtime --name myjenkins jenkins/jenkins

```

4.查看jenkins是否启动成功，如下图出现端口号，就为启动成功了

```python
docker ps -l
```