var myAppController=angular.module("myAppController",[]);

//控制器
myAppController.controller("TestController",["$scope",function($scope){
    $scope.title="标题";
    $scope.message="内容";
    $scope.greeting={
        text:"一行字",
        id:"box"
    }
}]);

myAppController.controller("nowController",["$scope",function($scope){
    $scope.clock={
        now:new Date()
    };
    var updataClock=function(){
        $scope.clock.now=new Date();
    };
    setInterval(function(){
        //需要$apply
        $scope.$apply(updataClock);
    },1000);
    updataClock();
}]);

myAppController.controller("FirstController",["$scope",function($scope){
    $scope.counter=0;
    $scope.add=function(amount){
        $scope.counter += amount;
    };
    $scope.subtract=function(amount){
        $scope.counter -= amount;
    }
}]);


myAppController.controller("exprController",["$scope","$parse",function($scope,$parse){
    $scope.$watch("expr",function(newVal,oldVal,scope){
        if(newVal !== oldVal){
            //用该表达式设置parseFun
            var parseFun=$parse(newVal);
            //获取经过解析后表达式的值
            $scope.parsedValue=parseFun(scope);
        }
    });
}]);

myAppController.controller("interpretController",["$scope","$interpolate",function($scope,$interpolate){
    $scope.$watch("emailBody",function(body){
        if(body){
            var template=$interpolate(body);
            $scope.previewText=template({to:$scope.to});
        }
    });
}]);

myAppController.controller("filtersController",["$scope",function($scope){
    $scope.today=new Date();
    $scope.isCapitalized=function(str){
        //toUpperCase() 方法用于把字符串转换为大写
        return str[0] == str[0].toUpperCase();
    }
}]);

myAppController.controller("HomeController",["$scope",function($scope){
    $scope.home="首页";
}]);

//书籍
//var books=[
//    {id:1,title:"angularJs权威教程"},
//    {id:2,title:"AngularJS开发下一代Web应用"},
//    {id:3,title:"AngularJS实战"},
//    {id:4,title:"AngularJS高级程序设计"},
//    {id:5,title:"AngularJS开发秘籍"},
//    {id:6,title:"精通AngularJS"}
//];

//列表
myAppController.controller("bookController",["$scope","$http",function($scope,$http){
    //$scope.books=books;
    $http({
        method:"GET",
        url:"api/books.json",
        cache:true
    }).success(function(data){
        $scope.books=data;
    }).error(function(){
        alert("错误!");
    });
}]);

//内容
myAppController.controller("contentController",["$scope","$http","$routeParams",function($scope,$http,$routeParams){
    //$scope.book=books[$routeParams.id-1];
    $http({
        method:"GET",
        url:"api/books.json"
    }).success(function(data){
        $scope.book=data[$routeParams.id-1];
    }).error(function(){
        alert("错误!");
    });
}]);

//A-mail
var mailMessages=[{
    id:0,
    sender:"jean@123.com",
    subject:"Hi there",
    date:"Dec 7,2013",
    recipients:["greg@some.com","2@some.com","3@some.com"],
    message:"Hey we s"
},{
    id:1,
    sender:"maria@123.com",
    subject:"where",
    date:"Dec 7,2013",
    recipients:["greg@some.com"],
    message:"I"
},{
    id:2,
    sender:"maria@123.com",
    subject:"where",
    date:"Dec 7,2013",
    recipients:["greg@some.com"],
    message:"I"
}];
myAppController.controller("emilListController",["$scope",function($scope){
    $scope.messages=mailMessages;
}]);
myAppController.controller("emilController",["$scope","$routeParams",function($scope,$routeParams){
    $scope.message=mailMessages[$routeParams.id];
}]);


myAppController.controller("locationController",["$scope","$location",function($scope,$location){
    $scope.path=$location.path();
//    $scope.back=$location.path("/");
//    $scope.replace=$location.replace();
    $scope.absurl=$location.absUrl();
    $scope.hash=$location.hash();
    $scope.host=$location.host();
    $scope.port=$location.port();
    $scope.protocol=$location.protocol();
    $scope.search=$location.search();
    $scope.url=$location.url();
}]);

