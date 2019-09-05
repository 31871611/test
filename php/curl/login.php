<?php
header("Content-type:text/html;charset=gbk");

//填入论坛的登陆页面地址
$ch = curl_init("http://www.zuanke8.com/member.php?mod=logging&action=login");
curl_setopt($ch, CURLOPT_HEADER, 0);
// 将获取数据返回
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$contents = curl_exec($ch);
curl_close($ch);
preg_match('/<input\s*type="hidden"\s*name="formhash"\s*value="(.*?)"\s*\/>/i', $contents, $matches);
$formhash = "";
if(!empty($matches)) {
    $formhash = $matches[1];
} else {
    die('Not found the forumhash.');
}
//POST数据，获取COOKIE
$cookie_file = dirname(__FILE__) . '/cookie.txt';
$ch = curl_init("http://www.zuanke8.com/member.php?mod=logging&action=login&loginsubmit=yes&loginhash=LL5R5&inajax=1");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
$data = array(
    "formhash" => $formhash,
    "referer" => "http://www.zuanke8.com/re.php",
    "loginfield" => "username",
    "username" => "",
    "password" => md5(""),
    "questionid" => "4",
    "answer" => mb_convert_encoding('小白', "gbk"),
    "cookietime" => "2592000"
);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);
$res = curl_exec($ch);
curl_close($ch);
echo ($res);

/*
//带着上面得到的COOKIE获取需要登录后才能查看的页面内容
$ch = curl_init("http://www.zuanke8.com/thread-6358323-1-1.html");
curl_setopt($ch, CURLOPT_HEADER, 0);
//curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);
curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);
$contents = curl_exec($ch);
curl_close($ch);

var_dump($contents);
*/
