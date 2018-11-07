<?php
namespace app\api\controller\v1;


use app\api\validate\IDCollection;
use app\api\model\Theme as ThemeModel;
use app\api\validate\IDMustBePostivelnt;
use app\lib\exception\ThemeException;

class Theme {

    /**
     * @url /theme?ids=id1,id2,id3,......
     * @return 一组theme模型
     * http://localhost/zerg/public/index.php/api/v1/theme?ids=1,2
     */
    public function getSimpleList($ids=''){
        (new IDCollection())->goCheck();
        $ids = explode(',',$ids);
        $result = ThemeModel::with('topicImg,headImg')->select($ids);
        if(!$result){
            throw new ThemeException();
        }
        return $result;
    }

    /**
     * @url /theme/1
     */
    public function getComplexOne($id){
        (new IDMustBePostivelnt())->goCheck();
        $theme = ThemeModel::getThemeWithProducts($id);
        if(!$theme){
            throw new ThemeException();
        }
        return $theme;
    }

}