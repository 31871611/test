<?php
namespace app\admin\controller;

use think\Controller;
use think\Request;
use think\Session;

class Common extends Controller
{

    public function _initialize(){
        if(!Session::get('username') || !Session::get('userid')){
            $this->error('您尚未登录系统！',url('login/index'));
        }

        $auth = new Auth();
        $request = Request::instance();
        $con = $request->controller();      // 当前控制器名称
        $action = $request->action();       // 当前方法名称
        //dump($con . '/' . $action);
        $name = $con . '/' . $action;
        $notCheck=array('index/index','admin/lists');
        if(!in_array($name,$notCheck)){
            /*
            dump($auth->check($name,session('id')));
            if($auth->check($name,session('id'))){
                $this->error('没有权限',url('index/index'));
            }
            */
        }
    }

}