myAppController.run(function($rootScope){
    $rootScope.rootProperty="根"
}).controller("ParentController",["$scope",function($scope){
    $scope.rootProperty="控制器1.1";
    $scope.parentProperty="控制器1.2";
}]).controller("ChildController",["$scope",function($scope){
    $scope.rootProperty="控制器2.1";
    $scope.parentProperty="控制器2.2";
    $scope.childProperty="控制器2.3";
    $scope.fullSentenceFromChild="控制器2.4";
}]);

myAppController.run(function($rootScope,$timeout){
    $rootScope.isDisabled=true;
    $timeout(function(){
        $rootScope.isDisabled=false;
    },5000);
});

myAppController.controller("myInclude",["$scope",function($scope){
    $scope.name="World";
}]);

myAppController.controller("PeoplecController",["$scope",function($scope){
    $scope.people=[
        {name:"小明",city:1},
        {name:"小张",city:2}
    ];
}]);

myAppController.controller("EquationController",["$scope",function($scope){
    $scope.equation={};
    $scope.change=function(){
        $scope.equation.output=parseInt( $scope.equation.x ) + 2;
    }
}]);

myAppController.controller("FormController",["$scope",function($scope){
    $scope.fields=[
        {placeholder:"Username",isRequired:true},
        {placeholder:"Password",isRequired:true},
        {placeholder:"Email(optional)",isRequired:true}
    ];
    $scope.submitForm=function(){
        alert("it works!");
    }
}]);

myAppController.controller("CityController",["$scope",function($scope){
    $scope.cities=[
        {name:"Seattle"},
        {name:"San Francisco"},
        {name:"Chicago"},
        {name:"New York"},
        {name:"Boston"}
    ]
}]);

myAppController.controller("submitController",["$scope",function($scope){
    $scope.person={
        name:null
    };
    $scope.people=[];
    $scope.submit=function(){
        if($scope.person.name){
            $scope.people.push({name:$scope.person.name});
            $scope.person.name="";
        }
    }
}]);

myAppController.controller("mailsController",["$scope",function($scope){
    $scope.emails=[
        {from:"标题1",body:"内容1"},
        {from:"标题2",body:"内容2"},
        {from:"标题3",body:"内容3"},
        {from:"标题4",body:"内容4"},
        {from:"标题5",body:"内容5"}
    ];
}]);

myAppController.controller("MainController",["$scope",function($scope){

}]);

//myAppController.controller("ServiceController",["$scope",function($scope,githubService){
//    $scope.events=githubService.events("auser");
//}]);

//服务
myAppController.controller("ServerController",["$scope","$timeout",function($scope,$timeout,githubService){
    var timeout;
    $scope.$watch("username",function(newUsername){
        if(newUsername){
            if(timeout) $timeout.cancel(timeout);
            timeout=$timeout(function(){
                githubService.events(newUsername).success(function(data,status,headers){
                    //success函数在数据中封闭响应
                    //因此我们需要调用data.data来获取原始数据
                    $scope.events=data.data;
                })
            },350)
        }
    });
}]);

myAppController.controller("factoryTestController",["$scope",function($scope,UserService){
    $scope.user=function(name){
        //UserService.setCurrentUser("123");
        //alert(UserService.getCurrentUser());
        alert(name);
    }
}]);

//购物车示例
myAppController.controller("CartController",["$scope",function($scope){
    //formatter:off
    $scope.items=[{
        title:"paint pots",
        quantity:8,
        price:3.95
    },
    {
        title:"polka dots",
        quantity:17,
        price:12.95
    },
    {
        title:"pebbles",
        quantity:5,
        price:6.95
    }];
    //formatter:on
    $scope.remove=function(index){
        $scope.items.splice(index,1);
    }
}]);

//购物车示例第二版
myAppController.controller("CartController2",["$scope",function($scope){
    $scope.bill={};
    //formatter:off
    $scope.items=[{
        title:"paint pots",
        quantity:8,
        price:3.95
    },
        {
            title:"polka dots",
            quantity:17,
            price:12.95
        },
        {
            title:"pebbles",
            quantity:5,
            price:6.95
        }];
    //formatter:on
    $scope.remove=function(index){
        $scope.items.splice(index,1);
    };
    var calculateTotals=function(){
        var total=0;
        for(var i = 0,len=$scope.items.length;i<len;i++){
            total=total+$scope.items[i].price * $scope.items[i].quantity;
        }
        $scope.bill.totalCart=total;
        $scope.bill.discount=total > 100 ? 10 : 0;
        $scope.bill.subtotal = total - $scope.bill.discount;
    };

    $scope.$watch(calculateTotals);

//        $scope.totalCart=function(){
//            var total=0;
//            for(var i = 0,len=$scope.items.length;i<len;i++){
//                total=total+$scope.items[i].price * $scope.items[i].quantity;
//            }
//            return total;
//        };
//        $scope.subtotal=function(){
//            return $scope.totalCart() - $scope.bill.discount;
//        };
//
//        function cal(newValue,oldValue,scope){
//            $scope.bill.discount=newValue > 100 ? 10 : 0;
//        }
//
//        $scope.$watch($scope.totalCart,cal);
}]);


