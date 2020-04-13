<?php
namespace app\bis\controller;

use think\Controller;
use app\common\model\City as cityModel;
use app\common\model\Category as categoryModel;
use app\common\model\BisLocation as BisLocationModel;

class Location extends Base
{

    private $cityModel;
    private $categoryModel;
    private $bisLocationModel;

    public function _initialize(){
        $this->cityModel = new cityModel();
        $this->categoryModel = new categoryModel();
        $this->bisLocationModel = new BisLocationModel();
    }


    public function index(){

        return $this->fetch();
    }


    public function add(){
        if(request()->isPost()){
            $data = input("post.");
            $bisId = $this->getLoginUser()->bis_id;

            // 所属子类
            $data['cat'] = '';
            if(!empty($data['se_category_id'])) {
                $data['cat'] = implode('|', $data['se_category_id']);
            }
            // 获取经纬度
            $lnglat = \Map::getLngLat($data['address']);
            if(empty($lnglat) || $lnglat['status'] != 0 || $lnglat['result']['precise'] != 0){
                $this->error('无法获取数据，或者匹配的地址不精确');
            }
            // 总店相关信息入库
            $locationData = [
                'bis_id' => $bisId,
                'name' => $data['name'],
                'logo' => $data['logo'],
                'tel' => $data['tel'],
                'contact' => $data['contact'],
                'category_id' => $data['category_id'],
                'category_path' => $data['category_id'] . ',' . $data['cat'],
                'city_id' => $data['city_id'],
                'city_path' => empty($data['se_city_id']) ? $data['city_id'] : $data['city_id'].','.$data['se_city_id'],
                'api_address' => $data['address'],
                'open_time' => $data['open_time'],
                'content' => empty($data['content']) ? '' : $data['content'],
                'is_main' => 0,// 代表的是分店信息
                'xpoint' => empty($lnglat['result']['location']['lng']) ? '' : $lnglat['result']['location']['lng'],
                'ypoint' => empty($lnglat['result']['location']['lat']) ? '' : $lnglat['result']['location']['lat'],
            ];
            $locationId = $this->bisLocationModel->add($locationData);
            if($locationId){
                return $this->success("门店申请成功！");
            }else{
                return $this->error("门店申请失败！");
            }
        }
        // 获取一级城市
        $citys = $this->cityModel->getNormalCitysByParentId();
        $categorys = $this->categoryModel->getNormalCategoryByParentId();
        return $this->fetch("",[
            'citys' => $citys,
            'categorys' => $categorys
        ]);
    }


}
