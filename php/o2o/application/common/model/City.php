<?php
namespace app\common\model;

use think\Model;


class City extends Model
{

    protected $autoWriteTimestamp = true;
    // 定义创建时间字段
    //protected $createTime = 'create_timestamp';


    public function getNormalCitysByParentId($parentId = 0){
        $data = [
            'status' => 1,
            'parent_id' => $parentId
        ];

        $order = [
            'id' => 'desc'
        ];

        return $this->where($data)->order($order)->select();
    }



    public function add($data){
        $data['status'] = 1;
        //$data['create_time'] = time();
        return $this->save($data);
    }

    public function getFirstCategory($parentId = 0){
        $data = [
            'status' => ['neq',-1],
            'parent_id' => $parentId
        ];

        $order = [
            'listorder' => 'aes',
            'id' => 'desc'
        ];

        $result = $this->where($data)->order($order)->paginate();

        // 显示sql语句
        //echo $this->getLastSql();
        return $result;
    }


    public function getNormalCitys() {
        $data = [
            'status' => 1,
            'parent_id' => ['gt', 0],
        ];

        $order = ['id'=>'desc'];

        return $this->where($data)
            ->order($order)
            ->select();

    }


}
