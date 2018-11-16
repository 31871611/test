<?php
namespace app\api\controller\v1;

use app\api\controller\BaseController;
use app\api\validate\IDMustBePostivelnt;
use \app\api\service\Pay as PayService;


class Pay extends BaseController{

    protected $beforeActionList = [
        'checkExclusiveScope' => ['only' => 'getPreOrder']
    ];

    public function getPreOrder($id=''){
        (new IDMustBePostivelnt())->goCheck();
        $pay = new PayService($id);
        $pay->pay();
    }

}