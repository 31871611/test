require.config({
    paths:{
        jquery:"../../public/js/jquery-1.8.3.min",
        jqueryUI:"http://code.jquery.com/ui/1.10.4/jquery-ui"
    }
});

require(["jquery","window"],function($,w){
    $("#a").on("click",function(){
        var win=new w.Window();
        win.alert({
            title:"提示",
            content:"welcome!",
            //handler:function(){
            //    alert("点击了确定");
            //},
            width:300,
            height:150,
            y:50,
            hasCloseBtn:true,
            skinClassName:"window_skin_a",
            dragHandle:".window_header",
            text4AlertBtn:"ok",
            handler4AlertBtn:function(){
                alert("点击了确定");
            },
            handler4CloseBtn:function(){
                alert("点击了关闭");
            }
        }).on("alert",function(){
            alert("the second alert handler");
        }).on("alert",function(){
            alert("the third alert handler");
        });
        win.on("close",function(){
            alert("the second close handler");
        });
    });
});