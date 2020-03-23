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

    // 测试调用百度，根据地址来获取经续度
    public function test(){
        $res = \Map::getLngLat('北京昌平沙河地铁');
        var_dump($res);
    }

    public function map(){
        $res = \Map::staticimage('北京昌平沙河地铁');
        return $res;
        // 模版中：<img src="{:url('index/map')}" alt="">
    }

    public function weblcome(){
        // return 'admin/index/weblcome';
        return '欢迎来到o2o主后台首页！';
    }

    public function email(){
        $res = \phpmailer\Email::send('111@163.com',"标题","内容");

    }

}
