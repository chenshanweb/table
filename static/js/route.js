angular.module("route",["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/",{//配置路径，当地址是当前，让显示出哪个模板，执行哪个控制器
            templateUrl:"/tpl/main.html",//这个路径需要index.js配置指定
            controller:"control"
        }).when("/edit/:id",{
            templateUrl:"/tpl/edit.html",
            controller:"edit"
        }).when("/add",{
            templateUrl:"/tpl/add.html",
            controller:"add"
        })
    })

