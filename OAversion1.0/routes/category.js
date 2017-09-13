var express = require('express');
var router = express.Router();
var categoryDao= require("../model/categoryDao.js");
//新闻类别创建
router.post("/add", function (req, res, next) {
    var data = {};//返回的数据
    var params={};
   var  name = req.body.name;
  var   pid=req.body.pid||null;
  console.log(pid);
    params.name=name;

    categoryDao.isExesit(params, function (error, rows) {
         if(error){
             console.log(error);

             res.send("出错了");
             return;
         }
        console.log(rows.length);
        if (rows.length>0) {

            data.result = 0;
            data.message = {
                res:"类别创建失败'",
                detail:"类别已经存在",
            };
            data.data=null;
            res.json(data);
            return;

        }else{
            categoryDao.add([pid,name], function (error, result) {

                if (error) {
                    data.result = 0;
                    data.message = {result: "数据插入失败", detail: error};
                    data.data = null;

                    res.json(data);
                    return;
                }
                data.result = 1;
                data.message = {
                    result:"数据插入成功",
                    detail:"",
                };
                data.data = null;
                res.json(data);

            });
        }
    });
});

//类别删除
router.get("/delet/:id", function (req, res, next) {
    var param={};
    var id=req.params.id;
    var data={};
    param.id=id;

   categoryDao .isExesit(param,function (error,result) {
        if(error){

            data.result=1;
            data.message={
                result:"删除失败！",
                detail:error,
            };
            data.data=null;
            res.json(data);
            return;
        }
        if(!result.length){
            data.result=1;
            data.message={
                result:"删除失败！",
                detail:"类别不存在"
            };
            data.data=null;
            res.json(data);
            return;
        }
        categoryDao.delet(id,function (error,result) {
            if(error){

                data.result=1;
                data.message={
                    result:"删除失败！",
                    detail:error,
                };
                data.data=null;
                res.json(data);
                return;
            }

            data.result=1;
            data.message={
                result:"删除成功！",
                detail:""
            };
            data.data=null;
            res.json(data);
        })
    })
});
//类别列表
router.get("/list/:page",function (req,res,next) {
    var data={};
    var params=[];
    var pageSize=10;
    var page= req.params.page||1;
    var start=(page-1)*pageSize;
    params=[start,pageSize];
    categoryDao.list(params,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "类别查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return;
        }

        data.result=1;
        data.message={
            res:"类别查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});

module.exports = router;