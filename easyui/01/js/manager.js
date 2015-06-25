$(function(){

    $("#manager").datagrid({
        url:"manager_data.php",
        fit : true,
        fitColumns : true,
        striped : true,
        rownumbers : true,
        border : false,
        pagination : true,
        pageSize : 20,
        pageList : [10, 20, 30, 40, 50],
        pageNumber : 1,
        sortName : 'date',
        sortOrder : 'desc',
        toolbar : '#manage_tool',
        columns : [[
            {
                field : 'id',
                title : '自动编号',
                width : 100,
                checkbox : true
            },
            {
                field : 'manager',
                title : '管理员帐号',
                width : 100
            },
            {
                field : 'auth',
                title : '拥有权限',
                width : 100
            },
            {
                field : 'date',
                title : '创建时间',
                width : 150
            }
        ]]
    })
});
