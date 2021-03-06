<?php
namespace app\api\controller\v1;

use app\api\controller\BaseController;
use app\api\service\Token as TokenService;
use app\api\service\Token;
use app\api\validate\IDMustBePostivelnt;
use app\api\validate\OrderPlace;
use app\api\validate\PagingParameter;
use app\lib\exception\OrderException;
use think\Controller;
use app\api\service\Order as OrderService;
use app\api\model\Order as OrderModel;

class Order extends BaseController{

    // 用户在选择商品后，向api提交包含它选择商品的相关信息
    // api在接收到信息后，检查商品的库存量
    // 有库存，把订单数据存入数据库中。下单成功，返回客户端，告诉客户端可以支付了
    // 调用我们的支付接口，进行支付
    // 还需要再次进行库存量检测
    // 服务器这边就可以调用微信的支付接口进行支付
    // 小程序根据服务器返回的结果拉起微信支付
    // 微信会返回给我们一个支付的结果（异步）
    // 成功：也需要进行库存量的检查
    // 成功：进行库存的扣除，失败：返回一个支付失败的结果

    protected $beforeActionList = [
        'checkExclusiveScope' => ['only' => 'placeOrder'],
        'checkPrimaryScope' => ['only' => 'getDetail, getSummaryByUser']
    ];

//    protected function checkExclusiveScope(){
//        return TokenService::needPrimaryScope();
//    }

    public function placeOrder(){
        (new OrderPlace())->goCheck();
        $products = input('post.products/a');       // 获取数组参数添加/a
        $uid = TokenService::getCurrentUid();

        $order = new OrderService();
        $status = $order->place($uid,$products);
        return $status;
    }


    /**
     * @url /api/v1/by_user?page=1&size=3
     */
    public function getSummaryByUser($page=1,$size=15){
        (new PagingParameter())->goCheck();
        $uid = Token::getCurrentUid();
        $pagingOrders = OrderModel::getSummaryByUser($uid,$page,$size);
        if($pagingOrders->isEmpty()){
            return[
                'data' => [],
                'current_page' => $pagingOrders->getCurrentPage()
            ];
        }else{
            $data = $pagingOrders->hidden(['snap_items','snap_address','prepay_id'])->toArray();
            return[
                'data' => $data,
                'current_page' => $pagingOrders->getCurrentPage()
            ];
        }
    }


    /**
     * 获取全部订单简要信息（分页）.cms使用
     * @param int $page
     * @param int $size
     * @return array
     * @throws \app\lib\exception\ParameterException
     */
    public function getSummary($page=1, $size = 20){
        (new PagingParameter())->goCheck();
//        $uid = Token::getCurrentUid();
        $pagingOrders = OrderModel::getSummaryByPage($page, $size);
        if ($pagingOrders->isEmpty()){
            return [
                'current_page' => $pagingOrders->currentPage(),
                'data' => []
            ];
        }
        $data = $pagingOrders->hidden(['snap_items', 'snap_address'])->toArray();
        return [
            'current_page' => $pagingOrders->currentPage(),
            'data' => $data
        ];
    }


    public function getDetail($id){
        (new IDMustBePostivelnt())->goCheck();
        $orderDetail = OrderModel::get($id);
        if(!$orderDetail){
            throw new OrderException();
        }
        return $orderDetail->hidden(['prepay_id']);
    }

}