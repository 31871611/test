<?php
namespace app\admin\controller;

use think\Controller;
use app\admin\validatate\Category as categoryValidatate;
use app\common\model\Category as categoryModel;

class Category extends Base
{

    private $categoryModel;

    public function _initialize(){
        $this->categoryModel = new categoryModel();
    }

    public function index(){
        $parentId = input('get.parent_id',0,'intval');
        $categorys = $this->categoryModel->getFirstCategory($parentId);
        return $this->fetch('',[
            'categorys' => $categorys
        ]);
    }

    // 添加页面
    public function add(){
        //$categoryModel = new categoryModel();
        //$categorys = $categoryModel->getNormalFirstCategory();
        $categorys = $this->categoryModel->getNormalFirstCategory();
        return $this->fetch('',[
            'categorys' => $categorys
        ]);
    }

    // 添加提交
    public function save(){
        if(!request()->isPost()){
            $this->error('非法操作！');
        }

        $data = input('post.');
        $categoryValidatate = new categoryValidatate();
        if(!$categoryValidatate->scene('add')->check($data)){
            $this->error($categoryValidatate->getError());
        }
        if(!empty($data['id'])){
            return $this->update($data);
        }

        // 提交到model层
        //$categoryModel = new categoryModel();
        //$res = $categoryModel->add($data);
        $res = $this->categoryModel->add($data);
        if($res){
            $this->success('新增成功！');
        }else{
            $this->error('新增失败！');
        }
    }

    // 编辑页面
    public function edit($id=0){
        if(intval($id) < 1){
            $this->error('参数不合法');
        }
        $category = $this->categoryModel->get($id);
        // 转成json查看，比较直观
        // var_dump(json_encode($category,0));exit();
        $categorys = $this->categoryModel->getNormalFirstCategory();
        return $this->fetch('',[
            'category' => $category,
            'categorys' => $categorys
        ]);
    }

    // 编辑提交
    public function update($data){
        $res = $this->categoryModel->save($data,[
            "id" => intval($data['id'])
        ]);
        if($res){
            $this->success('编辑成功！');
        }else{
            $this->error('编辑失败！');
        }
    }

    // 排序逻辑
    public function listorder($id,$listorder){
        $res = $this->categoryModel->save(['listorder' => $listorder],['id'=>$id]);
        if($res){
            //$this->result($_SERVER['HTTP_REFERER'],1,'success');
            $this->result(url('index'),1,'success');
        }else{
            $this->result(url('index'),0,'排序失败！');
        }
    }


    public function status(){
        $data = input('get.');
        $categoryValidatate = new categoryValidatate();
        if(!$categoryValidatate->scene('status')->check($data)){
            $this->error($categoryValidatate->getError());
        }

        $res = $this->categoryModel->save(['status' => $data['status']],['id'=>$data['id']]);
        if($res){
            //$this->result($_SERVER['HTTP_REFERER'],1,'success');
            $this->success('状态更新成功！');
        }else{
            $this->error('状态更新失败！');
        }
    }


}
