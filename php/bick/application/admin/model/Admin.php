<?php
namespace app\admin\model;

use think\Model;
use think\Db;
use think\Session;

class Admin extends Model{

    // 读取列表
    public function getadmin($pages){
        //$res = $this::limit($pages)->select();
        $res = $this::paginate($pages);
        //dump($res->render());     // 数据小于分页量时返回null
        return $res;
    }


    // 读取一条数据
    public function one(){

    }


    // 添加
    public function addadmin($data){
        if(empty($data) || !is_array($data)){
            return false;
        }

        $adminDate = [
            'name' => $data['name'],
            'password' => md5($data['password'])
        ];

        if($this->save($adminDate)){
            $groupAccess['uid'] = $this->id;
            $groupAccess['group_id'] = $data['group_id'];
            // 添加
            Db::name('auth_group_access')->insert($groupAccess);
            return true;
        }else{
            return false;
        }
        //return $data;
    }

    // 编辑
    public function editadmin($data){
        if(empty($data) || !is_array($data)){
            return false;
        }

        /*
        $res = $this->save([
            'name' => $data['name'],
            'password' => md5($data['password'])
        ],[
            'id'=>$data['id']
        ]);
        */

        $res = $this->where('id',$data['id'])->update([
            'name' => $data['name'],
            'password' => md5($data['password'])
        ]);

        if($res !== false){
            // 如果没有这个数据是插入
            if(Db::name('auth_group_access')->where('uid',$data['id'])->find()){
                // 修改
                Db::name('auth_group_access')->where('uid',$data['id'])->update([
                    'group_id' => $data['group_id']
                ]);
            }else{
                // 添加
                Db::name('auth_group_access')->insert([
                    'uid' => $data['id'],
                    'group_id' => $data['group_id']
                ]);
            }
            return true;
        }else{
            return false;
        }
    }

    // 删除
    public function deladmin($id){
        if(empty($id)){
            return false;
        }

        if($this->destroy($id)){
            return true;
        }else{
            return false;
        }
    }


    // 登录
    public function loginadmin($data){
        if(empty($data) || !is_array($data)){
            return false;
        }
        // 查询是否有该用户
        $res = $this->where([
            'name' => $data['name'],
            'password' => md5($data['password'])
        ])->find();
        Session::set('username',$res["name"]);
        Session::set('userid',$res["id"]);
        if($res){
            return true;
        }else{
            return false;
        }
    }

}