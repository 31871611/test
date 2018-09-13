<?php


	$appid = "wx95bac0e57d09ec49";
	$appsecret = "54c9bcca2c27b3c78c50dde1261c04fc";
	$code = $_GET['code'];
	$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$appid."&secret=".$appsecret."&code=".$code."&grant_type=authorization_code";
	// 3.拉取用户的openid
	$res = httpCurl($url,'get');
	$access_token = $res['access_token'];	// 网页授权access_token
	$openid = $res['openid'];
	var_dump($res);


/*
	$access_token = '13_6stSCzYIKIt0R6bxeYa9QxUXDUv0CxQbM0EtaoveCEeiymeulyQCh8-inVAt8lvtFJxlJ7_Jv90jcEo222Y7k5c-fYKU6Qvq6tT_E5dcURC7TpoA8-3N2QoDX0LHBrAp9I_gDQzAgkeoRYeUWHQaAAAEPY';		// access_token是公众号的全局唯一接口调用凭据
	// 获取用户基本信息(UnionID机制)
	$url2 = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=".$access_token."&openid=".$openid."&lang=zh_CN";
	$res2 = httpCurl($url2,'get');
	var_dump($res2);
*/


function httpCurl($url,$type='get',$res='json',$arr=''){
	//$appid = "";
	//$appsecret = "";
	//$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appid."&secret=".$appsecret;
	// 1. 初始化curl句柄
	$ch = curl_init();
	// 2. 设置curl的参数，包括URL
	curl_setopt($ch,CURLOPT_URL,$url);
	// 设置为false会直接输出内容到页面（如echo）;true需要一个$res变量接收
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	// 跳过ssl检查项
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	if($type == 'post'){
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $arr);
	}
	// 3. 执行并获取HTML文档内容
	$output = curl_exec($ch);
	if($output === FALSE ){
		echo "CURL Error:".curl_error($ch);
	}
	curl_close($ch);
	if($res == 'json'){
		return json_decode($output,true);
	}
	//return json_decode($output,true);
}