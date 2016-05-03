var student=require("./student");
var teacher=require("./teacher");

function add(teacherName,students){
    teacher.add(teacherName);

    //很多学生
    students.forEach(function(item,index){
        student.add(item);
    })
}

exports.add=add;
//module.exports=add;