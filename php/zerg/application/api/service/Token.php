<?php
namespace app\api\service;


use app\lib\enum\ScopeEnum;
use app\lib\exception\ForbiddenException;
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


    // 需要用户和cms管理员都可以访问的权限
    public static function needPrimaryScope(){
        $scope = self::getCurrentTokenVal('scope');
        if($scope){
            if($scope >= ScopeEnum::User){
                return true;
            }else{
                throw new ForbiddenException();
            }
        }else{
            throw new TokenException();
        }
    }


    // 只有用户才能访问的接口权限
    public static function needExclusiveScope(){
        $scope = self::getCurrentTokenVal('scope');
        if($scope){
            if($scope == ScopeEnum::User){
                return true;
            }else{
                throw new ForbiddenException();
            }
        }else{
            throw new TokenException();
        }
    }

    // 提供给pay查询uid状态
    public static function isValidOperate($checkUID){
        if(!$checkUID){
            throw new Exception('检查UID时必须传入一个被检查的UID');
        }
        $currentOperateUid = self::getCurrentUid();
        if($currentOperateUid == $checkUID){
            return true;
        }
        return false;
    }


    public static function verifyToken($token){
        $exist = Cache::get($token);
        if($exist){
            return true;
        }else{
            return false;
        }
    }


}