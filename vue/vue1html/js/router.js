// 定义组件
var Foo = Vue.extend({
    template: '<div class="foo">'+
    '<p>This is foo!</p>'+
    '<router-view></router-view>'+      //嵌套的外链
    '</div>'
});

var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
});


// 路由器需要一个根组件。
// 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
//    var App = Vue.extend({});

// install router
Vue.use(VueRouter);

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter();

// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({
    'home':{
        component:{
            template: '<p>home</p>'
        }
    },
    '/foo': {
        component: Foo,
        //在/foo下设置一个路由
        subRoutes:{
            "/bar":{
                //当匹配到/foo/bar时，会在foo's<router-view>内渲染
                component: Bar
            }
        }
    },
    '/bar': {
        component: Bar
    },
    '/reg':{
        component:{
            template: '<p>reg</p>'
        }
    },
    '/login/:username':{    //动态片段
        component:{
            template: '<p>用户名是：{{$route.params.username}}</p>'
        }
    },
    '/list/*any':{          //全匹配片段
        component:{
            template: '<p>匹配的路径：/user/a/b/c</p>'
        }
    },
    '/user/:userId':{
        name:"user",    //给这条路径加上一个名字
        component:{
            template:"<p>具名路径，路由都会最终切换到 /user/123</p>"
        }
    }
});

//router.map({
//    '/foo': {
//        component: Foo
//    },
//    '/bar': {
//          组件.vue
//        component: require('./templates/device/device.vue')
//    }
//});

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(app, '#app');