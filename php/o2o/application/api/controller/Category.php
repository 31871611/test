<?php
namespace app\api\controller;

use think\Controller;
use app\common\model\Category as categoryModel;

class Category extends Controller
{

    private $categoryModel;

    public function _initialize(){
        $this->categoryModel = new categoryModel();
    }

    // 下级分类
    public function getCategoryByParentId(){
        $id = input('post.id',0,'intval');
        if(!$id){
            $this->error("id不合法");
        }
        $categorys = $this->categoryModel->getNormalCategoryByParentId($id);
        if($categorys){
            return show(1,'success',$categorys);
        }else{
            return show(0,'error');
        }
    }

}
