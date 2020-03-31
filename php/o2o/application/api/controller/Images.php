<?php
namespace app\api\controller;

use think\Controller;
use think\Request;
use think\File;
use app\common\model\City as cityModel;

class Images extends Controller
{

    private $cityModel;

    public function _initialize(){
        $this->cityModel = new cityModel();
    }

    public function upload(){
        $file = Request::instance()->file('file');
        $info = $file->move('upload');
        if($info && $info->getPathname()){
            return show(1,'success','/'.$info->getPathname());
        }
        return show(0,'error');
    }



}
