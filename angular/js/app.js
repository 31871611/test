var myApp=angular.module("myApp",["ngRoute","ngTouch","myAppController","myAppFilter","myAppDirective","myFactory"]);

myApp.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"views/home.html",
//        controller:"HomeController",
//        resolve:{},
    }).when("/login",{
        templateUrl:"views/login.html"
//        controller:"LoginController"
    }).when("/shopping",{
        templateUrl:"views/shopping.html"
    }).when("/bookList",{
        templateUrl:"views/list/booklist.html"
    }).when("/bookList/:id",{
        templateUrl:"views/list/bookcontent.html",
        controller:"contentController"
    }).when("/emilList",{
        templateUrl:"views/list/emilList.html",
        controller:"emilListController"
    }).when("/emilList/:id",{
        templateUrl:"views/list/emilcontent.html",
        controller:"emilController"
    }).when("/controller",{
        templateUrl:"views/controller.html"
    }).when("/filter",{
        templateUrl:"views/filter.html"
    }).when("/directive",{
        templateUrl:"views/directive.html"
    }).when("/factory",{
        templateUrl:"views/factory.html"
    }).when("/html",{
        templateUrl:"views/html.html"
    }).when("/ngTouch",{
        templateUrl:"views/ngTouch.html"
    }).otherwise({
        redirectTo:"/"
    });
}]);