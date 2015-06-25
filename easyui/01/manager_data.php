<?php
session_start();
//连接数据库
require "config.php";

$page=$_POST["page"];
$pageSize=$_POST["rows"];
$first=$pageSize * ($page-1);
$order=$_POST["order"];
$sort=$_POST["sort"];



$query=mysql_query("select id,manager,auth,date from easyui_admin ORDER by $sort $order limit $first,$pageSize") or die('sql错误：'.mysql_error());
$total=mysql_num_rows(mysql_query("select id,manager,auth,date from easyui_admin"));


$json="";

while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
    $json .= json_encode($row) . ",";
}

$json = substr($json , 0 , -1);
echo '{"total":'.$total.',"rows":['.$json.']}';
mysql_close();
