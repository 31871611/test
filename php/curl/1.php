<?php
header("Content-type:text/html;charset=utf-8");

//$content = file_get_contents("http://192.168.1.2/jzf2/html/clearing.html");
//echo $content;

function httpCurl($url,$type='get',$res='json',$arr=''){
    /************** 1. 初始化curl句柄 **************/
    $ch = curl_init();
    /************** 2. 设置curl的参数 **************/
    // 设置URL
    curl_setopt($ch, CURLOPT_URL, $url);
    // 设置为false会直接输出内容到页面（如echo）;true需要一个$res变量接收
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    //模拟来路(源)
    curl_setopt($ch, CURLOPT_REFERER, 'http://www.baidu.com/');
    $user_agent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36";
    //curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
    // 跳过ssl检查项
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    // 启用时会将头文件的信息作为数据流输出
    //curl_setopt($ch, CURLOPT_HEADER, 5);
    // 设置post与参数
    if($type == 'post'){
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $arr);
    }
    /************** 3. 执行并获取HTML文档内容 **************/
    $output = curl_exec($ch);
    //获取这一请求的有关信息
    $info = curl_getinfo($ch);
    echo '获取'. $info['url'] . '耗时'. $info['total_time'] . '秒';
    //检查错误
    if ($output === FALSE) {
        echo "cURL Error: " . curl_error($ch);
    }
    /************** 4. 释放curl句柄 **************/
    curl_close($ch);
    /************** 5. 输出 **************/
    if($res == 'json'){
        return json_decode($output,true);
    }
    return $output;
}

//echo output
echo httpCurl("http://www.baidu.com","get",'html');




/*
curl_getinfo()，返回的数组中包括了以下信息
    "url"                       //资源网络地址
    "content_type"              //内容编码
    "http_code"                 //HTTP状态码
    "header_size"               //header的大小
    "request_size"              //请求的大小
    "filetime"                  //文件创建时间
    "ssl_verify_result"         //SSL验证结果
    "redirect_count"            //跳转技术
    "total_time"                //总耗时
    "namelookup_time"           //DNS查询耗时
    "connect_time"              //等待连接耗时
    "pretransfer_time"          //传输前准备耗时
    "size_upload"               //上传数据的大小
    "size_download"             //下载数据的大小
    "speed_download"            //下载速度
    "speed_upload"              //上传速度
    "download_content_length"   //下载内容的长度
    "upload_content_length"     //上传内容的长度
    "starttransfer_time"        //开始传输的时间
    "redirect_time"             //重定向耗时
*/

/*
第二步，通过curl_setopt方法来设置参数是最复杂也是最重要的

1、超时的相关设置
curl_setopt($ch, opt) 可以设置一些超时的设置，主要包括：
    CURLOPT_TIMEOUT 设置cURL允许执行的最长秒数。
    CURLOPT_TIMEOUT_MS 设置cURL允许执行的最长毫秒数。 (在cURL 7.16.2中被加入。从PHP 5.2.3起可使用。 )
    CURLOPT_CONNECTTIMEOUT 在发起连接前等待的时间，如果设置为0，则无限等待。
    CURLOPT_CONNECTTIMEOUT_MS 尝试连接等待的时间，以毫秒为单位。如果设置为0，则无限等待。 在cURL 7.16.2中被加入。从PHP 5.2.3开始可用。
    CURLOPT_DNS_CACHE_TIMEOUT 设置在内存中保存DNS信息的时间，默认为120秒。

    curl_setopt($ch, CURLOPT_TIMEOUT, 60);   //只需要设置一个秒的数量就可以
    curl_setopt($ch, CURLOPT_NOSIGNAL, 1);    //注意，毫秒超时一定要设置这个
    curl_setopt($ch, CURLOPT_TIMEOUT_MS, 200);  //超时毫秒，cURL 7.16.2中被加入。从PHP 5.2.3起可使用
*/


