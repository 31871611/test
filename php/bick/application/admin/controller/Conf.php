<?php
namespace app\admin\controller;
use app\admin\model\Conf as ConfModel;
use app\admin\controller\Common;
class Conf extends Common
{

    public function lists(){

        $list = [];

        return view('lst',[
            'list' => $list
        ]);
    }

    public function add(){

        return view();
    }

    public function edit(){

        return view();
    }

    public function del(){
        $del=ConfModel::destroy(input('id'));
        if($del){
           $this->success('删除配置项成功！',url('lst')); 
        }else{
            $this->error('删除配置项失败！');
        }
    }

    public function conf(){

        return view();
    }





    

    




   

	












}
