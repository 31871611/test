<?php

	if(isset($_GET['echostr'])){
		//1.将timestamp，nonce，token按字典排序
			$timestamp = $_GET['timestamp'];	// 时间
			$nonce = $_GET['nonce'];			// 随机字符串
			$token = 'weixin';					// 微信公众平台手动输入值
			$signature = $_GET['signature'];
			$echostr = $_GET['echostr'];
			$array = array($timestamp,$nonce,$token);
			sort($array);
		//2.将排序后的三个参数拼接之后用sha1加密
			$tmpstr = implode('',$array);	// join
			$tmpstr = sha1($tmpstr);
		//3.将加密后的字符串与signature进行对比，判断该请求是否来自微信
			if($tmpstr == $signature){
				// 第一次接入weixin api接口的时候
				header('content-type:text');
				echo $echostr;
				exit;
			}
	}else{
		// 第二次
		//include './reponseMsg.php';
		reponseMsg();
	}



// 接收事件推送并回复
function reponseMsg(){

	// 1.获取到微信推送过来post数据(xml格式)
	//$postArr = $GLOBALS['HTTP_RAW_POST_DATA'];
	$postArr = file_get_contents("php://input");	// php7版本使用
	// 2.处理消息类型，并设置回复类型和内容（关注/取消关注事件）
	$postObj = simplexml_load_string($postArr);	
	/*
	$postObj->ToUserName = '';			// 开发者微信号
	$postObj->FromUserName = '';		// 发送方帐号（一个OpenID）
	$postObj->CreateTime = '';			// 消息创建时间 （整型）
	$postObj->MsgType = '';				// 消息类型，event
	$postObj->Event = '';				// 事件类型，subscribe(订阅)、unsubscribe(取消订阅)
	*/

	//$myfile = fopen("err.txt", "w") or die("Unable to open file!");
	//fwrite($myfile, '111111');
	//fclose($myfile);

	// 判断该数据包是否订阅的事件推送
	if(strtolower($postObj->MsgType) == 'event'){
		// 如果是关注subscribe事件，回复用户消息
		if(strtolower($postObj->Event == 'subscribe')){
			$toUser = $postObj->FromUserName;
			$fromUser = $postObj->ToUserName;
			$time = time();
			$msgtype = 'text';
			$content = '欢迎关注我的微信公众号';
			$template = "<xml>
			<ToUserName><![CDATA[%s]]></ToUserName>
			<FromUserName><![CDATA[%s]]></FromUserName>
			<CreateTime>%s</CreateTime>
			<MsgType><![CDATA[%s]]></MsgType>
			<Content><![CDATA[%s]]></Content>
			</xml>";
			$info = sprintf($template, $toUser, $fromUser, $time, $msgtype, $content);
			echo $info;
			exit;

			// $myfile = fopen("err.txt", "w") or die("Unable to open file!");
			// fwrite($myfile, $info);
			// fclose($myfile);
			
			/*
				回复文本消息（xml需要去除空格）
				<xml> <ToUserName>< ![CDATA[toUser] ]></ToUserName> <FromUserName>< ![CDATA[fromUser] ]></FromUserName> <CreateTime>12345678</CreateTime> <MsgType>< ![CDATA[text] ]></MsgType> <Content>< ![CDATA[你好] ]></Content> </xml>
			 */
		}

		// 自定义菜单事件---点击菜单拉取消息时的事件推送
		if(strtolower($postObj->EventKey) == "item1"){
			$content = '这是item1菜单的事件推送';
			echo text($postObj,$content);
		}
		if(strtolower($postObj->EventKey) == "songs"){
			$content = '这是歌曲菜单的事件推送';
			echo text($postObj,$content);
		}

	}else if(strtolower($postObj->MsgType) == 'text'){
		// 收到用户信息
		switch (trim($postObj->Content)) {
			case '1':
				$content = '您输入的数字是1';
				echo text($postObj,$content);
				break;
			case '2':
				$content = '您输入的数字是2';
				echo text($postObj,$content);
				break;
			case '3':
				$content = '您输入的数字是3'."\n".'双引号换行';
				echo text($postObj,$content);
				break;
			case '4':
				$content = '<a href="http://www.baidu.com">百度</a>';
				echo text($postObj,$content);
				break;
			case '图文':
				$arr = array(
					array(
						'title' => 'QQ',
						'description' => '描述',
						'picUrl' => 'http://mat1.gtimg.com/www/qq2018/imgs/qq_logo_2018x2.png',
						'url' => 'http://www.qq.com'
					),
					array(
						'title' => '百度',
						'description' => '描述2',
						'picUrl' => 'https://www.baidu.com/img/bd_logo1.png',
						'url' => 'http://www.baidu.com'
					)
				);
				echo photoText($postObj,$arr);
				break;
			default:
				$content = '没有您需要的信息，请换个关键字';
				echo text($postObj,$content);
				break;
		}
	}
}


// 回复文本消息
function text($postObj,$content){
	$toUser = $postObj->FromUserName;
	$fromUser = $postObj->ToUserName;
	$time = time();
	$msgtype = 'text';
	//$content = '回复';
	$template = "<xml>
	<ToUserName><![CDATA[%s]]></ToUserName>
	<FromUserName><![CDATA[%s]]></FromUserName>
	<CreateTime>%s</CreateTime>
	<MsgType><![CDATA[%s]]></MsgType>
	<Content><![CDATA[%s]]></Content>
	</xml>";
	return sprintf($template, $toUser, $fromUser, $time, $msgtype, $content);
}


