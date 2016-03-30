require(["vue"],function(Vue){

    var data1={
        message:"hello vue.js",
        a:1,
        msg:"hello",
        span:"<span>span</span>",
        id:"id",
        number:1,
        ok:true,
        isA:true,
        isB:false,
        classA:"class-A",
        classB:"class-B",
        activeColer:"#f00",
        fontSize:12,
        styleObjectA:{
            color:"red"
        },
        styleObjectB:{
            fontSize:"14px"
        },
        items:[
            {list:1},
            {list:2},
            {list:3},
            {list:4},
            {list:5}
        ],
        toggle:true,
        pick:"pick",
        selected:"a",
        selectedN:"a",
        selectedFor:"a",
        options:[
            {text:"one",value:"a"},
            {text:"two",value:"b"},
            {text:"three",value:"c"}
        ]
    };
    var vm1=new Vue({
        el:"#app",
        //data:{
        //    message:"hello vue.js"
        //}
        data:data1,
        computed:{
            //一个计算属性的getter
            b:function(){
                return this.a+1;
            },
            c:function(){
                return this.message.toString().length;
            }
        }
    });
    //设置属性也会影响到原始数据
    data1.a=2;
    data1.msg="修改";

});