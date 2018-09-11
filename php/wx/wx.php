<?php


	//1.将timestamp，nonce，token按字典排序
		$timestamp = $_GET['timestamp'];	// 时间
		$nonce = $_GET['nonce']				// 随机字符串
		$token = 'weixin';					// 微信公众平台手动输入值
		$signature = $_GET['signature']
		$array = array($timestamp,$nonce,$token);
		sort($array);
	//2.将排序后的三个参数拼接之后用sha1加密
		$tmpstr = implode('',$array);	// join
		$tmpstr = sha1($tmpstr);
	//3.将加密后的字符串与signature进行对比，判断该请求是否来自微信
		if($tmpstr == $signature){
			echo $_GET['echostr'];
			exit;
		}