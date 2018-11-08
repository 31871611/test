<?php
namespace app\api\service;


use think\Exception;

class Token {

    public static function generateToken(){
        // 32位字符组成一组随机字符串
        $randChar = getRandChar(32);
        // 用三组字符串，进行md5加密
        $timestamp = $_SERVER['REQUEST_TIME_FLOAT'];
        // salt
        $salt = config('secure.token_salt');
        return md5($randChar . $timestamp . $salt);
    }

}