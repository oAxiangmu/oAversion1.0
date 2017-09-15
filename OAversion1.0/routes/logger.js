var express = require('express');
var router = express.Router();
var loggerDao = require("../model/loggerDao.js");



//日志创建
router.post("/add", function (req, res, next) {
    var data = {};//返回的数据
    var params={};
    var   title = req.body.title;
    var  content=req.body.content;
    var sendId=req.body.sendId;
    var  recId=req.body.recId;

    loggerDao.add([title,content,sendId,recId], function (error, result) {


        if (error) {
            data.result = 0;
            data.message = {result: "日志发送失败", detail: error};
            data.data = null;

            res.json(data);
            return
        }

        data.result = 1;
        data.message = {
            result: "日志发送成功",
            detail: "",
        };
        data.data = null;

        res.json(data);


    });
});


//日志删除
router.get("/delet/:id", function (req, res, next) {
    var id=req.params.id;
    var data={};
    loggerDao.isExesit(id,function (error,result) {
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
        if(result.length<=0){
            data.result=1;
            data.message={
                result:"删除失败！",
                detail:"日志不存在"
            };
            data.data=null;
            res.json(data);
            return;

        }
        loggerDao.delet(id,function (error,result) {
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

//日志列表
router.get("/list/:page",function (req,res,next) {

    var data={};
    var params={};

     params.pageSize=10;
    var page= req.params.page||1;
     params.start=(page-1)*  params.pageSize;

     loggerDao.list(params,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "日志查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"日志查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});
//查看单条日志
router.get("/view/:id",function (req,res,next) {

    var data={};
    var params=[];
    var pageSize=10;
    var id= req.params.id;


    loggerDao.view(id,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "日志查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"日志查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});
//查看我发送的日志列表
router.get("/list/send/:sendId/:page",function (req,res,next) {

    var data={};
    var params={};
    params.pageSize=10;
    var page= req.params.page||1;
    params.start=(page-1)*  params.pageSize;
   params.sendId=req.params.sendId;

    loggerDao.list(params,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "日志查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"日志查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});
//查看我收到的日志列表
router.get("/list/receive/:recId/:page",function (req,res,next) {
    var data={};
    var params={};
    params.pageSize=10;
    var page= req.params.page||1;
    params.start=(page-1)*params.pageSize;
    params.recId=req.params.recId;

    loggerDao.list(params,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "日志查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"日志查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});

module.exports = router;