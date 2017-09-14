var express = require('express');
var router = express.Router();
var leaveDao = require("../model/leaveDao.js");



//假条创建
router.post("/add", function (req, res, next) {

    var data = {};//返回的数据
    var params={};
    var  title = req.body.title;
    var  reason=req.body.reason;
    var  sendId=req.body.sendId;
    var  recId=req.body.recId;
    var category=req.body.category;
    var start=req.body.start;
    var end=req.body.end;

    leaveDao.add([title,category,reason,start,end,sendId,recId], function (error, result) {

        if (error) {
            data.result = 0;
            data.message = {result: "请假条发送失败", detail: error};
            data.data = null;

            res.json(data);
            return
        }

        data.result = 1;
        data.message = {
            result: "假条发送成功",
            detail: "",
        };
        data.data = null;

        res.json(data);


    });
});


//假条删除
router.get("/delet/:id", function (req, res, next) {
    var id=req.params.id;
    var data={};
    leaveDao.isExesit(id,function (error,result) {
        if(error){

            data.result=1;
            data.message={
                result:"假条失败！",
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
                detail:"假条不存在"
            };
            data.data=null;
            res.json(data);
            return;

        }
        leaveDao.delet(id,function (error,result) {
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

//假条列表
router.get("/list/:page",function (req,res,next) {

    var data={};
    var params={};

     params.pageSize=10;
    var page= req.params.page||1;
     params.start=(page-1)*  params.pageSize;

    leaveDao.list(params,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "假条查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"假条查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});
//查看单条假条
router.get("/view/:id",function (req,res,next) {

    var data={};
    var params=[];
    var pageSize=10;
    var id= req.params.id;


    leaveDao.view(id,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "假条查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"假条查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});
//查看申请的假条列表
router.get("/list/send/:sendId/:page",function (req,res,next) {

    var data={};
    var params={};
    params.pageSize=10;
    var page= req.params.page||1;
    params.start=(page-1)*  params.pageSize;
   params.sendId=req.params.sendId;

    leaveDao.list(params,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "假条查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"假条查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});
//查看我收到的假条列表
router.get("/list/receive/:recId/:page",function (req,res,next) {
    var data={};
    var params={};
    params.pageSize=10;
    var page= req.params.page||1;
    params.start=(page-1)*params.pageSize;
    params.recId=req.params.recId;

    leaveDao.list(params,function (error,result) {
        if(error){
            data.result=0;
            data.message= {
                res: "假条查询失败",
                detail: error,
            };
            data.data=null;
            res.json(data);
            return
        }

        data.result=1;
        data.message={
            res:"假条查询成功",
            detail:"",
        }
        data.data=result;
        res.json(data);

    })
});

module.exports = router;