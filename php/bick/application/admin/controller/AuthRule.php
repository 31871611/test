<?php
namespace app\admin\controller;
use app\admin\model\AuthRule as AuthRuleModel;
use app\admin\controller\Common;

class AuthRule extends Common
{

    public function lists(){
        $AuthRule = new AuthRuleModel();

        // 排序
        if(request()->isPost()){
            $sorts = input('post.');
            foreach($sorts as $k => $v){
                $AuthRule->update([
                    'id' => $k,
                    'sort' => $v
                ]);
            }
            $this->success('更新排序成功！',url('authRule/lists'));
            return;
        }

        $list = $AuthRule->order('sort','des')->select();
        return view('list',[
            'list' => $this->sort($list),
            'status' => ['隐藏','显示']
        ]);
    }

    // 排序栏目
    public function sort($data,$pid=0,$levle=0){
        static $arr = [];
        foreach($data as $k => $v){
            if($v['pid'] == $pid){
                $v['levle'] = $levle;
                $arr[] = $v;
                $this->sort($data,$v['id'],$levle+1);
            }
        }
        return $arr;
    }

    public function add(){
        $AuthRule = new AuthRuleModel();
        if(request()->isPost()){
            $data = input('post.');
            // 上级权限的level，name='pid'是id
            $plevel= $AuthRule->where([
                'id' => $data['pid']
            ])->field('level')->find();
            if($plevel){
                $data['level'] = $plevel['level']+1;
            }
            $res = $AuthRule->save($data);
            if($res){
                $this->success('新增权限成功！',url('authRule/lists'));
            }else{
                $this->error('新增权限失败！');
            }
            return;
        }

        // 查询顶级权限
        $pidList = $AuthRule->select();
        return view('',[
            'pidList' => $this->sort($pidList)
        ]);
    }

    public function edit($id){
        $AuthRule = new AuthRuleModel();

        // 编辑提交
        if(request()->isPost()){
            $data = input('post.');

            // 上级权限的level，name='pid'是id
            $plevel= $AuthRule->where([
                'id' => $data['pid']
            ])->field('level')->find();
            if($plevel){
                $data['level'] = $plevel['level']+1;
            }

            $res = $AuthRule->save($data,['id' => $data['id']]);
            if($res !== false){
                $this->success('编辑用户组成功！',url('AuthRule/lists'));
            }else{
                $this->error('编辑用户组失败！');
            }
            return;
        }

        // 查询一条数据
        //$one = $AuthRule->get($id);
        $one = $AuthRule->where([
            'id' => $id
            //'id' => input('id')
        ])->find();
        if(!$one){
            $this->error('该用户组不存在！',url('AuthRule/lists'));
        }
        // 查询顶级权限
        $pidList = $AuthRule->select();

        //dump($one);die;

        return view('',[
            'authRules' => $one,
            'pidList' => $this->sort($pidList)
        ]);
    }


    public function del($id){
        $AuthRule = new AuthRuleModel();
        $one = $AuthRule->get($id);
        if(!$one){
            $this->error('该权限不存在！',url('authRule/lists'));
        }

        // 如果删除顶级名称也需要删除下级子名称
        $ids = $this->getDelIds($one['id']);
        // 是否删除
        if($AuthRule->destroy($ids)){
            $this->success('删除权限成功！',url('authRule/lists'));
        }else{
            $this->error('删除权限失败！');
        }

    }


    // 查找需要删除的id
    public function getDelIds($id){
        //dump($id . '...' );
        static $arr = [];
        $AuthRule = new AuthRuleModel();
        /*
            用id查pid，
            空数组代表没有下级
            有下级得id，继续使用id查pid
        */
        $res = $AuthRule->where('pid',$id)->select();
        if(!empty($res)){
            // 没有下级
            foreach($res as $k => $v){
                $this->getDelIds($v['id']);
            }
        }
        $arr[] = $id;
        return $arr;
    }


    

    




   

	












}
