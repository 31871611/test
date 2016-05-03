/*
exports是模块公开的接口
equire用于从外部获取一个模块的接口，即所获取模块的exports对象
*/


//创建模块
var name;

exports.setName=function(thyName){
    name=thyName;
};

exports.sayHello=function(){
    console.log('hello'+name);
};

//getmodule.js