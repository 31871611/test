/**
 * Created by Administrator on 2015/6/24.
 */
$(function(){
    //登录界面
    $("#login").dialog({
        title:"登录后台",
        width:300,
        height:180,
        modal:true,
        iconCls:"icon-login",
        buttons:"#btn"
    });

    //管理员帐号验证
    $("#manager").validatebox({
        required:true,
        missingMessage:"请输入管理员帐号",
        invalidMessage:"管理员帐号不得为空"
    });
    //管理员密码验证
    $("#password").validatebox({
        required:true,
        validType:"length[6,30]",
        missingMessage:"请输入管理员密码",
        invalidMessage:"管理员密码不得为空"
    });
    //加载时判断验证
    if(!$("#manager").validatebox("isValid")){
        $("#manager").focus();
    }else if(!$("#password").validatebox("isValid")){
        $("#password").focus();
    }
    //点击登录
    $("#btn").find("a").click(function(){
        if(!$("#manager").validatebox("isValid")){
            $("#manager").focus();
        }else if(!$("#password").validatebox("isValid")){
            $("#password").focus();
        }else{
            $.ajax({
                type: "POST",
                url: "checklogin.php",
                data: {
                    manager:$("#manager").val(),
                    password:$("#password").val()
                },
                beforeSend:function(){
                    $.messager.progress({
                        test:"正在登录中..."
                    });
                },
                success: function(data,res,status){
                    if(data > 0){
                        location.href="admin.php";
                    }else{
                        $.messager.alert("登录失败！用户名与密码错误！","warning",function(){
                            $("#password").select();
                        });
                    }
                }
            });
        }
    })

});