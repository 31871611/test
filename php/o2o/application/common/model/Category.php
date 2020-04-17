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


    public function getNormalCategoryByParentId($parentId = 0){
        $data = [
            'status' => 1,
            'parent_id' => $parentId
        ];

        $order = [
            'id' => 'desc'
        ];

        $res = $this->where($data)->order($order)->select();
        return $res;
    }


    public function getNormalRecommendCategoryByParentId($id=0, $limit=5) {
        $data = [
            'parent_id' => $id,
            'status' => 1,
        ];

        $order = [
            'listorder' => 'desc',
            'id' => 'desc',
        ];

        $result = $this->where($data)->order($order);
        if($limit) {
            $result = $result->limit($limit);
        }

        return $result->select();

    }

    public function getNormalCategoryIdParentId($ids) {
        $data = [
            'parent_id' => ['in', implode(',', $ids)],
            'status' => 1,
        ];

        $order = [
            'listorder' => 'desc',
            'id' => 'desc',
        ];

        $result = $this->where($data)
            ->order($order)
            ->select();
        //echo $this->getLastSql();
        return $result;
    }

}
