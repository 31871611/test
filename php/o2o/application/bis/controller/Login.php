<?php
namespace app\bis\controller;

use think\Controller;
use app\common\model\BisAccount as BisAccountModel;

class Login extends Controller
{

    private $bisAccountModel;

    public function _initialize(){
        $this->bisAccountModel = new BisAccountModel();
    }


    public function index()
    {
        if(request()->isPost()){
            $data = input('post.');

            $ret = $this->bisAccountModel->get(['username' => $data['username']]);

            if(!$ret || $ret->status != 1){
                $this->error("该用户不存在，获取用户未被审核通过！");
            }
            if($ret->password != md5($data['password'].$ret->code)){
                $this->error("密码不正确");
            }

            $this->bisAccountModel->updataById(["last_login_time"=>time()],$ret->id);

            // 保存用户信息 bis是作用域
            session('bisAccount',$ret,'bis');

            return $this->success("登录成功",url('index/index'));
        }
        // 获取session
        $account = session('bisAccount','','bis');
        if($account && $account->id){
            return $this->redirect(url("index/index"));
        }
        return $this->fetch();
    }


    public function logout(){
        // 清除session
        session(null,'bis');
        return $this->redirect(url("login/index"));
    }




}
