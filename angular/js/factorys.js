//服务
var myFactory=angular.module("myFactory",[]);

myFactory.factory("UserService",["$http",function($http){
    var current_user;

    return{
        getCurrentUser:function(){
            return current_user;
        },
        setCurrentUser:function(user){
            current_user=user;
        }
    }
}]);

myFactory.factory("githubService",function($http){
    var githubUrl="https://api.github.com";

    var runUserRequest=function(username,path){
        return $http({
            method:"JSONP",
            url:githubUrl + "/users/" + username + "/" + path + "?callback=JSON_CALLBACK"
        });
    };
    //返回带有一个events函数的服务对象
    return{
        events:function(username){
            return runUserRequest(username,"events");
        }
    }
});


var Person=function($http){
    this.getName= function () {
        return $http({
            method:"GET",
            url:"/api/user"
        })
    }
};
myFactory.service("personService",Person);


