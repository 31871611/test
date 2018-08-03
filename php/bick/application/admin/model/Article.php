<?php
namespace app\admin\model;

use think\Model;
use think\Db;
use think\Session;

class Article extends Model{

    // 读取列表
    public function getArticl($pages){
        $res = $this::field('article.*,cate.catename')->join('cate','article.cateid = cate.id')->paginate($pages);
        return $res;
    }

    // 编辑
    public function editarticle($data){
        if(empty($data) || !is_array($data)){
            return false;
        }
        $res = $this->save($data,[
            'id'=>$data['id']
        ]);
        if($res !== false){
            return true;
        }else{
            return false;
        }
    }

    // 删除
    public function delarticle($id){
        if(empty($id)){
            return false;
        }

        if($this->destroy($id)){
            return true;
        }else{
            return false;
        }
    }

}