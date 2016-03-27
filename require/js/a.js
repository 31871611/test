//define 从名字就可以看出这个api是用来定义一个模块


define(function(){
    var dialog=function(){
        alert("dialog");
    };
    return dialog;
});

/**

//弹窗
define(function(){
    var dialog=function(opt){
        opt=opt || {};

        this.opt=opt;
        var _index=index++;
        var html=mstmpl(_html,{         //mstmpl是个模板引擎
            title:opt.title,
            body:opt.body || "",
            bottom:opt.bottom || "",
            index:_index,
            zIndex:Zindex++,
            textStyle:opt.textStyle,
            width:opt.width || 400,
            notShow:opt.notShow
        });
        $("body").append(html);
        $("body").append('<div class="dialog_bg" style="z-index:100"></div>');
        this.el=$("#dialog_"+_index);

        //没有底部的结构就不需要事件绑定
        if(!opt.bottom){
            this.cancelButton=$("#dialog_cancel_"+_index);
            //............
        }

    };
    return dialog;
});

**/



