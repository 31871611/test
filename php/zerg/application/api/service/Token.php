<?php
namespace app\api\service;


use app\lib\exception\TokenException;
use think\Cache;
use think\Exception;
use think\Request;

class Token {

    // 生成令牌
    public static function generateToken(){
        // 32位字符组成一组随机字符串
        $randChar = getRandChar(32);
        // 用三组字符串，进行md5加密
        $timestamp = $_SERVER['REQUEST_TIME_FLOAT'];
        // salt
        $salt = config('secure.token_salt');
        return md5($randChar . $timestamp . $salt);
    }

    // 获取令牌
    public static function getCurrentTokenVal($key){
        $token = Request::instance()->header('token');
        $vars = Cache::get($token);
        if(!$vars){
            throw new TokenException();
        }else{
            if(!is_array($vars)){
                $vars = json_decode($vars,true);
            }
            if(array_key_exists($key,$vars)){
                return $vars[$key];
            }else{
                throw new Exception('尝试获取的Token变量不存在');
            }
        }
    }

    // 获取uid
    public static function getCurrentUid(){
        // token
        $uid = self::getCurrentTokenVal('uid');
        return $uid;
    }

}