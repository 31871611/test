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


    //使用 Vue.directive(id, definition) 的方法传入指令 id 和定义对象来注册一个全局自定义指令
    Vue.directive('my-directive', {
        //仅调用一次，当指令第一次绑定元素的时候
        bind: function () {
            // 准备工作
            // 例如，添加事件处理器或只需要运行一次的高耗任务
            console.log('my-directive');
        },
        //第一次是紧跟在 bind 之后调用，获得的参数是绑定的初始值；以后每当绑定的值发生变化就会被调用，获得新值与旧值两个参数
        update: function (newValue, oldValue) {
            // 值更新时的工作
            // 也会以初始值为参数调用一次
            this.el.innerHTML=newValue+"|"+oldValue;
        },
        //仅调用一次，当指令解绑元素的时候
        unbind: function () {
            // 清理工作
            // 例如，删除 bind() 添加的事件监听器
        }
    });

    Vue.directive("demo",{
        bind:function(){
            console.log("demo");
        },
        update:function(value){
            //this.el.innerHTML=value;
            this.el.innerHTML=
            'name-'+this.name+'<br />'+
            'expression-'+this.expression+'<br />'+
            'argument-'+this.arg+'<br />'+
            'modifiers-'+JSON.stringify(this.modifiers)+'<br />'+
            'value-'+value
        }
    });

    //如果指令需要多个值，可以传入一个 JavaScript 对象字面量。记住，指令可以使用任意合法的 JavaScript 表达式
    Vue.directive("demo2",function(value){
        this.el.innerHTML=value.color+"|"+value.text;
    });

    //元素指令。与Angular 的 E 类指令的概念非常相似
    Vue.elementDirective('my-directive2', {
        // API 同普通指令
        bind: function () {
            // 操作 this.el...
        }
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
    //自定义css过渡类名
    Vue.transition('bounce', {
        enterClass: 'bounceInLeft',
        leaveClass: 'bounceOutRight'
    });


    //用 Vue.extend() 创建一个组件构造器
    var Mycomponent=Vue.extend({
        template:"<div>自定义组件my-component</div>"       //选项
    });

    //要把这个构造器用作组件，需要用 Vue.component(tag, constructor) 注册
    //全局注册组件，tag为my-component
    Vue.component('my-component',Mycomponent);

    //Props 传递数据
    //组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 props 把数据传给子组件。
    //“prop” 是组件数据的一个字段，期望从父组件传下来。子组件需要显式地用 props 选项声明 props
    Vue.component("child",{
        // 声明 props
        props:["msg"],
        //prop可以用在模板内
        //可以用this.msg设置
        template:'<div>{{msg}}</div>'
    });

    //名字形式为 camelCase 的 prop 用作特性时，需要转为 kebab-case（短横线隔开）
    Vue.component("child2",{
        props:["myMessage"],
        template:'<div>{{myMessage}}</div>'
    });

    //用 v-bind 绑定动态 Props 到父组件的数据。每当父组件的数据变化时，也会传递给子组件
    Vue.component("child3",{
        props:["myMessage2"],
        template:'<div>{{myMessage2}}</div>'
    });


    //数据
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
        checkdNames:[],
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
        query:"",
        newTodo:"",
        todos:[
            { text: 'Add some todos' }
        ],
        object:{
            FirstName: 'John',
            LastName: 'Doe',
            Age: 30
        },
        transitionName:"fade",
        someValue: 'hello!'
    };
    var vm1=new Vue({
        el:"#app",
        //data:{
        //    message:"hello vue.js"
        //}
        data:data1,
        //一个计算属性的getter
        computed:{
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
            doThat:function(){},
            addTodo:function(){
                var text=this.newTodo.trim();
                if(text){
                    this.todos.push({text:text});
                    this.newTodo="";
                }
            },
            removeTodo:function(index){
                this.todos.splice(index,1);
            }
        }
    });
    //设置属性也会影响到原始数据
    data1.a=2;
    data1.msg="修.改";



});