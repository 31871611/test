<?php
namespace app\api\model;

use think\Exception;
use think\Model;

class Order extends BaseModel {

    protected $hidden = ['user_id','delete_time','update_time'];

    protected $autoWriteTimestamp = true;
    // 定义创建时间字段
    //protected $createTime = 'create_timestamp';


    public static function getSummaryByUser($uid,$page=1,$size=15){
        $pagingData = self::where('user_id','=',$uid)
            ->order('create_time desc')
            ->paginate($size,true,['page' => $page]);
        return $pagingData;
    }

    // 字段读取器，将字符串字段转成对象
    public function getSnapItemsAttr($value){
        if(empty($value)){
            return null;
        }
        return json_decode($value);
    }

    // 字段读取器，将字符串字段转成对象
    public function getSnapAddressAttr($value){
        if(empty($value)){
            return null;
        }
        return json_decode($value);
    }


    public static function getSummaryByPage($page=1, $size=20){
        $pagingData = self::order('create_time desc')
            ->paginate($size, true, ['page' => $page]);
        return $pagingData ;
    }

    public function products(){
        return $this->belongsToMany('Product', 'order_product', 'product_id', 'order_id');
    }


}