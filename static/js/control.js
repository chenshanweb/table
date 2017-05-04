angular.module("controll",["services"])//添加模块依赖
    .controller("control",["$scope","$http","stuinfo",function ($scope,$http,stuinfo) {//添加服务
       //main查询
            //$http本身是promise对象，所以有then方法
        // $http({url:"/select"}).then(function (data) {
        //     $scope.data=data.data;
        // })
        //首页显示
        stuinfo.then(function (e) {
            stuinfo.data=e;//把数据放在stuinfo的属性上，之后再操作，都在操作它，传址
            $scope.data=stuinfo.data;
        })

        //删除  数据库改变，stuinfo也跟着改变
        $scope.del=function(id){
            $scope.data.forEach(function (obj,index) {
                if(obj.id==id){
                    //发送ajax接受参数：{地址，参数}
                    $http({url:"del",params:{id:id}}).then(function (data) {
                       if(data.data=="ok"){
                           $scope.data.splice(index,1);
                       }
                    })
                }
            })
        }
        //console.log($scope.data)获取不到，只有在ajax执行完后才可以
    }])
    .controller("edit",["$scope","$http","stuinfo","$routeParams",function($scope,$http,stuinfo,$routeParams){
        //console.log($routeParams.id)
        //$routeParams可以获取到路径传过来的id
        //两个控制器需要共同的参数
        var id=$routeParams.id;
        stuinfo.then(function (e) {
            stuinfo.data=e;
           // $scope.data=stuinfo.data;
            stuinfo.data.forEach(function(obj,index){
                if(obj.id==id){
                    $scope.info=obj;//当改动时，两个值都会发生变化
                    //console.log(obj);
                    //console.log($scope.info)
                    /*原理：
                     var a={};
                     a.date={0:{name:'one',gae:2},two:{name:"two",gae:2},thr:{name:"thr",gae:2}};
                     var b={info:{}};
                     b.info=a.date[0];
                     console.log(b.info)
                     console.log(a.date[0])
                     //b.info.name='222';这个时候两个值都会发生改变 --相当于在页面中具体某个内容改变
                     //b.info={name:'3333333',gae:222}//这个时候只有b发生改变 --重新改变整个对象
                     console.log(b.info)
                     console.log(a.date[0])
                     console.log(a);
                     */
                    /*
                     var arr=[1,2,3];
                     var brr=arr;
                     //brr=[4,2,3];  //重新赋值时只改变brr--重开堆
                     brr[0]=3;//当在原基础上改动时，两个都发生变化--传址

                     console.log(arr);
                     console.log(brr);
                     */



                }
            })
        })
        //要做到返回首页内容也被改变，需要监测变量的变化，然后改变全局服务上的值，老师做的时候加了watch，自己做不需要
        // $scope.$watch("info",function(){
        //     stuinfo.data.forEach(function(obj,index){
        //         if(obj.id==id){
        //             stuinfo.data[index]=$scope.info;
        //         }
        //     },true)
        // })

        $scope.submit=function (id) {
            var info=$scope.info;
            $http({url:"/editCon",params:info}).then(function(e){
                alert("操作成功");
            })
        }

    }])
    .controller("add",["$scope","$http","stuinfo",function($scope,$http,stuinfo){
        //添加具体显示什么页面，同一个页面再次提交，第一页只会创建一次，数据库存两个

        $scope.info={name:"",age:0,sex:1};
        stuinfo.then(function (e) {
            stuinfo.data=e;
            $scope.data=stuinfo.data;
           stuinfo.data.push($scope.info);
            //给全局stuinfo上添加空的一行
        })
        $scope.sub=function (id) {
            var info=$scope.info;
            $http({url:"/addCon",params:info}).then(function(e){
                alert("操作成功");
            })
        }


    }])