<?php
namespace app\api\model;

use think\Exception;
use think\Model;

class Product extends BaseModel {

    protected $hidden = ['delete_time','update_time','from','create_time'];

    public function getMainImgUrlAttr($value,$data){
        return $this->prefixImgUrl($value,$data);
    }

    public static function getMostRecent($count){
        $product = self::limit($count)->order('create_time desc')->select();
        return $product;
    }

    public static function getProductsByCategoryId($CategoryId){
        $products = self::where('category_id','=',$CategoryId)->select();
        return $products;
    }

}