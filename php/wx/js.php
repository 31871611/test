<?php

function httpCurl($url,$type='get',$res='json',$arr=''){
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

// 获取或保存accessToken
function getWxAccessToken(){
    session_start();
    // 将accessToken存在session|cookie中
    if($_SESSION['accessToken'] && $_SESSION['exprire_time'] > time()){
        // 如果accessToken在session并没有过期
        return $_SESSION['accessToken'];
    }else{
        // 如果accessToken不存在或者已经过期，重新取accessToken
        $appid = "wx95bac0e57d09ec49";
        $appsecret = "54c9bcca2c27b3c78c50dde1261c04fc";
        $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".$appid."&secret=".$appsecret;
        $res = httpCurl($url,'get','json');
        $accessToken = $res['access_token'];
        $_SESSION['accessToken'] = $accessToken;
        $_SESSION['exprire_time'] = time()+7000;
        return $accessToken;
    }
}


// 获取jsapi_ticket用于生成JS-SDK权限验证的签名
function getJsApiTicket(){
    session_start();
    if($_SESSION['jsapi_ticket_expire_time'] > time() && $_SESSION['jsapi_ticket']){
        $jsapi_ticket = $_SESSION['jsapi_ticket'];
    }else{
        $access_token = getWxAccessToken();
        $url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=".$access_token."&type=jsapi";
        $res = httpCurl($url,'get');
        $jsapi_ticket = $res['ticket'];
        $_SESSION['jsapi_ticket'] = $jsapi_ticket;
        $_SESSION['jsapi_ticket_expire_time'] = time()+7000;
    }
    return $jsapi_ticket;
}


// 随机字符串
function getRandCode($length = 16) { 
    $array = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l","m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y","z", 
                    "A", "B", "C", "D","E", "F", "G", "H", "I", "J", "K", "L","M", "N", "O","P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y","Z",
                    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"); 
    $tmpstr = "";
    $max = count($array);
    for($i = 0; $i < $length; $i++) {
        $key = rand(0,$max-1);
        $tmpstr .= $array[$key];
    }
    return $tmpstr;
}

$time = time();
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$nonceStr = getRandCode();
$jsapi_ticket = getJsApiTicket();
$signature = "jsapi_ticket=".$jsapi_ticket."&noncestr=".$nonceStr."&timestamp=".$time."&url=".$url;


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <title>Title222</title>
    <script src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
</head>
<body>

<?php echo $signature;?>
<?php echo '<br />';?>
<?php echo sha1($signature);?>

</body>
<script>

    wx.config({
        debug: true,    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx95bac0e57d09ec49',                    // 必填，公众号的唯一标识
        timestamp: '<?php echo $time;?>',              // 必填，生成签名的时间戳
        nonceStr: '<?php echo $nonceStr;?>',        // 必填，生成签名的随机字符串
        signature: '<?php echo sha1($signature);?>',          // 必填，签名sha1(string1)
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]   // 必填，需要使用的JS接口列表
    });


    wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。

        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        wx.onMenuShareTimeline({
            title: '分享到朋友圈',            // 分享标题
            link: 'https://www.hxhysc.com/q.html',       // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://mat1.gtimg.com/www/qq2018/imgs/qq_logo_2018x2.png',     // 分享图标
            success: function () {
                // 用户点击了分享后执行的回调函数
                alert('分享到朋友圈alert');
            }
        })

        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        wx.onMenuShareAppMessage({
            title: '分享给朋友',             // 分享标题
            desc: '分享给朋友描述',           // 分享描述
            link: 'https://www.hxhysc.com/q.html',      // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'http://mat1.gtimg.com/www/qq2018/imgs/qq_logo_2018x2.png', // 分享图标
            type: '',   // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户点击了分享后执行的回调函数
                alert('分享给朋友alert');
            }
        });


        wx.error(function(res){
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });

    });
    
</script>
</html>