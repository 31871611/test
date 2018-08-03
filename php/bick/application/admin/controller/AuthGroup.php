<?php
namespace app\admin\controller;
use app\admin\model\AuthGroup as AuthGroupModel;
use app\admin\model\AuthRule as AuthRuleModel;
use app\admin\controller\Common;
use think\Db;

class AuthGroup extends Common
{

    public function lists(){
        $authGroup = new AuthGroupModel();
        $list = $authGroup->paginate(10);
        return view('list',[
            'list' => $list,
            'status' => ['关闭','开启']
        ]);
    }

    public function add(){
        if(request()->isPost()){
            $data = input('post.');
            if($data['rules']){
                // 数组转成字符串
                $data['rules'] = implode(',',$data['rules']);
            }
            $authGroup = new AuthGroupModel();
            $res = $authGroup->save($data);
            if($res){
                $this->success('新增用户组成功！',url('authGroup/lists'));
            }else{
                $this->error('新增用户组失败！');
            }
            return;
        }
        $authRule = new AuthRuleModel();
        return view('',[
            'authRule' => $authRule->authRuleTree()
        ]);
    }

    public function edit($id){
        $authGroup = new AuthGroupModel();

        // 编辑
        if(request()->isPost()){
            $data = input('post.');
            if($data['rules']){
                // 数组转成字符串
                $data['rules'] = implode(',',$data['rules']);
            }
            $res = $authGroup->save($data,['id' => $data['id']]);
            if($res !== false){
                $this->success('编辑用户组成功！',url('authGroup/lists'));
            }else{
                $this->error('编辑用户组失败！');
            }
            return;
        }

        // 查询一条数据
        //$one = $authGroup->get($id);
        $one = $authGroup->where([
            'id' => $id
            //'id' => input('id')
        ])->find();
        if(!$one){
            $this->error('该用户组不存在！',url('authGroup/lists'));
        }

        $authRule = new AuthRuleModel();

        return view('',[
            'list' => $one,
            'authRule' => $authRule->authRuleTree()
        ]);
    }

    public function del($id){
        $authGroup = new AuthGroupModel();
        if(!$authGroup->get($id)){
            $this->error('该用户组不存在！',url('authGroup/lists'));
        }

        // 是否删除
        if(request()->isGet()){
            if($authGroup->destroy($id)){
                $this->success('删除用户组成功！',url('authGroup/lists'));
            }else{
                $this->error('删除用户组失败！');
            }
        }
    }


    

    




   

	












}
