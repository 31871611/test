<?php
namespace app\common\model;

use think\Model;


class Bis extends BaseModel
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

    /**
     * 通过状态获取商家数据
     * @param $status
     */
    public function getBisByStatus($status = 0){
        $order = [
            "id" => "desc"
        ];

        $data = [
            'status' => $status
        ];

        return $this->where($data)->order($order)->paginate();
    }

}
