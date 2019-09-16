<?php
header("Content-type:text/html;charset=gbk");

//填入论坛的登陆页面地址
$ch = curl_init("http://www.zuanke8.com/member.php?mod=logging&action=login");
curl_setopt($ch, CURLOPT_HEADER, 0);
// 将获取数据返回
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$contents = curl_exec($ch);
curl_close($ch);
preg_match('/<input\s*type="hidden"\s*name="formhash"\s*value="(.*?)"\s*\/>/i', $contents, $formhash);
preg_match('/loginhash=(\w*)/i', $contents, $loginhash);

// POST数据，获取COOKIE
$cookie_file = dirname(__FILE__) . '/cookie.txt';
// 登录
$ch = curl_init("http://www.zuanke8.com/member.php?mod=logging&action=login&loginsubmit=yes&loginhash=".$loginhash[1]."&inajax=1");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
$data = array(
    "formhash" => $formhash[1],
    "referer" => "http://www.zuanke8.com/",
    "loginfield" => "username",
    "username" => "",
    "password" => md5(""),
    "questionid" => 4,
    "answer" => mb_convert_encoding('小白', "gbk"),
    "cookietime" => "2592000"
);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);
curl_exec($ch);
curl_close($ch);




// 先打开页面，带着上面得到的COOKIE获取需要登录后才能查看的页面内容
$ch = curl_init("http://www.zuanke8.com/home.php?mod=spacecp&ac=credit&op=buy&accept=1");
curl_setopt($ch, CURLOPT_HEADER, 0);
// 将获取数据返回
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// 带上cookie
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);
$contents = curl_exec($ch);
curl_close($ch);
preg_match('/<input\s*type="hidden"\s*name="formhash"\s*value="(.*?)"\s*\/>/i', $contents, $formhash2);
// 去请求
$ch = curl_init("http://www.zuanke8.com/home.php?mod=spacecp&ac=credit&op=buy&inajax=1");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POST, 1);
$data2 = array(
    "formhash" => $formhash2[1],
    "addfundssubmit" => "true",
    "handlekey" => "buycredit",
    "bank_type" => "alipay",
    "addfundamount" => "1000"
);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);
$contents = curl_exec($ch);
curl_close($ch);

echo $contents;

//清理cookie文件
//unlink($cookie_file);

