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

    public function imgs(){
        // 关联ProductImage表
        return $this->hasMany('ProductImage','product_id','id');
    }

    public function properties(){
        // 关联ProductImage表
        return $this->hasMany('ProductProperty','product_id','id');
    }

    public static function getProductDetail($id){
        $product = self::with([
            'imgs' => function($query){
                $query->with(['imgUrl'])->order('order','asc');
            }
        ])
            ->with(['properties'])
            ->find($id);
        return $product;
    }

}