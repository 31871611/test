<?php
namespace app\admin\controller;

use think\captcha\Captcha;
use think\Controller;
use think\Request;
use app\admin\model\Admin as AdminModel;

//use think\Validate;

class Login extends Controller
{
    public function index()
    {
        if(Request()->isPost()){
            $data=[
                'name' => input('post.name'),
                'password' => input('post.password'),
                'code' => input('post.code')
            ];
            /*
            if(!captcha_check($data['code'])){
                $this->error('验证码不正确！');
            }
            */
            if(!$this->check_verify($data['code'])){
                $this->error('验证码不正确！');
            }
            $admin = new AdminModel();
            $res = $admin->loginadmin($data);
            if($res){
                $this->success('登录成功！',url('index/index'));
            }else{
                $this->error('登录失败！');
            }
            return false;
        }

        return view('',[
            'data' => "这是注入数据",
            'user' => '用户名'
        ]);
    }


    // 生成验证码图片
    public function code(){
        $config = [
            // 验证码字体大小
            'fontSize' => 20,
            // 验证码位数
            'length' => 4,
            // 关闭验证码杂点
            'useNoise' => false
        ];
        $captcha = new Captcha($config);
        return $captcha->entry();
    }

    //	检测输入的验证码是否正确，$code为用户输入的验证码字符串，$id多个验证码标识
    function check_verify($code,$id	= ''){
        $captcha = new	Captcha();
        return $captcha->check($code,$id);
    }

}
