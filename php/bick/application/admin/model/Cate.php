<?php
namespace app\admin\model;

use think\Model;
use think\Db;
use think\Session;

class Cate extends Model{

    // 读取栏目
    public function catetree(){
        $cateres = $this->order('sort','des')->select();
        return $this->sort($cateres);
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

    // 添加
    public function addcate($data){
        if(empty($data) || !is_array($data)){
            return false;
        }
        if($this->save($data)){
            return true;
        }else{
            return false;
        }
        //return $data;
    }

    // 编辑
    public function editcate($data){
        if(empty($data) || !is_array($data)){
            return false;
        }
        $res = $this->save([
            'catename' => $data['catename'],
            'type' => $data['type'],
            'pid' => $data['pid'],
        ],[
            'id'=>$data['id']
        ]);
        if($res !== false){
            return true;
        }else{
            return false;
        }
    }

    // 删除
    public function delcate($id){
        if(empty($id)){
            return false;
        }

        if($this->destroy($id)){
            return true;
        }else{
            return false;
        }
    }

    public function getchilrenid($cateid){
        $cateres = $this->select();
        return $this->_getchilrenid($cateres,$cateid);
    }

    public function _getchilrenid($cateres,$cateid){
        static $arr = [];
        foreach($cateres as $k => $v){
            if($v['pid'] == $cateid){
                //$arr[] = $v['id'];
                array_push($arr,$v['id']);
                $this->_getchilrenid($cateres,$v['id']);
            }
        }
        return $arr;
    }

}