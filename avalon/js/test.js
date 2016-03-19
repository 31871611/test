/***
 *
 默认情况下，我们是使用{{ }} 进行插值，如果有特殊需求，我们还可以配置它们：
 avalon.config({
   interpolate:["[[","]]"]
 })
 *
 */

var wrap=avalon.define({
    $id:"wrap",
    tpl:"sn.html"
});

var wrap1=avalon.define({
    $id:"wrap1",
    a:"你好啊",
    b:100
});

var wrap2=avalon.define({
    $id:"wrap2",
    a:"大家好",
    b:"哈哈哈",
    c:wrap1.a,
    d:"<span>span</span>"
});

var wrap3=avalon.define({
    $id:"wrap3",
    a:"大家好"
});

var wrap4=avalon.define({
    $id:"wrap4",
    text:"111"
});

var AAA=avalon.define({
    $id:"AAA",
    name:"AAA",
    color:"green"
});

var BBB=avalon.define({
    $id:"BBB",
    name:"BBB",
    color:"red"
});

var CCC=avalon.define({
    $id:"CCC",
    name:"CCC"
});

var DDD=avalon.define({
    $id:"DDD",
    name:"DDD"
});

var wrap5=avalon.define({
    $id:"wrap5",
    isSure:false
});

var wrap6=avalon.define({
    $id:"wrap6",
    hobbies:[]
});

var wrap7=avalon.define({
    $id:"wrap7",
    flight:"",
    hotel:[]
});

var wrap8=avalon.define({
    $id:"wrap8",
    gender:""
});

var wrap9=avalon.define({
    $id:"wrap9",
    onlinePayment:false
});

var wrap10=avalon.define({
    $id:"wrap10",
    username:"",
    password:"",
    profile:""
});

var wrap11=avalon.define({
    $id:"wrap11",
    currentIndex:1,
    toggle:function(index){
        wrap11.currentIndex=index;
    }
});

var wrap12=avalon.define({
    $id:"wrap12",
    object:{

    }
});

setTimeout(function(){
    wrap12.object={
        id:"123",
        message:"显示"
    }
},3000);

setTimeout(function(){
    wrap12.object={}
},5000);

var wrap13=avalon.define({
    $id:"wrap13",
    number:111,
    number2:NaN,
    bool:false,
    bool2:true,
    nn:null,
    vv:undefined,
    array:[1,2,3],
    date:new Date(),
    object:{
        name:"这是数据"
    },
    show:function(){
        var elem=avalon(this);
        console.log(
            elem.data("number"),
            elem.data("number2"),
            elem.data("bool"),
            elem.data("bool2"),
            elem.data("null"),
            elem.data("void"),
            elem.data("fn"),
            this["data-array"],
            this["data-data"],
            this["data-object"]
        );
    }
});

var wrap14=avalon.define({
    $id:"wrap14",
    textModel:"star",
    t1:true,
    age:20,
    r1:true,
    sex:"男",
    s1:true,
    c1:true,
    id:"id",
    name:"name",
    path:"http://hotel.qunar.com",
    src:"1.jpg",
    title:"avalon is great"
});

var wrap15=avalon.define({
    $id:"wrap15",
    isOK:true,
    toggle:true,
    color:"red",
    click:function(e){
        wrap15.toggle=!wrap15.toggle;
    }
});


var wrap20=avalon.define({
    $id:"wrap20",
    a:true,
    b:true,
    c:"",
    d:"",
    e:10,
    f:true,
    g:["b","c"],
    h:[1,2],
    i:[false],
    //j:"111"
    j:"aa",
    k:222,
    o:111,
    p:"",
    changedCallback:function(value,data){
        console.log("value:",value);
        console.log("data:",data);
    },
    q:""
});


var wrap16=avalon.define({
    $id:"wrap16",
    width:"200px",
    backgroundColor:"red"
});
wrap16.$watch("backgroundColor",function(v){
   wrap16.backgroundColor=v;
});


var wrap17=avalon.define({
    $id:"wrap17",
    status:"event-type",
    callback:function(e){
        wrap17.status= e.type;
    },
    field:"value-event-type",
    check:function(e){
        wrap17.field= this.value+" "+ e.type;
    },
    firstName:"felix",
    argsClick:function(e,a,b){
        //a数值
        //b字符串
        alert([].slice.call(arguments).join(" "));
    },
    array:["aaa","bbb","ccc"],
    loopClick:function(a,e){
        alert(a+" "+ e.type)
    },
    submit:function(){
        //过滤后提交给后台
        var data=wrap17.$model;
        alert(JSON.stringify(data));
    }
});

var count=0;
var wrap18=avalon.define({
    $id:"wrap18",
    str1:"1",
    str2:"2",
    str3:"3",
    click0:function(){
        wrap18.str1="xxx"+(count++);
    },
    click1:function(){
        wrap18.str2="xxx"+(count++);
    },
    click2:function(){
        wrap18.str3="xxx"+(count++);
    }
});


