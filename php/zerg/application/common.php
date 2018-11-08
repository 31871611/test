<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

function curl_get($url,&$httpCode = 0){
    // 1. 初始化curl句柄
    $ch = curl_init();
    // 2. 设置curl的参数，包括URL
    curl_setopt($ch,CURLOPT_URL,$url);
    // 设置为false会直接输出内容到页面（如echo）;true需要一个$res变量接收
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    // 跳过ssl检查项
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    $file_contents = curl_exec($ch);
    $httpCode = curl_getinfo($ch,CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $file_contents;
}

// 随机字符串
function getRandChar($length = 8) {
    $array = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l","m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y","z",
        "A", "B", "C", "D","E", "F", "G", "H", "I", "J", "K", "L","M", "N", "O","P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y","Z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
    $tmpstr = "";
    $max = count($array);
    for($i = 0; $i < $length; $i++) {
        $key = rand(0,$max-1);
        $tmpstr .= $array[$key];
    }
    return $tmpstr;
}
