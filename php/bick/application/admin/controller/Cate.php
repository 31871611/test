<?php
namespace app\admin\controller;

//use think\Controller;
use think\Request;
use think\Db;

use app\admin\model\Cate as CateModel;
use app\admin\controller\Common;

class Cate extends Common
{

    // 前置方法
    protected	$beforeActionList	=	[
        //'first',
        //'second'	=>		['except'=>'hello'],
        'delsoncate'		=>		['only'=>'del'],
    ];


    // 读取列表
    public function lists()
    {
        $cate = new CateModel();

        if(Request()->isPost()){
            //dump(input('post.'));
            $sorts = input('post.');
            foreach($sorts as $k => $v){
                $cate->where([
                    'id' => $k
                ])->update([
                    'sort' => $v
                ]);
            }
            $this->success('更新排序成功！',url('cate/lists'));
            return;
        }
        return view('list',[
            'type' => ['','文章列表','单页','图片列表'],
            'list' => $cate->catetree()
        ]);
    }


    // 添加
    public function add(){
        // 是否添加
        if(Request()->isPost()){
            $data = [
                'catename' => input('post.catename'),
                'type' => input('post.type'),
                'pid' => input('post.pid')
            ];
            $cate = new CateModel();
            if($cate->addcate($data)){
                $this->success('添加栏目成功！',url('cate/lists'));
            }else{
                $this->error('添加栏目失败！');
            }
        }

        $cate = new CateModel();
        return view('',[
            'pidList' => $cate->catetree()           // // 读取栏目
        ]);
    }

    // 删除
    public function del(){

        // 获取用户名
        $cate = Db::name("cate")->where([
            'id' => input('id')
        ])->field('id')->find();
        if(!$cate){
            $this->error('该栏目不存在！',url('cate/lists'));
        }

        // 是否删除
        if(request()->isGet()){
            $cate = new CateModel();
            if($cate->delcate(input('id'))){
                $this->success('删除栏目成功！',url('cate/lists'));
            }else{
                $this->error('删除栏目失败！');
            }
        }

    }

    // 是否有子栏目
    public function delsoncate(){
        $cate = new CateModel();
        $sonids = $cate->getchilrenid(input('id'));
        $cate = new CateModel();
        if($sonids){
            // 有子栏目
            $cate->delcate($sonids);
        }
    }


    // 编辑
    public function edit(){
        // 获取用户名
        $cateres = Db::name("cate")->where([
            'id' => input('id')
        ])->find();

        // 是否编辑的提交
        if(request()->isPost()){
            $cate = new CateModel();
            if($cate->editcate(input('post.'))){
                $this->success('编辑栏目成功！',url('cate/lists'));
            }else{
                $this->error('编辑栏目失败！');
            }
            return false;
        }

        $cate = new CateModel();
        return view('',[
            'cateres' => $cateres,
            'pidList' => $cate->catetree()           // // 读取栏目
        ]);
    }


}
