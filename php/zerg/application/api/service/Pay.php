<?php
namespace app\api\service;


use app\lib\enum\OrderStatusEnum;
use app\lib\exception\OrderException;
use app\lib\exception\TokenException;
use think\Cache;
use think\Db;
use think\Exception;
use app\api\service\Order as OrderService;
use app\api\model\Order as OrderModel;
use think\Loader;
use think\Log;

// 引入extend文件夹里的微信支付文件extend/WxPay/WxPay.Api.php
Loader::import('WxPay.WxPay',EXTEND_PATH,'.Api.php');

class Pay {

    private $orderID;
    private $orderNO;

    function __construct($orderID){
        if(!$orderID){
            throw new Exception('订单号不允许为null');
        }
        $this->orderID = $orderID;
    }

    public function pay(){
        // 订单号可能不存在
        // 订单号确定是存在的，但是，订单号与当前用户是不匹配的
        // 订单有可能已经被支付过
        $this->checkOrderValid();
        // 进行库存量检测
        $orderService = new OrderService();
        $status = $orderService->checkOrderStock($this->orderID);
        if(!$status['pass']){
            return $status;
        }
        return $this->makeWxPreOrder($status['orderPrice']);
    }

    // 微信预支付
    private function makeWxPreOrder($totalPrice){
        // 用户openid
        $openid = Token::getCurrentTokenVal('openid');
        if(!$openid){
            throw new TokenException();
        }
        // 微信
        $wxOrderData = new \WxPayUnifiedOrder();
        $wxOrderData->SetOut_trade_no($this->orderID);
        $wxOrderData->SetTrade_type('JSAPI');       // 固定参数JSAPI
        $wxOrderData->SetTotal_fee($totalPrice*100);
        $wxOrderData->SetBody('零食商贩');
        $wxOrderData->SetOpenid($openid);
        $wxOrderData->SetNotify_url('http://qq.com');       //
        return $this->getPaySignature($wxOrderData);
    }

    private function getPaySignature($wxOrderData){
        $config = new \WxPayConfig();
        $wxOrder = \WxPayApi::unifiedOrder($config,$wxOrderData);
        if($wxOrder['return_code'] != 'SUCCESS' || $wxOrder['result_code'] != 'SUCCESS'){
            Log::record($wxOrderData,'error');
            Log::record('获取预支付订单失败，','error');
        }
        // prepay_id
        $this->recordPreOrder($wxOrder);
        return null;
    }

    private function recordPreOrder($wxOrder){
        OrderModel::where('id','='.$this->orderID)-update([
            'prepay_id' => $wxOrder['prepay_id']
        ]);
    }

    // 验证
    private function checkOrderValid(){
        // 订单号可能不存在
        $order = OrderModel::where('id','=',$this->orderID)->find();
        if(!$order){
            throw new OrderException();
        }
        // 订单号确定是存在的，但是，订单号与当前用户是不匹配的
        if(!Token::isValidOperate($order->user_id)){
            throw new TokenException([
                'msg' => '订单与用户不匹配',
                'errorCode' => 10003
            ]);
        }
        // 订单有可能已经被支付过
        if($order->status != OrderStatusEnum::UNPAID){
            throw new OrderException([
                'msg' => '订单已支付',
                'errorCode' => 80003,
                'code' => 400
            ]);
        }
        $this->orderID = $order->order_no;
        return true;
    }


}