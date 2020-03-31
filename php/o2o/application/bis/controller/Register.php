<?php
namespace app\bis\controller;

use think\Controller;

use app\common\model\City as cityModel;
use app\common\model\Category as categoryModel;
use app\common\model\Bis as bisModel;
use app\common\model\BisLocation as BisLocationModel;
use app\common\model\BisAccount as BisAccountModel;
use app\common\validatate\Bis as bisValidatate;

class Register extends Controller
{
    private $cityModel;
    private $categoryModel;
    private $bisModel;
    private $bisLocationModel;
    private $bisAccountModel;

    public function _initialize(){
        $this->cityModel = new cityModel();
        $this->categoryModel = new categoryModel();
        $this->bisModel = new bisModel();
        $this->bisLocationModel = new BisLocationModel();
        $this->bisAccountModel = new BisAccountModel();
    }

    public function index(){
        // 获取一级城市
        $citys = $this->cityModel->getNormalCitysByParentId();
        $categorys = $this->categoryModel->getNormalCategoryByParentId();

        return $this->fetch('',[
            'citys' => $citys,
            'categorys' => $categorys
        ]);
    }


    public function add(){
        if(!request()->isPost()){
            $this->error("请求错误！");
        }
        $data = input('post.');
        // 检验数据
        $bisValidatate = new bisValidatate();
        if(!$bisValidatate->scene('add')->check($data)){
            $this->error($bisValidatate->getError());
        }
        // 总店相关信息检验

        // 帐户相关信息检验


        // 判定提交的用户是否存在
        $accountResult = $this->bisAccountModel->get(['username'=>$data['username']]);
        if($accountResult) {
            $this->error('该用户存在，请重新分配');
        }


        // 获取经纬度
        $lnglat = \Map::getLngLat($data['address']);
        if(empty($lnglat) || $lnglat['status'] != 0 || $lnglat['result']['precise'] != 0){
            $this->error('无法获取数据，或者匹配的地址不精确');
        }

        // 商户基本信息入库
        $bisData = [
            'name' => $data['name'],
            'city_id' => $data['city_id'],
            'city_path' => empty($data['se_city_id']) ? $data['city_id'] : $data['city_id'].','.$data['se_city_id'],
            'logo' => $data['logo'],
            'licence_logo' => $data['licence_logo'],
            'description' => empty($data['description']) ? '' : $data['description'],
            'bank_info' =>  $data['bank_info'],
            'bank_user' =>  $data['bank_user'],
            'bank_name' =>  $data['bank_name'],
            'faren' =>  $data['faren'],
            'faren_tel' =>  $data['faren_tel'],
            'email' =>  $data['email'],
        ];
        $bisId = $this->bisModel->add($bisData);


        // 所属子类
        $data['cat'] = '';
        if(!empty($data['se_category_id'])) {
            $data['cat'] = implode('|', $data['se_category_id']);
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
            'is_main' => 1,// 代表的是总店信息
            'xpoint' => empty($lnglat['result']['location']['lng']) ? '' : $lnglat['result']['location']['lng'],
            'ypoint' => empty($lnglat['result']['location']['lat']) ? '' : $lnglat['result']['location']['lat'],
        ];
        $locationId = $this->bisLocationModel->add($locationData);


        // 账户相关的信息检验
        // 自动生成 密码的加盐字符串
        $data['code'] = mt_rand(100, 10000);
        $accounData = [
            'bis_id' => $bisId,
            'username' => $data['username'],
            'code' => $data['code'],
            'password' => md5($data['password'].$data['code']),
            'is_main' => 1, // 代表的是总管理员
        ];
        $accountId = $this->bisAccountModel->add($accounData);
        if(!$accountId) {
            $this->error('申请失败');
        }


        // 发送邮件
        /*
        $url = request()->domain().url('bis/register/waiting', ['id'=>$bisId]);
        $title = "o2o入驻申请通知";
        $content = "您提交的入驻申请需等待平台方审核，您可以通过点击链接<a href='".$url."' target='_blank'>查看链接</a> 查看审核状态";
        \phpmailer\Email::send($data['email'],$title, $content);
        */
        // 线上关闭 发送邮件服务

        $this->success('申请成功', url('register/waiting',['id'=>$bisId]));
    }


    public function waiting($id) {
        if(empty($id)) {
            $this->error('error');
        }
        $detail = $this->bisModel->get($id);

        return $this->fetch('',[
            'detail' => $detail,
        ]);
    }

}
