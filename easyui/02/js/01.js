$(function(){

/**
 *
    //拖动组件
    $("#draggable").draggable({
        handle:"#pox"
    });

    //放置
    $("#droppable").droppable({
        accept:"#draggable",
        onDragEnter:function(e,source){
            console.log(source);
            $(this).css("background","orange");
        }
    });
 */
    //调整大小(拖动边缘调整)
    $("#resizable").resizable({
        handles:"e",    //只有右边（东边）可以拖动
        maxWidth:500,   //最大拖动值
        maxHeight:500
    });

    //提示框
    $("#Tooltip").tooltip({
        position:"bottom",
        content:"<div>提示内容</div>",
        trackMouse:true,
        showEvent:"click",
        onShow:function(e){
            $(this).tooltip('tip').css({
                background:"#666"
            })
        }
    });

    //按钮
    $("#LinkButton").linkbutton({
        iconCls:'icon-search',
        toggle:true,

    });

    //进度条
    $("#ProgressBar").progressbar({
        value:60,
    });
    //获取值和设置值
//    var value = $('#ProgressBar').progressbar('getValue');
//    if (value < 100){
//        value += Math.floor(Math.random() * 10);
//        $('#ProgressBar').progressbar('setValue', value);
//    }

    //面板
    $("#Panel").panel({
        width:500,
        height:300,
        title:"标题",
        iconCls:"icon-cut",
        collapsible:true,
        closable:true,

    })


});