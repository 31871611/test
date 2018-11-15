<?php
namespace app\api\controller;

use think\Controller;
use app\api\service\Token as TokenService;


class BaseController extends Controller{

    // 权限
    protected function checkPrimaryScope(){
        return TokenService::needPrimaryScope();
    }

    // 权限
    protected function checkExclusiveScope(){
        return TokenService::needExclusiveScope();
    }

}