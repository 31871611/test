<?php
namespace app\api\controller\v1;


use app\api\validate\Count;
use app\api\model\Product as ProductModel;
use app\api\validate\IDMustBePostivelnt;
use app\lib\exception\ProductException;

class Product {

    /**
     * @param int $count
     * @url api/v1/product/recent?count=1-15
     */
    public function getRecent($count=15){
        (new Count())->goCheck();
        $product = ProductModel::getMostRecent($count);
        //if($product->isEmpty()){
        // 返回类型修改为collection需要使用$product->isEmpty()
        if(!$product){
            throw new ProductException();
        }
        // 隐藏某个字段
        $collection = collection($product);
        $product = $collection->hidden(['summary']);
        //$product = $product->hidden(['summary']);
        return $product;
    }

    /**
     * @url product/by_category?id=2
     */
    public function getAllInCategory($id){
        (new IDMustBePostivelnt())->goCheck();
        $res = ProductModel::getProductsByCategoryId($id);
        if(!$res){
            throw new ProductException();
        }
        return $res;
    }

}