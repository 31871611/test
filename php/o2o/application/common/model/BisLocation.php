<?php
namespace app\common\model;

use think\Model;


class BisLocation extends BaseModel
{

    /*
    protected $autoWriteTimestamp = true;

    public function add($data){
        $data['status'] = 0;
        //$data['create_time'] = time();
        $this->save($data);
        return $this->id;
    }
    */

    public function getNormalLocationByBisId($bisId){
        $data = [
            "bis_id" => $bisId,
            "status" => 1
        ];
        $order = [
            "id" => "desc"
        ];
        return $this->where($data)->order($order)->select();
    }

}
