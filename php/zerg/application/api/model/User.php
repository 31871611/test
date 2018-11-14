<?php
namespace app\api\model;

use think\Exception;
use think\Model;

class User extends BaseModel {

    //protected $hidden = ['id','from','delete_time','update_time'];


    public static function getByOpenID($openid){
        $user = self::where('openid','=',$openid)->find();
        return $user;
    }

    public function address(){
        return $this->hasOne('UserAddress', 'user_id', 'id');
    }

}