var wrap19=avalon.define({
    $id:"wrap19",
    fn:function(){
        console.log("111");
    },
    fn1:function(){
        console.log("222");
    },
    fn2:function(){
        console.log("333");
    }
});

var wrap21=avalon.define({
    $id:"wrap21",
    aaa:"111"
});
//添加一个拦截器
avalon.duplexHooks.limit={
    get:function(str,data){
        var limit=parseFloat(data.element.getAttribute("data-duplex-limit"));
        if(str.length > limit){
            return data.element.value=str.slice(0,limit);
        }
        return str;
    }
};

var wrap22Index=0;
var wrap22=avalon.define({
    $id:"wrap22",
    array:["葡萄","椰子","火龙果","橙子"],
    data:{
        aaa:111,
        bbb:222,
        ccc:333,
        ddd:444
    },
    getIndex:function(){
        return wrap22Index++;
    },
    array2:[["a","b","c","d"],["aa","bb","cc","dd"],["aaa","bbb","ccc","ddd"]],
    array3:["a","b","c"],
    array4:[
        {text:"a"},
        {text:"b"},
        {text:"c"}
    ]
});
//对象数据-键值的更新
setTimeout(function(){
    wrap22.data.aaa=77777;  //没更新成功
},2000);
//对象数据-键值对的更新
setTimeout(function(){
    wrap22.data={
        ccc:777,
        eee:888,
        fff:999
    };
},4000);
//数组数据-简单值的更新
setTimeout(function(){
    wrap22.array.set(0,"西瓜");
},6000);
//数组数据-对象值的更新
setTimeout(function(){
    wrap22.array4[0].text="aaaaa"
},8000);

var wrap25=avalon.define({
    $id:"wrap25",
    name:"angelababy",
    eee:"lala",
    content:"引入新模板",
    url:"temlate1",
    t:true,
    change:function(){
        wrap25.eee = wrap25.eee === "lala" ? "hehe" : "lala";
    },
    username:"",
    password:"",
    array:[1,2,3,4,5],
    add:function(e){
        if(this.value && e.which == 13 ){
            wrap25.array.push(this.value);
            this.value="";
        }
    }
});

avalon.templateCache["aaa.html"]="<strong>aaa</strong>";
avalon.templateCache["bbb.html"]="<strong>bbb</strong>";



var wrap26=avalon.define({
    $id:"wrap26",
    aaa:"aaa.html",
    change:function(){
        wrap26.aaa=wrap26.aaa === "aaa.html" ? "bbb.html" : "aaa.html";
    },
    adjust:function(tmpl){
        return tmpl + " "+(new Date() - 0);
    }
});


var wrap27=avalon.define({
    $id:"wrap27",
    render:function(){
        console.log("render");
    }
});

var wrap28=avalon.define({
    $id:"wrap28",
    aaa:"aaa.html",
    change:function(){
        wrap28.aaa=wrap28.aaa === "aaa.html" ? "bbb.html" : "aaa.html";
    }
});


var wrap29=avalon.define({
    $id:"wrap29",
    aaa:"2",
    $ccc:"1",               //$开头是监测不到的
    $skipArray:["ddd"],     //ddd也将监测不到
    click:function(a){
        wrap29[a]=new Date()-0;
    }
});
wrap29.$watch("aaa",function(a,b){
    console.log("aaa",a,b);
});
wrap29.$watch("$ccc",function(a,b){
    console.log("$ccc",a,b);
});
wrap29.$watch("$all",function(name,a,b){
    //监测全部的值变化
    console.log(name,a,b);
});


var bd=[
    {
        "id":"1",
        "title":"公告文章标题1"
    },
    {
        "id":"2",
        "title":"公告文章标题2"
    },
    {
        "id":"3",
        "title":"公告文章标题3"
    },
    {
        "id":"4",
        "title":"公告文章标题4"
    }
];
var gg=[
    {
        "id":"1",
        "title":"媒体报道文章标题1"
    },
    {
        "id":"2",
        "title":"媒体报道文章标题2"
    },
    {
        "id":"3",
        "title":"媒体报道文章标题3"
    },
    {
        "id":"4",
        "title":"媒体报道文章标题4"
    }
];
var vm=avalon.define({
    $id:"list",
    more_name:"gg",
    more_text:"更多公告",
    gg:gg,          //获取公告JSON数据
    bd:bd,          //获取媒体报道JSON数据
    infoList:gg,    //infoList缺省值为公告JSON数据
    changeUI:function(flag){
        if(flag){
            vm.more_name="gg";
            vm.more_text="更多公告";
            vm.infoList=vm.gg;
        }else{
            vm.more_name="bd";
            vm.more_text="更多报道";
            vm.infoList=vm.bd;
        }
    }
});

var ajax=avalon.define({
    $id:"ajax",
    list:""
});

$.post("js/test.json",
    function(data){
        //console.log(data[1].title);
        ajax.list=data;
}, "json");

avalon.scan();  //要在最后加这一句，让avalon扫描文档，从而执行起来
