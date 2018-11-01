<?php
namespace app\api\controller\v1;


use app\api\validate\IDMustBePostivelnt;
use app\api\model\Banner as BannerModel;
use think\image\Exception;
use app\lib\exception\BannerMissException;

class Banner {
    public function index(){
        // http://localhost/zerg/public/index.php/api/v1.banner/index
        return 'banner';
    }

    /**
     * 获取指定id的banner信息
     * @url /banner/:id
     * @http GET
     * @id banner的id号
     */
    public function getBanner(){
        //return input('id');
        (new IDMustBePostivelnt())->goCheck();
        //$banner = BannerModel::getBannerByID(input('id'));
        $banner = BannerModel::with(['items','items.img'])->find(input('id'));
        if(!$banner){
            // 自定义异常
            throw new BannerMissException();
        }
        return json($banner);
    }
}