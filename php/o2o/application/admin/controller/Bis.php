<?php
namespace app\admin\controller;

use think\Controller;
use app\common\model\Bis as bisModel;
use app\common\model\City as cityModel;
use app\common\model\Category as categoryModel;
use app\common\model\BisLocation as BisLocationModel;
use app\common\model\BisAccount as BisAccountModel;

class Bis extends Controller
{

    private $bisModel;
    private $cityModel;
    private $categoryModel;
    private $bisLocationModel;
    private $bisAccountModel;

    public function _initialize(){
        $this->bisModel = new bisModel();
        $this->cityModel = new cityModel();
        $this->categoryModel = new categoryModel();
        $this->bisLocationModel = new BisLocationModel();
        $this->bisAccountModel = new BisAccountModel();
    }

    // 商家列表
    public function index(){
        $bis = $this->bisModel->getBisByStatus(1);
        return $this->fetch("",[
            'bis' => $bis
        ]);
    }


    // 入驻申请列表
    public function apply(){

        $bis = $this->bisModel->getBisByStatus();
        return $this->fetch("",[
            'bis' => $bis
        ]);
    }


    public function detail($id){
        if(empty($id)){
            $this->error("id错误!");
        }
        // 获取一级城市
        $citys = $this->cityModel->getNormalCitysByParentId();
        $categorys = $this->categoryModel->getNormalCategoryByParentId();

        // 商户数据
        $bisData = $this->bisModel->get($id);
        $locationData = $this->bisLocationModel->get(['bis_id'=>$id,'is_main'=>1]);
        $accountData = $this->bisAccountModel->get(['bis_id'=>$id,'is_main'=>1]);
        return $this->fetch("",[
            'citys' => $citys,
            'categorys' => $categorys,
            'bisData' => $bisData,
            'locationData' => $locationData,
            'accountData' => $accountData
        ]);
    }


    // 修改状态
    public function status(){
        $data = input('get.');
        /*
        $categoryValidatate = new categoryValidatate();
        if(!$categoryValidatate->scene('status')->check($data)){
            $this->error($categoryValidatate->getError());
        }
        */

        $res = $this->bisModel->save(['status' => $data['status']],['id'=>$data['id']]);
        $location = $this->bisLocationModel->save(['status' => $data['status']],['bis_id'=>$data['id']],["is_main" => 1]);
        $account = $this->bisAccountModel->save(['status' => $data['status']],['bis_id'=>$data['id']],["is_main" => 1]);
        if($res && $location && $account){
            //$this->result($_SERVER['HTTP_REFERER'],1,'success');
            $this->success('状态更新成功！');
        }else{
            $this->error('状态更新失败！');
        }
    }


}
