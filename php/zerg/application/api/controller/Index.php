<?php
namespace app\api\controller;

use alimsg\api_demo\SmsDemo as SmsDemo;
use think\Cache;

class Index
{
    public function index()
    {
        // http://localhost/zerg/public/index.php/api/index/index
        return 'v1';
    }

    public function login(){
        return view();
    }

    // 阿里短信发送
    public function sms(){
        $tel = input('post.tel');
        if(!$tel){
            return false;
        }
        if(!preg_match("/^1[34578]\d{9}$/", $tel)){
            return '手机号有误';
        }
        if(!empty(Cache::get('code_time'))){
            if(Cache::get('code_time') - time() < 60){
                return Cache::get('code');
            }
        }
        $code = $this->getRandChar();
        //把验证码保存在Cache里
        Cache::set('code',$code,60);
        Cache::set('code_time',time(),60);
        // Cache::rm('code');
        return $code;

        set_time_limit(0);
        header('Content-Type: text/plain; charset=utf-8');
        $response = SmsDemo::sendSms('13599953136','VIP',$code);
        if($response['Message'] == 'OK'){
            return '发送成功';
        }
        //echo "发送短信(sendSms)接口返回的结果:\n";
        //var_dump($response);
    }

    public function submit(){
        $data = input('post.');
        if(!preg_match("/^1[34578]\d{9}$/", $data['tel'])){
            return '手机号有误';
        }
        if($data['code'] != Cache::get('code') || empty($data['code'])){
            return '验证码错误';
        }else{
            return '验证码正确';
        }
    }

    // 随机数字字符串
    private function getRandChar($length = 4) {
        $array = array( "1", "2", "3", "4", "5", "6", "7", "8", "9");
        $tmpstr = "";
        $max = count($array);
        for($i = 0; $i < $length; $i++) {
            $key = rand(0,$max-1);
            $tmpstr .= $array[$key];
        }
        return $tmpstr;
    }

}