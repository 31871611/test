//指令
var myAppDirective=angular.module("myAppDirective",[]);

myAppDirective.directive("myBaidu",function(){
    return{
        restrict:"A",
        replace:true,
        scope:{
            myUrl:'@',
            myLinkText:'@'
        },
        template:'<a href="{{myUrl}}" target="_blank">{{myLinkText}}</a>'
    }
});

myAppDirective.directive("mySome",function(){
    return{
        restrict:"A",
        replace:true,
        scope:{
            myUrl:'@someAttr',
            myLinkText:'@'
        },
        template:'<a href="{{myUrl}}" target="_blank">{{myLinkText}}</a>'
    }
});

myAppDirective.directive("myUrlmodel",function(){
    return{
        restrict:"A",
        replace:true,
        scope:{
            myUrl:'@someAttr',
            myLinkText:'@'
        },
        template:'<a href="{{myUrl}}" target="_blank">{{myLinkText}}</a>'
    }
});

myAppDirective.directive("myMain",function(){
    return{
        restrict:"A",
        scope:{},
        priority:100,
        template:'<div>inside myMain{{myProperty}}</div>'
    }
});


myAppDirective.directive("myScope",function(){
    return{
        restrict:"A",
        template:'<div>inside myDirective,i...{{myProperty}}</div>',
        scope:{}
    }
});

myAppDirective.directive("myInheritScopeDirective",function(){
    return{
        restrict:"A",
        template:'<div>inside myDirective,i...{{myProperty}}</div>',
        scope:true
    }
});

myAppDirective.directive("sidebox",function(){
    return{
        restrict:"EA",
        scope:{
            title:'@'
        },
        transclude:true,
        template:'<div class="sidebox"><div class="content"><h2 class="header">{{title}}</h2><span class="content" ng-transclude></span></div></div>'
    }
});

myAppDirective.directive("link",function(){
    return{
        restrict:"EA",
        transclude:true,
        controller:function($scope,$element,$transclude,$log){
            $transclude(function(clone){
                var a=angular.element("<a>");
                a.attr("href",clone.text());
                a.text(clone.text());
                $log.info("偏偏");
                $element.append(a);
            })
        }
    }
});

myAppDirective.directive("ngbkFocus",function(){
    return{
        link:function(scope,element,attrs,controller){
            element[0].focus();
        }
    }
});
