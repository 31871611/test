define(["widget","jquery","jqueryUI"],function(widget,$,$UI){
    function Window(){
        this.cfg={
            width:500,
            height:300,
            title:"系统消息",
            content:"",
            handler:null,
            hasCloseBtn:false,
            hasMask:true,               //是否显示遮罩
            isDraggable:true,           //拖动
            dragHandle:null,            //可拖动的区域
            skinClassName:null,         //皮肤
            text4AlertBtn:"确定",       //按钮文字
            handler4AlertBtn:null,      //给关闭按钮添加回调接口
            handler4CloseBtn:null       //给关闭按钮添加回调接口
        };
        this.handlers={}
    }
    //jquery继承
    Window.prototype= $.extend({},new widget.Widget(),{
        //自定义事件
        //观察者模式
        //优点：跳出原生事件的限制，提高封闭的抽象层级
        //抽离成widget.js
        //on:function(type,handler){
        //    if(typeof this.handlers[type] == "undefined"){
        //        this.handlers[type]=[];
        //    }
        //    this.handlers[type].push(handler);
        //    //连缀语法
        //    return this;
        //},
        //fire:function(type,data){
        //    if(this.handlers[type] instanceof Array){
        //        var handlers=this.handlers[type];
        //        for(var i= 0,len=handlers.length;i<len;i++){
        //            handlers[i](data);
        //        }
        //    }
        //},
        alert:function(cfg){
            var CFG=$.extend(this.cfg,cfg);

            var boundingBox=$(
                '<div class="window_boundingBox">' +
                    '<div class="window_header">'+CFG.title+'</div>'+
                    '<div class="window_body">'+CFG.content+'</div>'+
                    '<div class="window_footer"><input type="button" class="window_alertBtn" value="'+CFG.text4AlertBtn+'" /></div>'+
                '</div>'
            );
            //btn=boundingBox.find(".window_footer input");
            btn=boundingBox.find(".window_alertBtn");
            mask=null;
            that=this;
            if(CFG.hasMask){
                mask=$('<div class="window_mask"></div>');
                mask.append("body");
            }
            boundingBox.appendTo("body");
            //boundingBox.html(CFG.content);
            //btn.appendTo(boundingBox);

            btn.click(function(){
                //CFG.handler4AlertBtn && CFG.handler4AlertBtn();
                boundingBox.remove();
                mask && mask.remove();
                that.fire("alert");
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
                    //CFG.handler4CloseBtn && CFG.handler4CloseBtn();
                    boundingBox.remove();
                    mask && mask.remove();
                    that.fire("close");
                });
            }

            if(CFG.handler4AlertBtn){
                this.on("alert",CFG.handler4AlertBtn);
            }
            if(CFG.handler4CloseBtn){
                this.on("close",CFG.handler4CloseBtn);
            }

            if(CFG.skinClassName){
                boundingBox.addClass(CFG.skinClassName);
            }
            if(CFG.isDraggable){
                if(CFG.dragHandle){
                    boundingBox.draggable({handle:CFG.dragHandle});
                }else{
                    boundingBox.draggable();
                }
            }

            //连缀语法
            return this;
        },
        confirm:function(){
            console.log("confirm");
        },
        prompt:function(){
            console.log("prompt");
        }
    });
    return{
        Window:Window
    }
});