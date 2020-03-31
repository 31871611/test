<?php
namespace app\admin\controller;

use think\Controller;
use app\admin\validatate\Category as categoryValidatate;
use app\common\model\City as cityModel;

class City extends Controller
{

    private $cityModel;

    public function _initialize(){
        $this->cityModel = new cityModel();
    }

    public function index(){
        $parentId = input('get.parent_id',0,'intval');
        $categorys = $this->cityModel->getFirstCategory($parentId);
        return $this->fetch('',[
            'categorys' => $categorys
        ]);
    }

    // 添加页面
    public function add(){
        $citys = $this->cityModel->getNormalCitysByParentId();
        return $this->fetch('',[
            'citys' => $citys
        ]);
    }

    // 下级城市
    public function getCitysByParentId($id){
        $citys = $this->cityModel->getNormalCitysByParentId($id);
        if($citys){
            $this->result($citys,1,'success');
        }else{
            $this->result($citys,0,'error');
        }
    }

    // 添加提交
    public function save(){
        if(!request()->isPost()){
            $this->error('非法操作！');
        }

        $data = input('post.');
        /*
        $categoryValidatate = new categoryValidatate();
        if(!$categoryValidatate->scene('add')->check($data)){
            $this->error($categoryValidatate->getError());
        }
        if(!empty($data['id'])){
            return $this->update($data);
        }
        */

        $res = $this->cityModel->add($data);
        if($res){
            $this->success('新增成功！');
        }else{
            $this->error('新增失败！');
        }
    }


    public function edit($id=0){
        if(intval($id) < 1){
            $this->error('参数不合法');
        }
        $category = $this->categoryModel->get($id);
        $categorys = $this->categoryModel->getNormalFirstCategory();
        return $this->fetch('',[
            'category' => $category,
            'categorys' => $categorys
        ]);
    }


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
