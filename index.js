var express=require("express");
var app=express();
var path=require("path");
var fs=require("fs");
var mysql=require("./mysql.js");

if(fs.existsSync("static")==false){
    fs.mkdirSync("static");
    fs.mkdirSync("static/css");
    fs.mkdirSync("static/js");
    fs.mkdirSync("static/tpl");//放html
}

app.use(express.static(path.join(__dirname,'static')));

app.listen("1111");


//首页
app.get("/",function (req,res) {
    res.sendFile(path.join(__dirname,"/static/tpl/index.html"));
})

//首页查询内容
app.get("/select",function (req,res) {
    mysql.query("select * from stu",function (error,result) {
        res.send(result);//JSON.stirngify(result)
    })
})

//tpl路径
app.get("/tpl/:name",function(){
    res.sendFile(path.join(__dirname,"static/tpl/"+req.params.name));
})

//删除
app.get("/del",function (req,res) {
    var id=req.query.id;
    //也可以通过地址栏传递，获取地址栏变量：req.params.id
    mysql.query("delete from stu where id="+id,function (error,result) {
        if(result.affectedRows>0){
            res.send("ok")
        }
    })
})

//修改提交
app.get("/editCon",function(req,res){
    var id=req.query.id;
    var name=req.query.name;
    var sex=req.query.sex;
    var age=req.query.age;
    mysql.query(`update stu set name='${name}',sex='${sex}',age='${age}' where id=${id}`,function(error,result){
        if(result.affectedRows>0){
            res.send("ok");
        }
    })
})

//添加提交
app.get("/addCon",function(req,res){
    var name=req.query.name;
    var sex=req.query.sex;
    var age=req.query.age;
    mysql.query(`insert into stu (name,age,sex) values ('${name}',${sex},${age})`,function(error,result){
        if(result){
            res.send("ok");
        }
    })
})

