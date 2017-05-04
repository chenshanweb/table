angular.module("services",[])
    .factory("stuinfo",function ($http,$q) {
        var deferred= $q.defer();// 声明延后执行，表示要去监控后面的执行;
        $http({ url: '/select'}).then(function(db){
            deferred.resolve(db.data);
        });
        return deferred.promise;// 返回承诺，这里并不是最终数据，而是访问最终数据的API,如果要取数据，要用到.then()
    })
//module模块
//factory服务 名字添加依赖
// 服务必须返回一个东西，不要异步，异步不能保证取到数据，整个函数需要返回一个数据
// 解决：需要promise，最终返回一个primise对象
// 之后想用数据用then获取
//
// 确保操作的是同一个数据
//
// stuinfo相当于一个对象，给对象上加属性
// 再获取，都是传址




