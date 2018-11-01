<?php
namespace app\api\model;

use think\Exception;
use think\Model;

class Banner extends Model {

    //protected $table = '表名';

    public function items(){
        // 关联表
        return $this->hasMany('BannerItem','banner_id','id');
    }


    public static function getBannerByID($id){
        // TODD:根据Banner ID号 获取Banner信息
        return $id;
    }

}