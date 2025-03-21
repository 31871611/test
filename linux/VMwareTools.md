# CentOS7安装VMware Tools

[https://www.cnblogs.com/roooookie/p/8473640.html](https://www.cnblogs.com/roooookie/p/8473640.html)

[https://www.cnblogs.com/keyL/p/14586169.html](https://www.cnblogs.com/keyL/p/14586169.html)

# 安装依赖包

```bash
[root@localhost ~]# yum -y install perl gcc gcc-c++ make cmake kernel kernel-headers kernel-devel net-tools
```

# 加载vmware tools 到光驱CD-ROM

点击VMware菜单栏，选择【安装VMware Tools】

# 将CD-ROM挂载到指定目录

运行ls /dev命令查看是否含有cdrom目录

创建/mnt/cdrom

将光驱目录 /dev/cdrom 挂载到 /mnt/cdrom 目录

```bash
# 创建目录
[root@localhost ~]# mkdir -p /mnt/cdrom

# 挂载目录
[root@localhost ~]# mount -t auto /dev/cdrom /mnt/cdrom
mount: /dev/sr0 is write-protected, mounting read-only
```

# 拷贝安装包到用户家目录

```bash
[root@localhost ~]# cp /mnt/cdrom/VMwareTools-10.0.5-3228253.tar.gz ~
```

# 解除挂载

```bash
[root@localhost ~]# umount /dev/cdrom
```

# 解压安装包

```bash
[root@localhost ~]# tar -zxvf VMwareTools-10.0.5-3228253.tar.gz
```

# 安装VMware Tools

```bash
# 进入到解压后源码目录
[root@localhost ~]# cd vmware-tools-distrib/

# 运行 `vmware-install.pl` 文件
[root@localhost vmware-tools-distrib]# ./vmware-install.pl
```

然后一路Enter即可

# 错误1

```bash
The path "" is not a valid path to the 3.10.0-693.el7.x86_64 kernel headers.
Would you like to change it? [yes]
```

使用命令rpm -aq | grep kernel-headers查看kernel-headers是否安装成功

```bash
[root@centos7 vmware-tools-distrib]# rpm -aq | grep kernel-headers
kernel-headers-3.10.0-1160.36.2.el7.x86_64
```

使用命令rpm -ql kernel-headers-3.10.0-1160.36.2.el7.x86_64|less查看安装目录，因安装目录太多故后面加less方便翻页查看，找到/usr/include/linux/version.h

![Untitled](Untitled.png)

当前的安装目录是/usr/include/linux/，找到version.h文件，为其创建软链接

![Untitled](Untitled%201.png)

使用命令

ln -s /usr/src/kernels/3.10.0-1160.59.1.el7.x86_64/include/generated/uapi/linux/version.h /usr/src/kernels/3.10.0-1160.59.1.el7.x86_64/include/linux/version.h

并使用命令reboot重启系统

重启后重新进入 vmware-tools-distrib 源码包目录进行再次重新安装 VMware Tools，这次没有报错直接安装成功了

# 设置-共享文件（启用）

共享目录/mnt/hgfs

创建软连接
创建的语法：ln -s是必须的，然后跟一个源文件，最后是一个当前目录的软连接名（链接文件名）。
ln -s /mnt/hgfs/dist/ vue

删除软连接
rm -rf ./vue

`ln -s /usr/local/python3/bin/python3.8 /usr/bin/python3`