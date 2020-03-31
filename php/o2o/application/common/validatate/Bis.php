<?php
namespace app\common\validatate;

use think\Validate;

class Bis extends Validate{

    protected $rule = [
        'name' => 'require|max:25',
        'email' => 'email',
        'city_id' => 'require',
        'se_city_id' => 'require',
        'logo' => 'require',
        'licence_logo' => 'require',
        'bank_info' => 'require',
        'bank_name' => 'require',
        'bank_user' => 'require',
        'faren' => 'require',
        'faren_tel' => 'require',
        'tel' => 'require',
        'contact' => 'require',
        'category_id' => 'require',
        'address' => 'require',
        'open_time' => 'require',
        'username' => 'require',
        'password' => 'require',
//        ['name','require|max:25','分类名不能为空|分类名不能超过10个字符'],
//        ['parent_id','number'],
//        ['id','number'],
//        ['status','number|in:-1,0,1','状态必须是数字|状态范围不合法'],
//        ['listorder','number']
    ];



    // 场景设置
    protected $scene = [
        'add'       => ['name','email','logo','city_id']      // 只对添加
    ];

}