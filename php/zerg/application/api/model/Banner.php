<?php
namespace app\api\model;

use think\Exception;
use think\Model;

class Banner extends BaseModel {

    //protected $table = '表名';

    protected $hidden = ['delete_time','update_time'];

    public function items(){
        // 关联表
        return $this->hasMany('BannerItem','banner_id','id');
    }


    public static function getBannerByID($id){
        $banner = self::with(['items','items.img'])->find(input('id'));
        return $banner;
    }

}