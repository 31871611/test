<?php
namespace app\admin\controller;

use app\admin\controller\Common;
use think\Session;

class Index extends Common
{
    public function index()
    {
        return view('',[
            'user' => '用户名'
        ]);
    }

}
