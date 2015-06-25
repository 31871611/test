<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/6/24
 * Time: 15:26
 */
session_start();
//连接数据库
require "config.php";

//ajax提交数据
$manager=$_POST["manager"];
$password=sha1($_POST["password"]);

//
$query=mysql_query("select id from easyui_admin where manager='$manager' and password='$password' limit 1") or die('sql错误：'.mysql_error());;

//
if(mysql_fetch_array($query,MYSQL_ASSOC)){
    $_SESSION["admin"]=$manager;
    echo 1;
}else{
    echo 0;
}
