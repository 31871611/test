<?php
namespace app\api\controller;

use think\Controller;
use app\common\model\City as cityModel;

class City extends Controller
{

    private $cityModel;

    public function _initialize(){
        $this->cityModel = new cityModel();
    }

    // 下级城市
    public function getCitysByParentId($id){
        if(!$id){
            $this->error("id不合法");
        }
        $citys = $this->cityModel->getNormalCitysByParentId($id);
        $resData = [
            "data" => $citys
        ];
        if($citys){
            return show(1,'success',$citys);
            //$this->result($resData,1,'success');
        }else{
            return show(0,'error');
            //$this->result($resData,0,'error');
        }
    }

}
