<?php
namespace app\index\controller;

use think\Validate;

class Validatate{

    // http://localhost/thinkphp/public/index.php/index/validatate/index
    public function index(){

        $validate = new	Validate([
            'name'	=>	'require|max:25',
            'email'	=>	'email'
        ]);
        $data = [
            'name' => 'thinkphpthinkphpthinkphpthinkphpthinkphpthinkphp',
            'email'=>'thinkphp!qq.com'
        ];
        $res = $validate->check($data);
        var_dump($validate->getError());

    }

}