// 回复图文消息
function photoText($postObj,$arr){
	$toUser = $postObj->FromUserName;
	$fromUser = $postObj->ToUserName;
	$time = time();
	$msgtype = 'news';
	$template = "<xml>
	<ToUserName><![CDATA[%s]]></ToUserName>
	<FromUserName><![CDATA[%s]]></FromUserName>
	<CreateTime>%s</CreateTime>
	<MsgType><![CDATA[%s]]></MsgType>
	<ArticleCount>".count($arr)."</ArticleCount>
	<Articles>";
	// 一条或多条图文
	foreach ($arr as $key => $value) {
		$template .= "<item>
		<Title><![CDATA[".$value['title']."]]></Title>
		<Description><![CDATA[".$value['description']."]]></Description>
		<PicUrl><![CDATA[".$value['picUrl']."]]></PicUrl>
		<Url><![CDATA[".$value['url']."]]></Url>
		</item>";
	}
	$template .="</Articles>
	</xml>";
	return sprintf($template, $toUser, $fromUser, $time, $msgtype);
}


// 获取微信服务器IP地址
function getWxServerIp(){
	$accessToken = "";
	$url = "https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=".$accessToken;
	// 1. 初始化curl句柄
	 $ch = curl_init();
	// 2. 设置curl的参数，包括URL
	curl_setopt($ch,CURLOPT_URL,$url);
	// 设置为false会直接输出内容到页面（如echo）;true需要一个$res变量接收
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	// 跳过ssl检查项
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	// 3. 执行并获取HTML文档内容
	$output = curl_exec($ch);
	if($output === FALSE ){
		echo "CURL Error:".curl_error($ch);
	}
	curl_close($ch);
	// $arr = json_decode($output,true);
	var_dump($output);
}


// 获取或保存accessToken
function getWxAccessToken(){
	session_start();
	// 将accessToken存在session|cookie中
	if($_SESSION['accessToken'] && $_SESSION['exprire_time'] > time()){
		// 如果accessToken在session并没有过期
		return $_SESSION['accessToken'];
	}else{
		// 如果accessToken不存在或者已经过期，重新取accessToken
		$appid = "";
		$appsecret = "54c9bcca2c27b3c78c50dde1261c04fc";
		$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appid."&secret=".$appsecret;
		$res = httpCurl($url,'get','json');
		$accessToken = $res['access_token'];
		$_SESSION['accessToken'] = $accessToken;
		$_SESSION['exprire_time'] = time()+7000;
		return $accessToken;
	}
}


// 创建微信菜单
function definedItem(){
	$accessToken = getWxAccessToken();
	// 目前微信接口的调用方式都是通过curl的post|get
	$url = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token='.$accessToken;
	$postArr = array(
		'button' => array(
			// 第一个一级菜单
			array(
				"name"=>urlencode("菜单一"),
		        "type"=>"click",
          		"key"=>"item1",
			),
			// 第二个一级菜单
			array(
				"name"=>urlencode("菜单二"),
				"sub_button"=>array(
					array(
						"name"=>urlencode("歌曲"),
		               "type"=>"click",
               			"key"=>"songs",
					),
					array(
						"name"=>urlencode("电影"),
                        "type"=>"view",
               			"url"=>"http://www.baidu.com",
					)
				)
			),
			array(
				"name"=>urlencode("菜单三"),
                "type"=>"view",
       			"url"=>"http://www.qq.com",
			)	
		)
	);
	$postJson = json_encode($postArr,true);
	$res = httpCurl($url,'post','json',urldecode($postJson));
	var_dump($res);
}


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



// 获取用户的openid
function getBaseInfo(){
	// 1.获取到code
	$appid = "wx95bac0e57d09ec49";
	$redirect_uri = urlencode("http://t3.hxhysc.cn/getUserOpenId.php");					// 授权后重定向的回调链接地址，需要添加到网页授权
	$scope = "snsapi_base";
	$url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$appid."&redirect_uri=".$redirect_uri."&response_type=code&scope=".$scope."&state=123#wechat_redirect";
	header('location:'.$url);
}

function getUserOpenId(){
	// 2.获取到网页授权的access_token
	$appid = "wx95bac0e57d09ec49";
	$appsecret = "54c9bcca2c27b3c78c50dde1261c04fc";
	$code = $_GET['code'];
	$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$appid."&secret=".$appsecret."&code=".$code."&grant_type=authorization_code";
	// 3.拉取用户的openid
	$res = httpCurl($url,'get');
	var_dump($res);
}



// snsapi_userinfo模式
function getUserDetail(){
	// 1.获取到code
	$appie = "wx95bac0e57d09ec49";
	$redirect_uri = urlencode("http://t3.hxhysc.cn/getUserInfo.html");
	$scope = "snsapi_userinfo";
	$url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$appie."&redirect_uri=".$redirect_uri."&response_type=code&scope=".$scope."&state=STATE#wechat_redirect";
	header('location:'.$url);
}

function getUserInfo(){
	// 2.获取到网页授权的access_token
	$appie = "wx95bac0e57d09ec49";
	$appsecret = "54c9bcca2c27b3c78c50dde1261c04fc";
	$code = $_GET['code'];
	$url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$appie."&secret=".$appsecret."&code=".$code."&grant_type=authorization_code";
	$res = httpCurl($url,'get');
	$access_token = $res['access_token'];
	$openid = $res['openid'];
	// 3.拉取用户详细信息
	$userinfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=".$access_token."&openid=".$openid."&lang=zh_CN";
	$res2 = httpCurl($url,'get');
	var_dump($res2);
}


