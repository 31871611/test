/**
 * Created by Administrator on 2015/6/24.
 */
$(function(){
    $("#nav").tree({
        url:"nav.php",
        lines:true,
        onLoadSuccess:function(node,data){
            if(data){
                $(data).each(function(index,value){
                    if(this.state == "closed"){
                        $("#nav").tree("expandAll");
                    }
                });
            }
        },
        onClick:function(node){
            if(node.url){
                if ($('#tabs').tabs('exists', node.text)) {
                    $('#tabs').tabs('select', node.text)
                } else {
                    $('#tabs').tabs('add', {
                        title: node.text,
                        closable: true,
                        iconCls : node.iconCls,
                        href : node.url + '.php'
                    });
                }
            }
        }

    });


    $('#tabs').tabs({
        fit : true,
        border : false,
    });
});
