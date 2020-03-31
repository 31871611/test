
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
	},'json')
})

// 城市相关二级内容
$('.cityId').change(function(){
	var city_id = $(this).val();
	var url = SCOPE.city_url
	var postData = {
		'id' : city_id
	}
	$.post(url,postData,function(res){
		if(res.status == 1){
			var data = res.data;
			var city_html = "";
			console.log(data)
			$(data).each(function(i){
				city_html = "<option value='"+this.id+"'>"+this.name+"</option>"
			})
			$('.se_city_id').html(city_html)
		}else{
			$('.se_city_id').html('<option value="0">--请选择--</option>')
		}
	},'json')
})


// 分类相关二级内容
$('.categoryId').change(function(){
	var categoryId = $(this).val();
	var url = SCOPE.category_url
	var postData = {
		'id' : categoryId
	}
	$.post(url,postData,function(res){
		if(res.status == 1){
			var data = res.data;
			var category_html = "";
			$(data).each(function(i){
				category_html += '<label>'+this.name+'<input name="se_category_id[]" type="checkbox" value="'+this.id+'"></label>&nbsp;&nbsp;&nbsp;';
			})
			$('.se_category_id').html(category_html)
		}else{
			$('.se_category_id').html('')
		}
	},'json')
})



