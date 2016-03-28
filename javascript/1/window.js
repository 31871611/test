define(["jquery"],function($){
    function Window(){
        this.cfg={
            width:500,
            height:300,
            title:"系统消息",
            content:"",
            handler:null,
            hasCloseBtn:false,
            skinClassName:null,         //皮肤
            text4AlertBtn:"确定",         //按钮文字
            handler4AlertBtn:null,      //给关闭按钮添加回调接口
            handler4CloseBtn:null       //给关闭按钮添加回调接口
        }
    }
    Window.prototype={
        alert:function(cfg){
            var CFG=$.extend(this.cfg,cfg);

            var boundingBox=$(
                '<div class="window_boundingBox">' +
                    '<div class="window_title">'+CFG.title+'</div>'+
                    '<div class="window_body">'+CFG.content+'</div>'+
                    '<div class="window_footer"><input type="button" class="window_alertBtn" value="'+CFG.text4AlertBtn+'" /></div>'+
                '</div>'
            );
            //btn=boundingBox.find(".window_footer input");
            btn=boundingBox.find(".window_alertBtn");
            boundingBox.appendTo("body");
            //boundingBox.html(CFG.content);
            //btn.appendTo(boundingBox);

            btn.click(function(){
                CFG.handler4AlertBtn && CFG.handler4AlertBtn();
                boundingBox.remove();
            });

            boundingBox.css({
                width:CFG.width+"px",
                height:CFG.height+"px",
                left:(CFG.x || (window.innerWidth-CFG.width) / 2) + "px",
                top:(CFG.y || (window.innerHeight-CFG.height) / 2) + "px"
            });

            if(CFG.hasCloseBtn){
                var closeBth=$('<span class="window_closeBtn">x</span>');
                closeBth.appendTo(boundingBox);
                closeBth.click(function(){
                    CFG.handler4CloseBtn && CFG.handler4CloseBtn();
                    boundingBox.remove();
                });
            }

            if(CFG.skinClassName){
                boundingBox.addClass(CFG.skinClassName);
            }
        },
        confirm:function(){
            console.log("confirm");
        },
        prompt:function(){
            console.log("prompt");
        }
    };
    return{
        Window:Window
    }
});