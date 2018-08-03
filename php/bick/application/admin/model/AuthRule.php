<?php
namespace app\admin\model;
use think\Model;
class AuthRule extends Model
{
    

    public function authRuleTree(){
        $arthRuleres = $this->order('sort desc')->select();
        return $this->sort($arthRuleres);
    }


    public function sort($data,$pid=0){
        static $arr = [];
        foreach($data as $k => $v){
            if($v['pid'] == $pid){
                $arr[] = $v;
                $this->sort($data,$v['id']);
            }
        }
        return $arr;
    }



}
