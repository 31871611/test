<?php
namespace app\api\validate;

use app\lib\exception\ParameterException;
use think\image\Exception;
use think\Request;
use think\Validate;

class BaseValidate extends Validate{

    public function goCheck(){
        // 获取http传入的参数
        // 对这些参数做检验
        $request = Request::instance();
        $param = $request->param();

        $result = $this->batch()->check($param);
        if(!$result){
            $e = new ParameterException([
                'msg' => $this->error,
                //'code' => 400,
                //'errorCode' => 10002
            ]);
            throw $e;
            /*
            $error = $this->getError();
            // 非自定义异常
            throw new Exception($error);
            */
        }else{
            return true;
        }
    }

    // 验证数字是否是正整数
    public function isPositiveInteger($value,$rule = '',$data = '',$field= ''){

        if(is_numeric($value) && is_int($value + 0) && ($value + 0) > 0){
            return true;
        }else{
            return false;
        }

    }



}