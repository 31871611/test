<?php
namespace app\api\controller\v1;

use app\api\controller\BaseController;
use app\api\service\WxNotify;
use app\api\validate\IDMustBePostivelnt;
use app\api\service\Pay as PayService;
use think\Loader;


// 引入extend文件夹里的微信支付文件extend/WxPay/WxPay.Api.php
Loader::import('WxPay.WxPay',EXTEND_PATH,'.Api.php');
class Pay extends BaseController{

    protected $beforeActionList = [
        'checkExclusiveScope' => ['only' => 'getPreOrder']
    ];

    public function getPreOrder($id=''){
        (new IDMustBePostivelnt())->goCheck();
        $pay = new PayService($id);
        return $pay->pay();
    }

    public function receiveNotify(){
        // 通知频率为15/15/30/180/1800/1800/1800/3600，单位：秒

        // 1.检查库存量
        // 2.更新这个订单的status状态
        // 3.减库存
        // 如果成功处理，我们返回微信成功处理的信息，否则，我们需要返回没有成功处理。

        // 特点：POST；xml格式；不会携带参数
        $notify = new WxNotify();
        $config = new \WxPayConfig();
        $notify->Handle($config);
    }

}