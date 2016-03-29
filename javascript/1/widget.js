//定义widget抽象类
//让需要自定义功能的js继承widget来实现自定义事件

//为widget类设计统一生命周期

define(["jquery"],function($){
    function Widget(){
        this.handlers={};
        this.boundingBox=null;      //属性：最外层容器
    }

    Widget.prototype={
        on:function(type,handler){
            if(typeof this.handlers[type] == "undefined"){
                this.handlers[type]=[];
            }
            this.handlers[type].push(handler);
            //连缀语法
            return this;
        },
        fire:function(type,data){
            if(this.handlers[type] instanceof Array){
                var handlers=this.handlers[type];
                for(var i= 0,len=handlers.length;i<len;i++){
                    handlers[i](data);
                }
            }
        },
        renderUI:function(){},          //接口：添加dom节点
        bindUI:function(){},            //接口：监听事件
        syncUI:function(){},            //接口：初始化组件属性
        render:function(container){     //方法：渲染组件
            this.bindUI();
            this.handlers={};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingBox);
        },
        destructor:function(){},        //接口：销毁前的处理函数
        destroy:function(){             //方法：销毁组件
            this.destructor();
            this.boundingBox.off();
            this.boundingBox.remove();
        }
    };
    return{
        Widget:Widget
    }

});







