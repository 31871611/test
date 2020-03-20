
function o2o_edit(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}

/*添加或者编辑缩小的屏幕*/
function o2o_s_edit(title,url,w,h){
	layer_show(title,url,w,h);
}
/*-删除*/
function o2o_del(url){
	
	layer.confirm('确认要删除吗？',function(index){
		window.location.href=url;
	});
}

$('.listorder input').blur(function(){
	// 获取主键id
	var id = $(this).attr('attr-id');
	// 获取排序的值
	var listorder = $(this).val();
	var postData = {
		'id' : id,
		'listorder' : listorder
	}
	// 获取地址
	var url = SCOPE.listorder_url
	$.post(url,postData,function(res){
		if(res.code == 1){
			location.href = res.data
		}else{
			alert(res.msg)
		}
	})
})


