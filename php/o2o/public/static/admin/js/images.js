$(function(){
    $('#file_upload').uploadify({
        'swf' : SCOPE.uploadify_swf,
        'uploader' : SCOPE.images_upload,
        'buttonText' : '图片上传',
        'fileTypeDesc' : 'Image files',
        'fileObjName':'file',
        'fileTypeExts' : '*.gif;*.png;*.jpg',
        'onUploadSuccess' : function(file,data,response){
            //console.log(file,data,response)
            var obj = JSON.parse(data);
            console.log(obj);
            $('#upload_org_code_img').attr("src",obj.data).show();
            $('#file_upload_image').val(obj.data)
        }
    })

    $('#file_upload_other').uploadify({
        'swf' : SCOPE.uploadify_swf,
        'uploader' : SCOPE.images_upload,
        'buttonText' : '图片上传',
        'fileTypeDesc' : 'Image files',
        'fileObjName':'file',
        'fileTypeExts' : '*.gif;*.png;*.jpg',
        'onUploadSuccess' : function(file,data,response){
            //console.log(file,data,response)
            var obj = JSON.parse(data);
            $('#upload_org_code_img_other').attr("src",obj.data).show();
            $('#file_upload_image_other').val(obj.data);
        }
    })

})
