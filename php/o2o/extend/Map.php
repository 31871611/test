<?php
/**
 * 百度地图相关业务封装
 */

class Map {
    /**
     * 根据地址来获取经续度
     * @param $address
     */
    public static function getLngLat($address){
        if(!$address){
            return false;
        }
        $data = [
            'address' => $address,
            'ak' => config('map.ak'),
            'output' => 'json'
        ];
        $url = config('map.baidu_map_url') . config('map.geocoder') . '?' . http_build_query($data);
        $result = doCurl($url);
        return $result;
    }

    /**
     * 根据经纬度或者地址来获取百度地图
     * @param $center
     */
    public static function staticimage($center){
        if(!$center){
            return false;
        }
        $data = [
            'ak' => config('map.ak'),
            'width' => config('map.width'),
            'height' => config('map.height'),
            'center' => $center,
            'markers' => $center
        ];
        $url = config('map.baidu_map_url') . config('map.staticimage') . '?' . http_build_query($data);
        $result = doCurl($url);
        return $result;
    }


}




















