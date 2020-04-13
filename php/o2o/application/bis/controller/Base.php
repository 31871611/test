<?php
namespace app\bis\controller;

use think\Controller;

class Base extends Controller
{

    private $account;

    public function _initialize(){
        // 判定用户是否登录
        $isLogin = $this->isLogin();
        if(!$isLogin){
            return $this->redirect(url("login/index"));
        }
    }

    // 判定是否登录
    public function isLogin(){
        // 获取session
        $user = $this->getLoginUser();
        if($user && $user->id){
            return true;
        }
        return false;
    }

    public function getLoginUser(){
        if(!$this->account){
            $this->account = session('bisAccount','','bis');
        }
        return $this->account;
    }



    // 权限+前缀
    public static function aaa(){

    }

}
