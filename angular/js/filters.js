//过滤器
var myAppFilter=angular.module("myAppFilter",[]);

myAppFilter.filter("capitalize",function(){
    return function(input){
        if(input){
            return input[0].toUpperCase() + input.slice(1);
        }
    }
});

//过滤首字母小写转大写
myAppFilter.filter("titleCase",function(){
    var titleCaseFilter=function(input){
        var words=input.split(" ");
        for(var i= 0;i<words.length;i++){
            words[i]=words[i].charAt(0).toUpperCase()+words[i].slice(1);
        }
        return words.join(" ");
    };
    return titleCaseFilter;
});