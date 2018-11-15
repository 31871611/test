<?php
namespace app\api\model;

use think\Exception;
use think\Model;

class Order extends BaseModel {

    protected $hidden = ['user_id','delete_time','update_time'];



}