var express = require('express');
var router = express.Router();
var bulletinDao = require("../model/bulletinDao.js");



//公告创建
router.post("/add", function (req, res, next) {
    var data = {};//返回的数据
    var params={};
    var  title = req.body.title;
    var  content=req.body.content;
    var pusherId=req.body.pusherId;


    bulletinDao.add([title,content,pusherId], function (error, result) {

        if (error) {
            data.result = 0;
            data.message = {result: "公告插入失败", detail: error};
            data.data = null;

            res.json(data);
            return
        }

        data.result = 1;
        data.message = {
            result: "公告插入成功",
            detail: "",
        };
        data.data = null;

        res.json(data);


    });
});


//公告删除
router.get("/delet/:id", function (req, res, next) {
    var id=req.params.id;
    var data={};
    bulletinDao.isExesit(id,function (error,result) {
        if(error){

            data.result=1;
            data.message={
                result:"公告失败！",
                detail:error,
            };
            data.data=null;
            res.json(data);
            return;
        }
        if(result.length<=0){
            data.result=1;
            data.message={
                result:"删除失败！",
                detail:"公告不存在"
            };
            data.data=null;
            res.json(data);
            return;

        }
        bulletinDao.delet(id,function (error,result) {
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

//公告列表
router.get("/list/:page",function (req,res,next) {

    var data={};
    var params=[];
    var pageSize=10;
    var page= req.params.page||1;
    var start=(page-1)*pageSize;
    params=[start,pageSize];
    bulletinDao.list(params,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "公告查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"公告查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});
//查看单条公告
router.get("/view/:id",function (req,res,next) {

    var data={};
    var params=[];
    var pageSize=10;
    var id= req.params.id;


    bulletinDao.view(id,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "公告查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"公告查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});
module.exports = router;
