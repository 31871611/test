<?php

$callback = $_GET['callback'];      //jQuery21407888349741922729_1471334762552
//$callback = $_GET['_'];             //1471334762553
//$callback = 1;

$arr = array();
$arr["msg"]="this is a jquery jsonp test message!";

echo $callback . '(' . json_encode($arr) . ')';
//echo $callback;



/**
 *
    <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.js"></script>

    $.ajax({
        type : "GET",
        url : "http://192.168.1.165/jizhenfang-php2/test.php",
        dataType : "jsonp",
        jsonp: 'callback',
        success : function(json){
            console.log(json);
            return true;
        }
    });

*
*/

/**

    this.$http.jsonp('http://192.168.1.165/jizhenfang-php2/test.php',{jsonp:'callback'}).then(function (response) {

        // get status
        alert(response.status);

        // get all headers
        //console.log(response.headers());

        // get 'expires' header
        //console.log(response.headers('expires'));

        // set data on vm
        //                this.$set('lists', response)
        console.log(response);

    },{
        //headers: {'Content-Type': 'Access-Control-Allow-Origin'}
    }, function (response) {
        // error callback
    });

 *
 */