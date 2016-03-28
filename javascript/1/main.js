require.config({
    paths:{
        jquery:"../../public/js/jquery-1.8.3.min"
    }
});

require(["jquery","window"],function($,w){
    $("#a").on("click",function(){
        new w.Window().alert({
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
            text4AlertBtn:"ok",
            handler4AlertBtn:function(){
                alert("点击了确定");
            },
            handler4CloseBtn:function(){
                alert("点击了关闭");
            }
        })
    });
});