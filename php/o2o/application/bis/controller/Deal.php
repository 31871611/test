<?php
namespace app\bis\controller;

use think\Controller;
use app\common\model\City as cityModel;
use app\common\model\Category as categoryModel;
use app\common\model\BisLocation as BisLocationModel;
use app\common\model\Deal as dealModel;

class Deal extends Base
{

    private $cityModel;
    private $categoryModel;
    private $bisLocationModel;
    private $dealModel;

    public function _initialize(){
        $this->cityModel = new cityModel();
        $this->categoryModel = new categoryModel();
        $this->bisLocationModel = new BisLocationModel();
        $this->dealModel = new dealModel();
    }


    public function index(){

        return $this->fetch();
    }


    public function add(){
        $bisId = $this->getLoginUser()->bis_id;
        if(request()->isPost()){
            $data = input("post.");
            // 严格校验提交的数据， tp5 validate 小伙伴自行完成，

            $location = $this->bisLocationModel->get($data['location_ids'][0]);
            $deals = [
                'bis_id' => $bisId,
                'name' => $data['name'],
                'image' => $data['image'],
                'category_id' => $data['category_id'],
                'se_category_id' => empty($data['se_category_id']) ? '' : implode(',', $data['se_category_id']),
                'city_id' => $data['city_id'],
                'location_ids' => empty($data['location_ids']) ? '' : implode(',', $data['location_ids']),
                'start_time' => strtotime($data['start_time']),
                'end_time' => strtotime($data['end_time']),
                'total_count' => $data['total_count'],
                'origin_price' => $data['origin_price'],
                'current_price' => $data['current_price'],
                'coupons_begin_time' => strtotime($data['coupons_begin_time']),
                'coupons_end_time' => strtotime($data['coupons_end_time']),
                'notes' => $data['notes'],
                'description' => $data['description'],
                'bis_account_id' => $this->getLoginUser()->id,
                'xpoint' => $location->xpoint,
                'ypoint' => $location->ypoint,
            ];

            $id = $this->dealModel->add($deals);
            if($id) {
                $this->success('添加成功', url('deal/index'));
            }else {
                $this->error('添加失败');
            }
            return false;
        }
        // 获取一级城市
        $citys = $this->cityModel->getNormalCitysByParentId();
        $categorys = $this->categoryModel->getNormalCategoryByParentId();
        $bisLocation = $this->bisLocationModel->getNormalLocationByBisId($bisId);
        return $this->fetch("",[
            'citys' => $citys,
            'categorys' => $categorys,
            'bisLocation' => $bisLocation
        ]);
    }


}
