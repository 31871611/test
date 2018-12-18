<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

/*
return [
    '__pattern__' => [
        'name' => '\w+',
    ],
    '[hello]'     => [
        ':id'   => ['index/hello', ['method' => 'get'], ['id' => '\d+']],
        ':name' => ['index/hello', ['method' => 'post']],
    ],

];
*/

use think\Route;

//Route::get('api/:version/index','api/index/index');

Route::get('api/:version/banner/:id','api/:version.banner/getBanner');


// theme
Route::get('api/:version/theme','api/:version.theme/getSimpleList');
Route::get('api/:version/theme/:id','api/:version.theme/getComplexOne');


// product
Route::get('api/:version/product/recent','api/:version.product/getRecent');
Route::get('api/:version/product/by_category','api/:version.product/getAllInCategory');
Route::get('api/:version/product/:id','api/:version.product/getOne',[],['id'=>'\d+']);
/*
Route::group('api/:version/product',function(){
    Route::get('/recent','api/:version.product/getRecent');
    Route::get('/by_category','api/:version.product/getAllInCategory');
    Route::get('/:id','api/:version.product/getOne',[],['id'=>'\d+']);
});
*/


// category
Route::get('api/:version/category/all','api/:version.category/getAllCategories');       // 分类列表


// token
Route::post('api/:version/token/user','api/:version.token/getToken');
Route::post('api/:version/token/verify','api/:version.token/verifyToken');
Route::post('api/:version/token/app', 'api/:version.Token/getAppToken');


// address
Route::post('api/:version/address','api/:version.address/createOrUpdateAddress');
Route::get('api/:version/address','api/:version.address/getUserAddress');


// order
Route::post('api/:version/order','api/:version.order/placeOrder');
Route::get('api/:version/order/:id','api/:version.order/getDetail',[],['id'=>'\d+']);
Route::get('api/:version/order/by_user','api/:version.order/getSummaryByUser');
//Route::put('api/:version/order/delivery', 'api/:version.Order/delivery');
Route::get('api/:version/order/paginate', 'api/:version.Order/getSummary');


// pay
Route::post('api/:version/pay/pre_order','api/:version.pay/getPreOrder');
Route::post('api/:version/pay/notify','api/:version.pay/receiveNotify');


