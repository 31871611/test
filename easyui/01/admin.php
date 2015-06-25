<?php
session_start();
//连接数据库
require "config.php";
//验证是否有登录数据
if(!isset($_SESSION["admin"])){
    header("location:login.php");
}
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>后台</title>
    <link rel="stylesheet" type="text/css" href="easyui/themes/default/easyui.css" />
    <link rel="stylesheet" type="text/css" href="easyui/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="css/admin.css" />
</head>
<body class="easyui-layout">
<div data-options="region:'north',title:'header',split:true,noheader:true" style="height:60px;background:#666;">
    <div class="logo">后台管理</div>
    <div class="logout">您好，<?php echo $_SESSION['admin']?> | <a href="logout.php">退出</a></div>
</div>
<div data-options="region:'south',title:'footer',split:true,noheader:true" style="height:35px;line-height:30px;text-align:center;">
    ©2009-2015 瓢城 Web 俱乐部. Powered by PHP and EasyUI.
</div>
<div data-options="region:'west',title:'导航',split:true,iconCls:'icon-world'" style="width:180px;padding:10px;">
    <ul id="nav"></ul>
</div>
<div data-options="region:'center'" style="overflow:hidden;">
    <div id="tabs">
        <div title="起始页" iconCls="icon-house" style="padding:0 10px;display:block;">
            <p>欢迎来到后台管理系统！</p>
        </div>
    </div>
</div>
</body>
<script type="text/javascript" src="easyui/jquery.min.js"></script>
<script type="text/javascript" src="easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/admin.js"></script>
</html>
