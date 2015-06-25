<?php
session_start();
//连接数据库
require "config.php";

$id=isset($_POST["id"]) ? $_POST["id"] : 0;

$query=mysql_query("select * from easyui_nav where nid='$id'") or die('sql错误：'.mysql_error());;

$json="";

while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
    $json .= json_encode($row) . ",";
}

$json = substr($json , 0 , -1);
echo "[".$json."]";
mysql_close();
