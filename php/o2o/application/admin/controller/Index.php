<?php
namespace app\admin\controller;

use think\Controller;

class Index extends Controller
{
    public function index()
    {
        // return 'admin/index/index';
        return $this->fetch();
    }

    public function weblcome(){
        // return 'admin/index/weblcome';
        return '欢迎来到o2o主后台首页！';
    }
}
