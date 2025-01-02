```sh
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    # 定义日志格式，包含客户端和服务器的端口号
    log_format  main  '$remote_addr:$remote_port - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" '
                      'server_port=$server_port'; 

    #配置按天生成日志文件
    map $time_iso8601 $logdate {
        '~^(?<ymd>\d{4}-\d{2}-\d{2})' $ymd;
        default 'date-not-found';
    }
    #access_log  logs/access.log  main;
    access_log  /var/log/nginx/access-$logdate.log  main;
    

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

    server {
        listen       81;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   /usr/share/nginx/html/81;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

}
```

```sh
docker run -d -p 80:80 -p 81:81 --restart=always --name my-nginx -v /root/nginx/www:/usr/share/nginx/html -v /root/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /root/nginx/logs:/var/log/nginx nginx
```


### 示例

假设你的Docker容器名称是 `my-nginx`，以下是完整的命令示例：

1. **进入Docker容器**：
   ```sh
   docker exec -it my-nginx /bin/bash
   ```

2. **更改目录所有权**：
   ```sh
   chown -R nginx:nginx /var/log/nginx
   ```

3. **更改目录权限**：
   ```sh
   chmod -R 755 /var/log/nginx
   ```

4. **退出容器**：
   ```sh
   exit
   ```

5. **重新加载Nginx配置**：
   ```sh
   docker exec -it my-nginx nginx -s reload
   ```

6. **检查目录权限**：
   ```sh
   docker exec -it my-nginx ls -ld /var/log/nginx
   ```

7. **生成客户端请求**：
   ```sh
   curl http://your-server-ip/
   ```

8. **检查日志文件**：
   ```sh
   docker exec -it my-nginx ls -l /var/log/nginx
   ```

通过以上步骤，你应该能够确保Nginx有权限写入日志文件，并且能够按天生成新的 `access.log` 文件。如果有任何具体的错误信息或问题，请提供详细信息，以便进一步诊断。

---

Nginx快速入门：访问日志access.log参数详解 ｜访问日志记录自定义请求头（三）
https://juejin.cn/post/7384750303521341455

---

`tail -f` 是一个常用的Unix/Linux命令，用于实时查看文件的末尾内容。这个命令特别有用，当你需要监控日志文件或其他动态更新的文件时，可以实时看到文件的最新内容。

### 命令详解

- **`tail`**: 这个命令用于显示文件的末尾内容。
- **`-f`**: 这个选项表示“follow”，即持续读取文件的新增内容并实时显示在终端上。

### 使用示例

假设你有一个日志文件 `access.log`，你想实时查看这个文件的最新内容，可以使用以下命令：

```sh
tail -f /var/log/nginx/access.log
```

这条命令会打开 `access.log` 文件，并显示文件的最后10行内容。然后，它会继续监视文件，每当文件有新的内容追加时，这些新内容会立即显示在终端上。

### 其他常用选项

- **`-n <number>`**: 显示文件的最后 `<number>` 行。例如，`tail -n 50 file.txt` 会显示 `file.txt` 的最后50行。
- **`-F`**: 类似于 `-f`，但 `tail` 会在文件被重命名或删除后尝试重新打开文件。这对于日志轮转等情况非常有用。

### 示例

1. **查看日志文件的最后10行**：
   ```sh
   tail /var/log/nginx/access.log
   ```

2. **实时查看日志文件的最新内容**：
   ```sh
   tail -f /var/log/nginx/access.log
   ```

3. **实时查看日志文件的最新内容，并处理日志轮转**：
   ```sh
   tail -F /var/log/nginx/access.log
   ```

4. **查看日志文件的最后50行**：
   ```sh
   tail -n 50 /var/log/nginx/access.log
   ```

### 实际应用场景

- **监控Web服务器日志**：实时查看Nginx或Apache的访问日志，了解服务器的实时访问情况。
- **调试应用程序**：实时查看应用程序的日志文件，快速发现和解决问题。
- **系统管理**：监控系统日志文件，及时发现系统异常。

希望这些解释对你有帮助！如果你有任何其他问题或需要进一步的示例，请告诉我。