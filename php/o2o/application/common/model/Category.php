<?php
namespace app\common\model;

use think\Model;


class Category extends Model
{

    protected $autoWriteTimestamp = true;
    // 定义创建时间字段
    //protected $createTime = 'create_timestamp';

    public function add($data){
        $data['status'] = 1;
        //$data['create_time'] = time();
        return $this->save($data);
    }

    public function getNormalFirstCategory(){
        $data = [
            'status' => 1,
            'parent_id' => 0
        ];

        $order = [
            'id' => 'desc'
        ];

        return $this->where($data)->order($order)->select();
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




}
