<?php
namespace app\lib\exception;


use think\exception\Handle;
use think\Exception;
use think\Request;

class ExceptionHandler extends Handle {

    private $code;
    private $msg;
    private $errorCode;
    // 需要返回客户端当前请求的url路径

    public function render(Exception $e){
        if($e instanceof BaseException){
            // 如果是自定义的异常
            $this->code = $e->code;
            $this->msg = $e->msg;
            $this->errorCode = $e->errorCode;
        }else{
            $this->code = 500;
            $this->msg = '服务器内部错误';
            $this->errorCode = 999;
        }
        $request = Request::instance();
        $result = [
            'msg' => $this->msg,
            'code' => $this->errorCode,
            'requestUrl' => $request->url(),
        ];
        return json($result,$this->code);
    }

}