/**
    $http({
        method:"GET",
        url:"/api/users.json"
    }).success(function(){
        //当相应准备就绪时调用
    }).error(function(){
        //当响应以错误状态返回时调用
    });


    var prommise=$http({
        method:"GET",
        url:"/api/users.json"
    });

    prommise.then(function(resp){
        //resp是一个响应对象
    },function(resp){
        //带有错误信息的resp
    });

    //或者使用success/error方法
    prommise.success(function(data,status,headers,config){
        //处理成功响应
    });

    prommise.error(function(data,status,headers,config){
        //处理非成功的响应
    });

 **/

myAppController.controller("StartUpController",["$scope",function($scope){
    $scope.youCheckedlt=true;
    $scope.funding={
        startingEstimate:0
    };
    //ng-change属性，当用户输入的值发生变化时将被调用
//        $scope.computeNeeded=function(){
//            $scope.funding.needed = $scope.funding.startingEstimate * 10;
//        };
    computeNeeded=function(){
        $scope.funding.needed = $scope.funding.startingEstimate * 10;
    };
    $scope.$watch("funding.startingEstimate",computeNeeded);
}]);

myAppController.controller("StudentListcontroller",["$scope",function($scope){
    $scope.students=[{
            name:"mary",
            id:"1"
        },
        {
            name:"jack",
            id:"2"
        },
        {
            name:"jill",
            id:"3"
        }];
    $scope.insertTom=function(){
        //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
        $scope.students.splice(1,0,{name:"tom",id:"4"});
    }
}]);

myAppController.controller("DeathrayMenuController",["$scope",function($scope){
    $scope.toggleMenu=function(){
        $scope.menuState.show=!$scope.menuState.show;
    };
    $scope.menuState={
        show:false
    };
    $scope.isDisabled=false;
    $scope.stun=function(){
        $scope.isDisabled=true;
//      $scope.isDisabled=!$scope.isDisabled;
    };
}]);

myAppController.controller("HeaderController",["$scope",function($scope){
    $scope.isError=false;
    $scope.isWarning=false;
    $scope.showError=function(){
        $scope.messageText="error!";
        $scope.isError=true;
        $scope.isWarning=false;
    };
    $scope.showWarning=function(){
        $scope.messageText="warning!";
        $scope.isError=false;
        $scope.isWarning=true;
    }
}]);

myAppController.controller("RestauranTableController",["$scope",function($scope){
    $scope.directory=[{
        name:"handsome",
        cuisine:"BBQ"
    },{
        name:"Green\'s green",
        cuisine:"Salads"
    },{
        name:"hot",
        cuisine:"sss"
    }];
    $scope.select=function(row){
        $scope.selecteRow=row;
    }
}]);

myAppController.controller("SomeController",["$scope",function($scope){
    $scope.message={
        text:"文字"
    };
    $scope.clickUnfocused=function(){
        $scope.message.text="Unfocused被点击了";
    };
    $scope.clickFoucsed=function(){
        $scope.message.text="focus被点击了";
    }
}]);

myAppController.controller("ShoppingController",["$scope","$http",function($scope,$http){
    //$http.get("http://localhost/dome/data.php").success(function(data,status,headers,config){
    $http.get("api/item.json").success(function(data,status,headers,config){
        $scope.items=data;
    });

/**
     data.php
     $data=array(
         array("id"=>"0","title"=>"标题0","description"=>"内容0."),
         array("id"=>"1","title"=>"标题1","description"=>"内容1."),
         array("id"=>"2","title"=>"标题2","description"=>"内容2.")
     );

     echo json_encode($data);
 */
}]);

myAppController.controller("AddUserController",["$scope",function($scope){
    $scope.message="";
    $scope.addUser=function(){
        $scope.message="thank,"+$scope.user.first+",we added you!";
    }
}]);






