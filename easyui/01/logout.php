<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/6/24
 * Time: 16:12
 */
session_start();
session_destroy();
header('location:login.php');