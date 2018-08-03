<?php
namespace app\admin\validate;

use think\Validate;

class Admin extends Validate{

    protected $rule = [
        //'name' => 'require|min:6',
        'name' => ['require','max'=>25,'min'=>6],
        'password' => 'require|min:6'
    ];



    protected $message = [
        'name.require'          =>	'用户名不能为空',
        'name.min'              =>	'用户名不能少于6个字符',
        'name.max'              =>	'用户名不能超过25个字符',
        'password.require'      =>	'密码不能为空',
        //'age.number'        =>	'年龄必须是数字',
        //'age.between'		=>	'年龄只能在1-120之间',
        //'email'             =>	'邮箱格式错误',
    ];


    // 场景验证.只对编辑
    protected $scene = [
        // 编辑的时候添加长度不能大于
        'edit'	=>	['password'=>'max:25'],
        //'edit'	=>	['password'],
    ];

}