<?php
namespace app\api\model;

use think\Exception;
use think\Model;

class Order extends BaseModel {

    protected $hidden = ['user_id','delete_time','update_time'];

    protected $autoWriteTimestamp = true;
    // 定义创建时间字段
    //protected $createTime = 'create_timestamp';

}