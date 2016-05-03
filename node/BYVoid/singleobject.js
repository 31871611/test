//把一个对象封装到模块中

function Hello(){
    var name;

    this.setName=function(thyName){
        name=thyName;
    };

    this.sayHello=function(){
        console.log("Hello"+name);
    }
}

//在其它文件中需要通过require('./singleobject').Hello来获取Hello对象;
exports.Hello=Hello;

//简化方式，require('./singleobject')
module.exports=Hello;