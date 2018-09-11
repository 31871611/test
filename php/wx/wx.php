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

			// $myfile = fopen("err.txt", "w") or die("Unable to open file!");
			// fwrite($myfile, $info);
			// fclose($myfile);
			
			/*
				回复文本消息（xml需要去除空格）
				<xml> <ToUserName>< ![CDATA[toUser] ]></ToUserName> <FromUserName>< ![CDATA[fromUser] ]></FromUserName> <CreateTime>12345678</CreateTime> <MsgType>< ![CDATA[text] ]></MsgType> <Content>< ![CDATA[你好] ]></Content> </xml>
			 */
		}
	}else if(strtolower($postObj->MsgType) == 'text'){
		// 收到用户信息
		if($postObj->Content == 'ok'){
			$toUser = $postObj->FromUserName;
			$fromUser = $postObj->ToUserName;
			$time = time();
			$msgtype = 'text';
			$content = '回复';
			$template = "<xml>
			<ToUserName><![CDATA[%s]]></ToUserName>
			<FromUserName><![CDATA[%s]]></FromUserName>
			<CreateTime>%s</CreateTime>
			<MsgType><![CDATA[%s]]></MsgType>
			<Content><![CDATA[%s]]></Content>
			</xml>";
			$info = sprintf($template, $toUser, $fromUser, $time, $msgtype, $content);
			echo $info;
		}
	}

}