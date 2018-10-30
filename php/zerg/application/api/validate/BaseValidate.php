<?php
namespace app\api\validate;

use think\image\Exception;
use think\Request;
use think\Validate;

class BaseValidate extends Validate{

    public function goCheck(){
        // 获取http传入的参数
        // 对这些参数做检验
        $request = Request::instance();
        $param = $request->param();

        $result = $this->check($param);
        if(!$result){
            $error = $this->getError();
            throw new Exception($error);
        }else{
            return true;
        }
    }

}