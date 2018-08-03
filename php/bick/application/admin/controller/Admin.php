<?php
namespace app\admin\controller;

//use think\Controller;
use think\Loader;
use think\Request;
use think\Db;

use app\admin\model\Admin as AdminModel;
use app\admin\model\AuthGroup as AuthGroupModel;
use app\admin\model\AuthGroupAccess as AuthGroupAccessModel;
use app\admin\controller\Common;
use think\Session;
use think\Validate;

class Admin extends Common
{

    // 读取列表
    public function lists()
    {
        /*
        $list = [];
        $admin = new AdminModel();
        //$res = $admin->limit(10)->select();
        $res = $admin::all(function($query){
            $query->limit(10);
        });
        foreach($res as $key =>$val){
            $list[$key] = $val->toArray();
        }
        //dump($list);
        */

        $admin = new AdminModel();
        $list = $admin->getadmin(10);

        // 关联相关表查询用户组
        $AuthGroupModel = new AuthGroupModel();
        $AuthGroupAccessModel = new AuthGroupAccessModel();
        foreach($list as $k => $v){
            $res = $AuthGroupAccessModel->where('uid',$v['id'])->find();
            $res2 = $AuthGroupModel->where('id',$res['group_id'])->find();
            $list[$k]['groupTitle'] = $res2['title'];
        }
        return $this->fetch('list', [
            'list' => $list
        ]);
    }

    // 添加用户
    public function add(Request $request)
    {
        //$request = request();
        if($request->isPost()){

            $data = input('post.');

            /*
            // Validate 类进行独立的验证操作.也可以写在model
            $validate = new Validate([
                'name' => 'require|min:6',
                'password' => 'require|min:6'
            ]);
            if(!$validate->check($data)){
                //dump($validate->getError());
                $this->error($validate->getError());
            }
            */

            // 验证器类方式.也可以写在model
            $validate = Loader::validate('Admin');
            if(!$validate->check($data)){
                //dump($validate->getError());
                $this->error($validate->getError());
            }

            //$db = Db::name('admin');
            //$res = $db->insert($data);

            $admin = new AdminModel();
            // 是否注册
            /*
            $uniquename = model('User')->get(['username'=>$data['username']]);
            if(sizeof($uniquename)){
                $this->error('该用户名已经注册，请重新填写~~~');
            }
            */


            if($admin->addadmin($data)){
                $this->success('添加管理员成功！',url('admin/lists'));
            }else{
                $this->error('添加管理员失败！');
            }
            return false;
        }

        $authGroup = new AuthGroupModel();
        return view('',[
            'authGroup' => $authGroup->select()
        ]);
    }

    // 编辑用户
    public function edit($id)
    {

        // 获取用户名
        /**/
        $admin = Db::name("admin")->where([
            'id' => $id
        ])->field('id,name')->find();
        if(!$admin){
            $this->error('该管理员不存在！',url('admin/lists'));
        }

        // 是否编辑的提交
        if(request()->isPost()){
            //dump(input('post.'));
            $data = input('post.');

            // 验证器类方式.也可以写在model
            $validate = Loader::validate('Admin');
            // 场景验证
            if(!$validate->scene('edit')->check($data)){
                //dump($validate->getError());
                $this->error($validate->getError());
            }

            $admin = new AdminModel();
            if($admin->editadmin($data)){
                $this->success('编辑管理员成功！',url('admin/lists'));
            }else{
                $this->error('编辑管理员失败！');
            }
            return false;
        }

        $authGroup = new AuthGroupModel();
        $AuthGroupAccessModel = new AuthGroupAccessModel();
        $AuthGroupAccessRes = $AuthGroupAccessModel->where('uid',$id)->find();
        return view('',[
            'admin' => $admin,
            'authGroup' => $authGroup->select(),
            'groupAccessId' => $AuthGroupAccessRes['group_id']
        ]);
    }


    // 删除
    public function del($id){

        // 获取用户名
        $admin = Db::name("admin")->where([
            'id' => $id
        ])->field('id')->find();
        if(!$admin){
            $this->error('该管理员不存在！',url('admin/lists'));
        }

        // 是否删除
        if(request()->isGet()){
            $admin = new AdminModel();
            if($admin->deladmin($id)){
                $this->success('删除管理员成功！',url('admin/lists'));
            }else{
                $this->error('删除管理员失败！');
            }
        }
    }

    // 退出登录
    public function logout(){
        Session::clear();
        $this->success('退出成功！',url('login/index'));
    }

}
