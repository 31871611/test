require(["vue"],function(Vue){

    //用全局方法 Vue.filter() 注册一个自定义过滤器，它接收两个参数：过滤器ID和过滤器函数。过滤器函数以值为参数，返回转换后的值
    Vue.filter("split0",function(value){
        return value.split(".")[0];
    });
    //过滤器函数可以接收任意数量的参数：
    Vue.filter("wrap",function(value,begin,end){
        return begin + value + end;
    });
    //把来自视图（< input > 元素）的值写回模型之前转化它
    Vue.filter("currencyDisplay",{
        // model -> view
        // 在更新 `<input>` 元素之前格式化值
        read:function(val){
            return '￥'+val.toFixed(2);
        },
        // view -> model
        // 在写回数据之前格式化值
        write:function(val,oldVal){
            var number=+val.replace(/[^\d.]/g,'');
            return isNaN(number) ? 0 :parseFloat(number.toFixed(2));
        }
    });
    //
    Vue.filter("concat",function(value,input){
        //这里input===this.userInput
        return value+input;
    });


    //过渡动画
    Vue.transition("expand",{
        beforeEnter:function (el){
            el.textContent="beforEnter";
        },
        enter:function(el){
            el.textContent="enter";
        },
        afterEnter:function(el){
            el.textContent="afterEnter";
        },
        enterCancelled:function(el){

        },
        beforeLeave:function(el){
            el.textContent="beforeLeave";
        },
        leave:function(el){
            el.textContent="leave";
        },
        afterLeave:function(el){
            el.textContent="afterLeave";
        },
        leaveCancelled:function(el){

        }
    });
    Vue.transition("stagger",{
        stagger:function(index){
            // 每个过渡项目增加 50ms 延时
            // 但是最大延时限制为 300ms
            return Math.min(300, index * 50);
        }
    });

    //用 Vue.extend() 创建一个组件构造器


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
        ],
        userInput:1,
        show:true,
        query:""
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
        },
        // 在 'methods' 对象中定义方法
        methods:{
            greet:function(event){
                //方法内'this'指向vm
                alert("hello"+this.msg+"!");
                //event是原生dom事件
                alert(event.target.tagName);
                //alert(this.innerText);
                //alert(this.innerHTML);
            },
            say:function(val,event){
                alert(val);
                // 现在我们可以访问原生事件对象
                event.preventDefault();
            },
            doThis:function(){},
            onSubmit:function(){
                alert("onSubmit");
            },
            doThat:function(){}
        }
    });
    //设置属性也会影响到原始数据
    data1.a=2;
    data1.msg="修.改";



});