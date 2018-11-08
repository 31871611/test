<?php
namespace app\api\model;

use think\Exception;
use think\Model;

class Category extends BaseModel {

    protected $hidden = ['delete_time','update_time','from','create_time'];

    public function img(){
        // 关连Image表
        return $this->belongsTo('Image','topic_img_id','id');
    }


}