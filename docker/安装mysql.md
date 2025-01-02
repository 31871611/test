# 安装mysql

## 拉取镜像

```bash
docker pull mysql
```

## 运行MySQL

```bash
mkdir mysql
cd mysql/
mkdir data
mkdir logs

docker run -p 3306:3306 --name docker-mysql -v ~/mysql/conf:/etc/mysql/conf.d -v ~/mysql/logs:/logs -v ~/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=passwd -d --restart=always --privileged=true mysql
```

-p 3306:3306：将容器的3306端口映射到主机的3306端口
-v ~/mysql/data:/var/lib/mysql：将主机root目录下的mysql/data文件夹挂载到容器的/var/lib/mysql 下，在mysql容器中产生的数据就会保存在本机mysql/data目录下
-e MYSQL_ROOT_PASSWORD=passwd：初始化root用户的密码
-d 后台运行容器
--name 给容器指定别名
--privileged=true centos7 可能会碰到权限问题，需要加参数

 --restart=always 重启自动运行

## 进入容器

```bash
docker exec -it 容器ID /bin/bash
# 或者
docker exec -it docker-mysql /bin/bash

```

## 进入数据库查看

```bash
root@39e0abed7609:/# mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.12 MySQL Community Server - GPL

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.02 sec)
```

字符集：utf8mb4

排序规则：utf8mb4_general_ci

[node连接不上MySql服务器报错](https://blog.csdn.net/weixin_43111077/article/details/108811949)

```python
ALTER USER 'root'@'%' IDENTIFIED BY 'passwd' PASSWORD EXPIRE NEVER;

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'passwd';
```

[解决mysql出现"the table is full"的问题](https://blog.csdn.net/xmz1193184480/article/details/79261623)

[Docker 安装 MongoDB](https://www.runoob.com/docker/docker-install-mongodb.html)