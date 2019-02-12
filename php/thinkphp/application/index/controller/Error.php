<?php
namespace app\index\controller;

use think\Exception;

class Error{

    // http://localhost/thinkphp/public/index.php/index/validatate/index
    public function index(){



        try{
            1/0;
        }catch (Exception $ex){
            throw $ex;
//            var_dump($ex);
        }

    }

}

