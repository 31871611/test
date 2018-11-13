<?php
namespace app\api\model;



class ProductImage extends BaseModel {

    protected $hidden = ['delete_time','update_time','img_id','create_time'];

    public function imgUrl(){
        return $this->belongsTo('Image','img_id','id');
    }

}